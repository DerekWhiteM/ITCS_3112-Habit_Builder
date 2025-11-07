import { Frequency } from "../Frequency";
import { Habit, HabitType } from "../Habit";
import { InMemoryRepository } from "../InMemoryRepository";

class CustomHabit extends Habit {
    category: string;

    constructor(
        type: HabitType,
        id: string,
        name: string,
        frequency: Frequency,
        createdAt: Date,
        category: string,
    ) {
        super(type, id, name, frequency, createdAt);
        this.category = category;
    }
}

describe("Test InMemoryRepositoryAdapter", () => {

    test("Adding a Habit to the repository", async () => {
        const habit = new CustomHabit(HabitType.POSITIVE, '1', 'do something', new Frequency(1, "daily"), new Date(), "health");
        const habit2 = new CustomHabit(HabitType.NEGATIVE, '2', 'do nothing', new Frequency(1, "daily"), new Date(), "health");
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