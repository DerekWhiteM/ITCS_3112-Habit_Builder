import { EnumValidator } from "../EnumValidator";
import { HabitRepository } from "../HabitBuilder/HabitRepository";
import { Role, UserRepository } from "./User";

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
} 