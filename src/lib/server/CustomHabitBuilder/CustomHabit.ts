import { Habit, type HabitType, type HabitFrequency } from "../HabitBuilder/Habit";

export class CustomHabit extends Habit {
    userId: number;

    constructor(
        id: number,
        name: string,
        type: HabitType,
        frequency: HabitFrequency,
        createdAt: Date,
        userId: number,
    ) {
        super(id, name, type, frequency, createdAt);
        this.userId = userId;
    }
}