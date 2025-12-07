const userTypes = ['admin', 'user'] as const;

export type Role = typeof userTypes[number];

export function validateRole(value: string): Role | undefined {
    for (const type of userTypes) {
        if (type === value) {
            return type;
        }
    }
    return undefined;
}

export abstract class User {
    id: number;
    username: string;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }

    abstract getRole(): Role;
}

export class AdminUser extends User {
    role: Role = 'admin';

    override getRole() {
        return this.role;
    }
}

export class StandardUser extends User {
    role: Role = 'user';

    override getRole() {
        return this.role;
    }
}

export class UserFactory {
    private static users = {
        admin: (id: number, username: string) => new AdminUser(id, username),
        user: (id: number, username: string) => new StandardUser(id, username),
    }

    public static create(id: number, username: string, role: Role) {
        const creator = UserFactory.users[role];
        if (!creator) {
            throw new Error(`Invalid user role: ${role}`);
        }
        return creator(id, username);
    }
}
