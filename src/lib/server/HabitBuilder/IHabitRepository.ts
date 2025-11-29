import type { Habit } from "./Habit";

export interface IHabitRepository<T extends Habit> {
    create(habit: Partial<T>): Promise<T>;
    list(filter?: Partial<T>): Promise<T[]>;
    findById(id: number | string): Promise<T | undefined>;
    logEvent(id: number | string, date?: Date): Promise<void>;
    delete(id: number | string): Promise<void>;
}