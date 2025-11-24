import type { Habit } from "./Habit";

export interface IHabitRepository<T extends Habit> {
    save(habit: T): Promise<void>;
    list(filter?: Partial<T>): Promise<T[]>;
    findById(id: number | string): Promise<T | undefined>;
    logEvent(id: number | string, date?: Date): Promise<void>;
    delete(id: number | string): Promise<void>;
}