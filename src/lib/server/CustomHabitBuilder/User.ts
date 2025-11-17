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
