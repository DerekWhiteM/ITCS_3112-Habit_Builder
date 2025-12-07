import { CustomHabit } from "./CustomHabit";
import type { IHabitRepository } from "../HabitBuilder/IHabitRepository";
import { PeriodFactory, type PeriodType } from "../HabitBuilder/Period";
import { type HabitType, validateHabitType } from "../HabitBuilder/Habit";
import { validateRole } from "./User";
import type { IUserRepository } from "./IUserRepository";

export class CustomHabitBuilder {
    private static instance: CustomHabitBuilder;

    private userRepo: IUserRepository;
    private habitRepo: IHabitRepository<CustomHabit>;

    constructor(userRepo: IUserRepository, habitRepo: IHabitRepository<CustomHabit>) {
        this.userRepo = userRepo;
        this.habitRepo = habitRepo;
    }

    static getInstance(userRepo?: IUserRepository, habitRepo?: IHabitRepository<CustomHabit>) {
        if (!CustomHabitBuilder.instance) {
            if (!userRepo || !habitRepo) {
                throw new Error("Repositories must be provided on initialization");
            }
            CustomHabitBuilder.instance = new CustomHabitBuilder(userRepo, habitRepo);
        }
        return CustomHabitBuilder.instance;
    }

    public createUser(username: string, role: string) {
        const validatedRole = validateRole(role);
        if (!validatedRole) {
            throw new Error(`Invalid user role ${role}`);
        }
        return this.userRepo.create({ username, role: validatedRole });
    }

    public getUserById(id: number) {
        return this.userRepo.findById(id);
    }

    public getUserByUsername(username: string) {
        return this.userRepo.findByUsername(username);
    }

    public async createHabit(
        name: string,
        type: HabitType,
        multiplicity: number,
        period: PeriodType,
        userId: number,
    ): Promise<CustomHabit> {
        const mappedPeriod = PeriodFactory.create(period);
        const frequency = { multiplicity, period: mappedPeriod };
        const habit = await this.habitRepo.create({
            name,
            type,
            frequency,
            userId,
            createdAt: new Date(),
        });
        return habit;
    }

    public async listHabits(userId: number): Promise<CustomHabit[]> {
        return await this.habitRepo.list({userId});
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

        // Import users
        for (const element of data.users) {
            const existingUser = this.userRepo.findByUsername(element.username);
            if (!existingUser) {
                const role = validateRole(element.role);
                if (!role) {
                    continue;
                }
                this.userRepo.create({ username: element.username, role });
            }
        }

        // Import habits
        for (const element of data.habits) {
            const user = this.userRepo.findByUsername(element.username);
            if (!user) {
                throw new Error(`User not found: ${element.username}`);
            }
            const habitType = validateHabitType(element.type);
            if (!habitType) {
                throw new Error(`Invalid habit type: ${habitType}`);
            }
            const multiplicity = element.frequency.multiplicity;
            const period = PeriodFactory.create(element.frequency.period);
            const frequency = { multiplicity, period };
            const createdAt = element.createdAt ? new Date(element.createdAt) : new Date();
            const habit = await this.habitRepo.create({
                name: element.name,
                type: habitType,
                frequency,
                createdAt,
                userId: user.id,
            });
            for (const e of element.events) {
                habit.logEvent(new Date(e));
            }
        }
    }

    public async exportData(): Promise<{ users: { id: number; username: string; role: string }[]; habits: any[] }> {

        // Export users
        const users = this.userRepo.list();
        const outUsers = users.map(u => ({ id: u.id, username: u.username, role: u.getRole() }));

        // Export habits
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

        return { users: outUsers, habits: outHabits };
    }
}