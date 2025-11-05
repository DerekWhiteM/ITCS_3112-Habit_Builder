import { Frequency, Period } from "../Frequency";
import { NegativeHabit } from "../NegativeHabit";

describe("Test negative habits", () => {

    const id = 1;
    const name = "Limit caffiene consumption";

    test("Daily", () => {
        const multiplicity = 1;
        const period: Period = "daily";
        const frequency = new Frequency(multiplicity, period);
        const today = new Date("2025-11-04T00:00:00Z");
        const yesterday = new Date(new Date(today).setUTCDate(today.getUTCDate() - 1));
        const habit = new NegativeHabit(id, name, frequency, yesterday);
        expect(habit.countPeriodEvents(yesterday)).toBe(0);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(2);
        expect(habit.calculateStreak(today)).toBe(0);
    });

});