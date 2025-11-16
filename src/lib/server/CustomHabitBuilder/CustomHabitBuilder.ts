import { EnumValidator } from "../EnumValidator";
import { HabitRepository } from "../HabitBuilder/HabitRepository";
import { Role, UserRepository } from "./User";
import { HabitType } from "../HabitBuilder/Habit";
import { PeriodFactory } from "../HabitBuilder/Period";
import { CustomHabit } from "./CustomHabit";

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
        period: "daily" | "weekly" | "monthly" | "yearly",
    ): Promise<CustomHabit> {
        const mappedType = type === "POSITIVE" ? HabitType.POSITIVE : HabitType.NEGATIVE;
        const mappedPeriod = period === "daily" ? PeriodFactory.daily()
            : period === "weekly" ? PeriodFactory.weekly()
            : period === "monthly" ? PeriodFactory.monthly()
            : PeriodFactory.yearly();
        const frequency = { multiplicity, period: mappedPeriod };
        const habit = new CustomHabit(id, name, mappedType, frequency, new Date(), userId);
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
        const users = Array.isArray(data?.users) ? data.users : [];
        const habits = Array.isArray(data?.habits) ? data.habits : [];

        for (const u of users) {
            const existingById = await this.userRepo.getUserById(u.id);
            const existingByUsername = await this.userRepo.getUserByUsername(u.username);
            if (!existingById && !existingByUsername) {
                const role = EnumValidator.validate(Role, u.role);
                if (!role) {
                    continue;
                }
                await this.userRepo.saveUser({ id: u.id, username: u.username, role });
            }
        }

        for (const h of habits) {
            const existing = await this.habitRepo.getById(h.id);
            if (existing) {
                continue;
            }
            const type = h.type === "POSITIVE" ? HabitType.POSITIVE : HabitType.NEGATIVE;
            const mappedPeriod = h.frequency?.period === "daily" ? PeriodFactory.daily()
                : h.frequency?.period === "weekly" ? PeriodFactory.weekly()
                : h.frequency?.period === "monthly" ? PeriodFactory.monthly()
                : PeriodFactory.yearly();
            const frequency = { multiplicity: h.frequency?.multiplicity ?? 1, period: mappedPeriod };
            const createdAt = h.createdAt ? new Date(h.createdAt) : new Date();
            const habit = new CustomHabit(h.id, h.name, type, frequency, createdAt, h.userId);
            const events: string[] = Array.isArray(h.events) ? h.events : [];
            for (const e of events) {
                habit.logEvent(new Date(e));
            }
            await this.habitRepo.add(habit);
        }
    }

    public async exportData(): Promise<{ users: { id: number; username: string; role: string }[]; habits: any[] }> {
        const users = await this.userRepo.getAllUsers();
        const habits = await this.habitRepo.get();
        const outHabits = habits.map(h => {
            const name = h.frequency.period.constructor.name.toLowerCase();
            const period = name === "daily" ? "daily"
                : name === "weekly" ? "weekly"
                : name === "monthly" ? "monthly"
                : "yearly";
            return {
                id: h.id,
                userId: h.userId,
                name: h.name,
                type: h.type === HabitType.POSITIVE ? "POSITIVE" : "NEGATIVE",
                frequency: { multiplicity: h.frequency.multiplicity, period },
                createdAt: h.createdAt.toISOString(),
                events: h.events.map(e => e.toISOString()),
            };
        });
        const outUsers = users.map(u => ({ id: u.id, username: u.username, role: u.role }));
        return { users: outUsers, habits: outHabits };
    }
}