export class EnumValidator {
    static validate<T extends Record<string, string | number>>(
        enumerator: T,
        str: string
    ): T[keyof T] | undefined {
        return Object.values(enumerator).includes(str as T[keyof T])
            ? (str as T[keyof T])
            : undefined;
    }
}