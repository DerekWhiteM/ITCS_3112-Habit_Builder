import { CustomHabit } from "../CustomHabit";
import { describe, expect, test } from "vitest";
import { HabitRepository } from "../HabitRepository";
import { PeriodFactory } from "../../HabitBuilder/Period";

describe("Test InMemoryRepositoryAdapter", () => {

    test("Adding a Habit to the repository", async () => {
        const habit = new CustomHabit(1, 'do something', 'positive', { multiplicity: 1, period: PeriodFactory.create('daily') }, new Date(), 123);
        const habit2 = new CustomHabit(2, 'do nothing', 'negative', { multiplicity: 1, period: PeriodFactory.create('daily') }, new Date(), 123);
        const repository = HabitRepository.getInstance();
        repository.save(habit);
        repository.save(habit2);
        let listHabits = await repository.list({ name: 'do something', userId: 123 });
        expect(listHabits.length).toBe(1);
        await repository.logEvent(1, new Date());
        let findHabit = await repository.findById(1);
        expect(findHabit?.events.length).toBe(1);
        await repository.delete(1);
        listHabits = await repository.list({ userId: 123 });
        expect(listHabits?.length).toBe(1);
    });

});