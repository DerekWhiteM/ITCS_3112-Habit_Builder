import { describe, expect, test } from "vitest";
import { Habit, HabitType } from "../../HabitBuilder/Habit";
import type { HabitFrequency } from "../../HabitBuilder/Habit";
import { InMemoryRepository } from "../InMemoryRepository";
import { PeriodFactory } from "../../HabitBuilder/Period";

class CustomHabit extends Habit {
    category: string;

    constructor(
        id: string,
        name: string,
        type: HabitType,
        frequency: HabitFrequency,
        createdAt: Date,
        category: string,
    ) {
        super(id, name, type, frequency, createdAt);
        this.category = category;
    }
}

describe("Test InMemoryRepositoryAdapter", () => {

    test("Adding a Habit to the repository", async () => {
        const habit = new CustomHabit('1', 'do something', HabitType.POSITIVE, { multiplicity: 1, period: PeriodFactory.create('daily') }, new Date(), "health");
        const habit2 = new CustomHabit('2', 'do nothing', HabitType.NEGATIVE, { multiplicity: 1, period: PeriodFactory.create('daily') }, new Date(), "health");
        const repository = new InMemoryRepository<CustomHabit>();
        repository.add(habit);
        repository.add(habit2);
        let findHabit = await repository.get({ name: 'do something', category: 'health' });
        expect(findHabit.length).toBe(1);
        findHabit[0].logEvent(new Date());
        await repository.update(findHabit[0].id, findHabit[0]);
        findHabit = await repository.get({ id: '1' });
        expect(findHabit[0].events.length).toBe(1);
        await repository.delete('1');
        findHabit = await repository.get({ id: '1' });
        expect(findHabit.length).toBe(0);
    });

});