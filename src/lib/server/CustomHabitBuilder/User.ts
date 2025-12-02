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

export type User = {
    id: number;
    username: string;
    role: Role;
}
