import { CustomHabit } from "./CustomHabit";
import { HabitRepository } from "../CustomHabitBuilder/HabitRepository";
import { PeriodFactory, type PeriodType } from "../HabitBuilder/Period";
import { UserRepository, validateRole } from "./User";
import { type HabitType, validateHabitType } from "../HabitBuilder/Habit";

export class CustomHabitBuilder {
    private static instance: CustomHabitBuilder;

    private userRepo: UserRepository;
    private habitRepo: HabitRepository;

    constructor(userRepo: UserRepository, habitRepo: HabitRepository) {
        this.userRepo = userRepo;
        this.habitRepo = habitRepo;
    }

    static getInstance(userRepo?: UserRepository, habitRepo?: HabitRepository) {
        if (!CustomHabitBuilder.instance) {
            if (!userRepo || !habitRepo) {
                throw new Error("Repositories must be provided on initialization");
            }
            CustomHabitBuilder.instance = new CustomHabitBuilder(userRepo, habitRepo);
        }
        return CustomHabitBuilder.instance;
    }

    public async createUser(id: number, username: string, role: string) {
        const validatedRole = validateRole(role);
        if (!validatedRole) {
            throw new Error(`Invalid user role ${role}`);
        }
        return await this.userRepo.saveUser({ id, username, role: validatedRole });
    }

    public async getUserById(id: number) {
        return await this.userRepo.getUserById(id);
    }

    public async getUserByUsername(username: string) {
        return await this.userRepo.getUserByUsername(username);
    }

    public async createHabit(
        id: number,
        userId: number,
        name: string,
        type: HabitType,
        multiplicity: number,
        period: PeriodType,
    ): Promise<CustomHabit> {
        const mappedPeriod = PeriodFactory.create(period);
        const frequency = { multiplicity, period: mappedPeriod };
        const habit = new CustomHabit(id, name, type, frequency, new Date(), userId);
        await this.habitRepo.save(habit);
        return habit;
    }

    public async listHabits(userId: number): Promise<CustomHabit[]> {
        return await this.habitRepo.findByUserId(userId);
    }

    public async getHabit(habitId: number): Promise<CustomHabit | undefined> {
        return await this.habitRepo.findById(habitId);
    }

    public async logEvent(habitId: number, date?: Date): Promise<void> {
        await this.habitRepo.logEvent(habitId, date || new Date());
    }

    public async deleteHabit(habitId: number): Promise<void> {
        await this.habitRepo.delete(habitId);
    }

    public async importData(payload: string | { users: { id: number; username: string; role: string }[]; habits: any[] }): Promise<void> {
        const data = typeof payload === "string" ? JSON.parse(payload) : payload;

        for (const element of data.users) {
            const existingById = await this.userRepo.getUserById(element.id);
            const existingByUsername = await this.userRepo.getUserByUsername(element.username);
            if (!existingById && !existingByUsername) {
                const role = validateRole(element.role);
                if (!role) continue;
                await this.userRepo.saveUser({ id: element.id, username: element.username, role });
            }
        }

        for (const element of data.habits) {
            const existingHabit = await this.habitRepo.findById(element.id);
            if (existingHabit) continue;
            const habitType = validateHabitType(element.type);
            if (!habitType) throw new Error(`Invalid habit type: ${habitType}`);
            const multiplicity = element.frequency.multiplicity;
            const period = PeriodFactory.create(element.frequency.period);
            const frequency = { multiplicity, period };
            const createdAt = element.createdAt ? new Date(element.createdAt) : new Date();
            const habit = new CustomHabit(element.id, element.name, habitType, frequency, createdAt, element.userId);
            for (const e of element.events) {
                habit.logEvent(new Date(e));
            }
            await this.habitRepo.save(habit);
        }
    }

    public async exportData(): Promise<{ users: { id: number; username: string; role: string }[]; habits: any[] }> {
        const users = await this.userRepo.getAllUsers();
        const habits = await this.habitRepo.list();
        const outHabits = habits.map(habit => {
            const multiplicity = habit.frequency.multiplicity;
            const period = habit.frequency.period.constructor.name.toLowerCase();
            return {
                id: habit.id,
                userId: habit.userId,
                name: habit.name,
                type: habit.type,
                frequency: { multiplicity, period },
                createdAt: habit.createdAt.toISOString(),
                events: habit.events.map(e => e.toISOString()),
            };
        });
        const outUsers = users.map(u => ({ id: u.id, username: u.username, role: u.role }));
        return { users: outUsers, habits: outHabits };
    }
}