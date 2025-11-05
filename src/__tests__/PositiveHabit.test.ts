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

    test("Weekly", () => {
        const multiplicity = 3;
        const period: Period = "weekly";
        const frequency = new Frequency(multiplicity, period);
        const today = new Date("2025-11-04T00:00:00Z");
        const lastWeek = new Date(new Date(today).setUTCDate(today.getUTCDate() - 7));
        const habit = new PositiveHabit(id, name, frequency, lastWeek);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(0);
        habit.logEvent(today);
        habit.logEvent(today);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(lastWeek);
        habit.logEvent(lastWeek);
        habit.logEvent(lastWeek);
        expect(habit.calculateStreak(today)).toBe(2);
    });

    test("Monthly", () => {
        const multiplicity = 3;
        const period: Period = "monthly";
        const frequency = new Frequency(multiplicity, period);
        const today = new Date("2025-11-04T00:00:00Z");
        const lastMonth = new Date(new Date(today).setUTCMonth(today.getUTCMonth() - 1));
        const habit = new PositiveHabit(id, name, frequency, lastMonth);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(0);
        habit.logEvent(today);
        habit.logEvent(today);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(lastMonth);
        habit.logEvent(lastMonth);
        habit.logEvent(lastMonth);
        expect(habit.calculateStreak(today)).toBe(2);
    });

    test("Yearly", () => {
        const multiplicity = 3;
        const period: Period = "yearly";
        const frequency = new Frequency(multiplicity, period);
        const today = new Date("2025-11-04T00:00:00Z");
        const lastYear = new Date(new Date(today).setUTCFullYear(today.getUTCFullYear() - 1));
        const habit = new PositiveHabit(id, name, frequency, lastYear);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(0);
        habit.logEvent(today);
        habit.logEvent(today);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(lastYear);
        habit.logEvent(lastYear);
        habit.logEvent(lastYear);
        expect(habit.calculateStreak(today)).toBe(2);
    });

});