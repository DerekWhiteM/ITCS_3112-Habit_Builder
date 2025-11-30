import type { Role, User } from "./User";

export interface IUserRepository {
    create(data: { username: string; role: Role }): User;
    findByUsername(username: string): User | undefined;
    findById(id: number): User | undefined;
    list(): User[];
}
