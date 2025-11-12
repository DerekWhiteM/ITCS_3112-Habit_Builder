import { InMemoryRepository } from "./InMemoryRepository";
import { User } from "./User";
import type { Role } from "./User";

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

    public async createUser(id: number, username: string, role: Role) {
        const user = new User(id, username, role);
        return await this.repository.add(user);
    }

    public async getUserById(id: number) {
        const users = await this.repository.get({ id });
        return users[0];
    }

    public async getUserByUsername(username: string) {
        const users = await this.repository.get({ username });
        return users[0];
    }

    public async updateUser(id: number, user: Partial<User>) {
        await this.repository.update(id.toString(), user);
    }

    public async deleteUser(id: number) {
        await this.repository.delete(id.toString());
    }

}