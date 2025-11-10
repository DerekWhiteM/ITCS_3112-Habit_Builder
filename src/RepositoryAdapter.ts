export interface RepositoryAdapter<T> {

    // Create
    add(habit: T): Promise<void>;

    // Read
    get(filter?: Partial<T>): Promise<T[]>;

    // Update
    update(id: string, data: Partial<T>): Promise<void>;

    // Delete
    delete(id: string): Promise<void>;

};