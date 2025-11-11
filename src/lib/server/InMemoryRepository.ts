import type { RepositoryAdapter } from "$lib/server/RepositoryAdapter";

interface Record {
    id: number | string
}

export class InMemoryRepository<T extends Record> implements RepositoryAdapter<T> {

    records: T[] = [];

    add(record: T): Promise<void> {
        this.records.push(record);
        return Promise.resolve();
    }

    get(filter?: Partial<T>): Promise<T[]> {
        if (!filter || Object.keys(filter).length === 0) {
            return Promise.resolve([...this.records]);
        }

        const filtered = this.records.filter(record => {
            return Object.entries(filter).every(([key, value]) => (record as any)[key] === value);
        });

        return Promise.resolve(filtered);
    }

    update(id: string, data: Partial<T>): Promise<void> {
        const habit = this.records.find(h => h.id === id);
        if (!habit) {
            return Promise.reject(new Error(`Record (id: ${id}) not found`));
        }

        Object.assign(habit, data);
        return Promise.resolve();
    }

    delete(id: string): Promise<void> {
        const index = this.records.findIndex(record => record.id === id);
        if (index === -1) {
            return Promise.reject(new Error(`Record (id: ${id}) not found`));
        }

        this.records.splice(index, 1);
        return Promise.resolve();
    }

};