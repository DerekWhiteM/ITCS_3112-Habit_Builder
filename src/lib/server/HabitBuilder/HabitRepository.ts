import type { RepositoryAdapter } from "../CustomHabitBuilder/RepositoryAdapter";
import type { Habit } from "./Habit";

export class HabitRepository {
    private static instance: HabitRepository;
    private repository: RepositoryAdapter<Habit>;

    constructor(repositoryAdapter: RepositoryAdapter<Habit>) {
        this.repository = repositoryAdapter;
    }

    static getInstance(repositoryAdapter?: RepositoryAdapter<Habit>) {
        if (!HabitRepository.instance) {
            if (!repositoryAdapter) {
                throw new Error("Repository adapter must be provided on initialization");
            }
            HabitRepository.instance = new HabitRepository(repositoryAdapter);
        }
        return HabitRepository.instance;
    }
}