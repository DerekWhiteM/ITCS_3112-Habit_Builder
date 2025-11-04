import { Frequency } from "../Frequency";
import { PositiveHabit } from "../PositiveHabit";


describe("PositiveHabit", () => {
    test("Constructing a PositiveHabit", () => {
        const id = 1;
        const name = "Do 10 push-ups";
        const multiplicity = 3;
        const period = "daily";
        const frequency = new Frequency(multiplicity, period);
        const createdAt = new Date("2025-11-03T00:00:00Z");
        const habit = new PositiveHabit(id, name, frequency, createdAt);

        expect(habit.id).toBe(id);
        expect(habit.name).toBe(name);
        expect(habit.frequency.multiplicity).toBe(multiplicity);
        expect(habit.frequency.period).toBe(period);

        habit.logEvent();

        expect(habit.calculateCurrentPeriodProgress()).toBe(1);
        expect(habit.calculateStreak()).toBe(0);

        habit.logEvent();
        habit.logEvent();

        expect(habit.calculateStreak()).toBe(1);

        habit.logEvent(new Date("2025-11-03T01:00:00Z"));
        habit.logEvent(new Date("2025-11-03T01:00:00Z"));
        habit.logEvent(new Date("2025-11-03T01:00:00Z"));

        expect(habit.calculateStreak()).toBe(2);
    });
});