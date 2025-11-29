import { CustomHabit } from "./CustomHabit";
import type { IHabitRepository } from "$lib/server/HabitBuilder/IHabitRepository";
import type { HabitFrequency, HabitType } from "../HabitBuilder/Habit";

export class HabitRepository implements IHabitRepository<CustomHabit> {

    private static instance: HabitRepository;

    habits: CustomHabit[] = [];

    nextId = 1;

    private constructor() {}

    static getInstance() {
        if (!HabitRepository.instance) {
            HabitRepository.instance = new HabitRepository();
        }
        return HabitRepository.instance;
    }

    async create(data: {
        name: string,
        type: HabitType,
        frequency: HabitFrequency,
        createdAt: Date,
        userId: number,
    }) {
        const { name, type, frequency, createdAt, userId } = data;
        const habit = new CustomHabit(this.nextId, name, type, frequency, createdAt, userId);
        this.habits.push(habit);
        this.nextId++;
        return Promise.resolve(habit);
    }

    async list(filter?: Partial<CustomHabit>) {
        if (!filter || Object.keys(filter).length === 0) {
            return Promise.resolve([...this.habits]);
        }

        const filtered = this.habits.filter(record => {
            return Object.entries(filter).every(([key, value]) => (record as any)[key] === value);
        });

        return Promise.resolve(filtered);
    }

    async findById(id: number) {
        const habit = this.habits.find(habit => habit.id === id);
        return Promise.resolve(habit);
    }

    async findByUserId(id: number) {
        const habit = this.habits.filter(habit => habit.userId === id);
        return Promise.resolve(habit);
    }

    async logEvent(id: number, date: Date) {
        const habit = await this.findById(id);
        if (!habit) {
            throw new Error(`Habit not found for id = ${id}`);
        }
        habit.logEvent(date);
        return Promise.resolve();
    }

    async delete(id: number): Promise<void> {
        const index = this.habits.findIndex(habit => habit.id === id);
        if (index === -1) {
            return Promise.reject(new Error(`Record (id: ${id}) not found`));
        }
        this.habits.splice(index, 1);
        return Promise.resolve();
    }
    
}