import type { RepositoryAdapter } from "../CustomHabitBuilder/RepositoryAdapter";
import type { CustomHabit } from "../CustomHabitBuilder/CustomHabit";

export class HabitRepository {
    private static instance: HabitRepository;
    private repository: RepositoryAdapter<CustomHabit>;

    constructor(repositoryAdapter: RepositoryAdapter<CustomHabit>) {
        this.repository = repositoryAdapter;
    }

    static getInstance(repositoryAdapter?: RepositoryAdapter<CustomHabit>) {
        if (!HabitRepository.instance) {
            if (!repositoryAdapter) {
                throw new Error("Repository adapter must be provided on initialization");
            }
            HabitRepository.instance = new HabitRepository(repositoryAdapter);
        }
        return HabitRepository.instance;
    }

    async add(habit: CustomHabit): Promise<void> {
        return this.repository.add(habit);
    }

    async get(filter?: Partial<CustomHabit>): Promise<CustomHabit[]> {
        return this.repository.get(filter);
    }

    async getById(id: string): Promise<CustomHabit | undefined> {
        const results = await this.repository.get({ id } as Partial<CustomHabit>);
        return results[0];
    }

    async getByUserId(userId: number): Promise<CustomHabit[]> {
        return this.repository.get({ userId } as Partial<CustomHabit>);
    }

    async update(id: string, data: Partial<CustomHabit>): Promise<void> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}