import { Frequency, Period } from "../Frequency";
import { PositiveHabit } from "../PositiveHabit";

describe("Test positive habits", () => {

    const id = 1;
    const name = "Do 10 push-ups";

    test("Daily", () => {
        const multiplicity = 3;
        const period: Period = "daily";
        const frequency = new Frequency(multiplicity, period);
        const today = new Date("2025-11-04T00:00:00Z");
        const yesterday = new Date(new Date(today).setUTCDate(today.getUTCDate() - 1));
        const habit = new PositiveHabit(id, name, frequency, yesterday);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(0);
        habit.logEvent(today);
        habit.logEvent(today);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(yesterday);
        habit.logEvent(yesterday);
        habit.logEvent(yesterday);
        expect(habit.calculateStreak(today)).toBe(2);
    });

});