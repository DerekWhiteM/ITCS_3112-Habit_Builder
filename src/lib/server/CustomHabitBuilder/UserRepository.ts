import type { User } from "./User";

export class UserRepository {

    private static instance: UserRepository;

    private users: User[] = [];

    private constructor() {}

    public static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    public save(user: User) {
        this.users.push(user);
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