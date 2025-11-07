import { Habit } from "./Habit";
import { RepositoryAdapter } from "./RepositoryAdapter";

export class InMemoryRepository<T extends Habit> implements RepositoryAdapter<Habit> {

    habits: T[] = [];

    add(habit: T): Promise<void> {
        this.habits.push(habit);
        return Promise.resolve();
    }

    get(filter?: Partial<T>): Promise<T[]> {
        if (!filter || Object.keys(filter).length === 0) {
            return Promise.resolve([...this.habits]);
        }

        const filtered = this.habits.filter(habit => {
            return Object.entries(filter).every(([key, value]) => (habit as any)[key] === value);
        });

        return Promise.resolve(filtered);
    }

    update(id: string, data: Partial<T>): Promise<void> {
        const habit = this.habits.find(h => h.id === id);
        if (!habit) {
            return Promise.reject(new Error(`Habit with id ${id} not found`));
        }

        Object.assign(habit, data);
        return Promise.resolve();
    }

    delete(id: string): Promise<void> {
        const index = this.habits.findIndex(h => h.id === id);
        if (index === -1) {
            return Promise.reject(new Error(`Habit with id ${id} not found`));
        }

        this.habits.splice(index, 1);
        return Promise.resolve();
    }

};