export interface RepositoryAdapter<Habit> {

    // Create
    add(habit: Habit): Promise<void>;

    // Read
    get(filter?: Partial<Habit>): Promise<Habit[]>;

    // Update
    update(id: string, data: Partial<Habit>): Promise<void>;

    // Delete
    delete(id: string): Promise<void>;

};