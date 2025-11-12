export enum Role {
    ADMIN,
    USER,
}

export class User {
    id: number;
    username: string;
    role: Role;

    constructor(id: number, username: string, role: Role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
}