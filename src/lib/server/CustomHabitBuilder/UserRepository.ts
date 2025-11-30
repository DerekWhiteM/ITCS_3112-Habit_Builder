import type { User, Role } from "./User";
import type { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {

    private static instance: UserRepository;

    private users: User[] = [];

    nextId = 1;

    private constructor() { }

    public static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    public create(data: {
        username: string,
        role: Role,
    }) {
        const { username, role } = data;
        const user = {
            id: this.nextId++,
            username,
            role,
        }
        this.users.push(user);
        return user;
    }

    public findByUsername(username: string) {
        return this.users.find(user => user.username === username);
    }

    public findById(id: number) {
        return this.users.find(user => user.id === id);
    }

    public list() {
        return this.users;
    }
}