import { InMemoryRepository } from "./InMemoryRepository";

export type Role = 'admin' | 'user';

export function validateRole(value: string): Role | undefined {
    return value === 'admin' || value === 'user'
        ? value as Role
        : undefined;
}

export type User = {
    id: number;
    username: string;
    role: Role;
}

export class UserRepository {

    private static instance: UserRepository;

    private repository: InMemoryRepository<User>;

    private constructor() {
        this.repository = new InMemoryRepository<User>();
    }

    public static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    public async saveUser(user: User) {
        return await this.repository.add(user);
    }

    public async getUserByUsername(username: string) {
        const users = await this.repository.get({ username });
        return users[0];
    }

    public async getUserById(id: number) {
        const users = await this.repository.get({ id });
        return users[0];
    }

    public async getAllUsers() {
        return await this.repository.get();
    }

}