import { CustomHabit } from "./CustomHabit";
import { EnumValidator } from "../EnumValidator";
import { HabitRepository } from "../HabitBuilder/HabitRepository";
import { HabitType } from "../HabitBuilder/Habit";
import { PeriodFactory, type PeriodType } from "../HabitBuilder/Period";
import { Role, UserRepository } from "./User";

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
        const validatedRole = EnumValidator.validate(Role, role);
        if (!validatedRole) {
            throw new Error("Invalid user role");
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
        id: string,
        userId: number,
        name: string,
        type: "POSITIVE" | "NEGATIVE",
        multiplicity: number,
        period: PeriodType,
    ): Promise<CustomHabit> {
        const habitType = EnumValidator.validate(HabitType, type);
        if (!habitType) throw new Error(`Invalid habit type: ${type}`);
        const mappedPeriod = PeriodFactory.create(period);
        const frequency = { multiplicity, period: mappedPeriod };
        const habit = new CustomHabit(id, name, habitType, frequency, new Date(), userId);
        await this.habitRepo.add(habit);
        return habit;
    }

    public async listHabits(userId: number): Promise<CustomHabit[]> {
        return await this.habitRepo.getByUserId(userId);
    }

    public async getHabit(habitId: string): Promise<CustomHabit | undefined> {
        return await this.habitRepo.getById(habitId);
    }

    public async logEvent(habitId: string, date: Date): Promise<void> {
        const habit = await this.habitRepo.getById(habitId);
        if (!habit) {
            throw new Error("Habit not found");
        }
        habit.logEvent(date);
        await this.habitRepo.update(habitId, habit);
    }

    public async updateHabit(habitId: string, partial: Partial<CustomHabit>): Promise<void> {
        await this.habitRepo.update(habitId, partial);
    }

    public async deleteHabit(habitId: string): Promise<void> {
        await this.habitRepo.delete(habitId);
    }

    public async importData(payload: string | { users: { id: number; username: string; role: string }[]; habits: any[] }): Promise<void> {
        const data = typeof payload === "string" ? JSON.parse(payload) : payload;

        for (const element of data.users) {
            const existingById = await this.userRepo.getUserById(element.id);
            const existingByUsername = await this.userRepo.getUserByUsername(element.username);
            if (!existingById && !existingByUsername) {
                const role = EnumValidator.validate(Role, element.role);
                if (!role) continue;
                await this.userRepo.saveUser({ id: element.id, username: element.username, role });
            }
        }

        for (const element of data.habits) {
            const existingHabit = await this.habitRepo.getById(element.id);
            if (existingHabit) continue;
            const type = EnumValidator.validate(HabitType, element.type);
            if (!type) throw new Error(`Invalid habit type: ${type}`);
            const multiplicity = element.frequency.multiplicity;
            const period = PeriodFactory.create(element.frequency.period);
            const frequency = { multiplicity, period };
            const createdAt = element.createdAt ? new Date(element.createdAt) : new Date();
            const habit = new CustomHabit(element.id, element.name, type, frequency, createdAt, element.userId);
            for (const e of element.events) {
                habit.logEvent(new Date(e));
            }
            await this.habitRepo.add(habit);
        }
    }

    public async exportData(): Promise<{ users: { id: number; username: string; role: string }[]; habits: any[] }> {
        const users = await this.userRepo.getAllUsers();
        const habits = await this.habitRepo.get();
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