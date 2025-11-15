import { describe, expect, test } from "vitest";
import { Habit, HabitType } from "../Habit";
import { PeriodFactory } from "../Period";

describe("Test positive habits", () => {

    const today = new Date("2025-11-04T00:00:00Z");
    const type = HabitType.POSITIVE;
    const id = '1';
    const name = "Do 10 push-ups";

    test("Daily", () => {
        const yesterday = new Date(new Date(today).setUTCDate(today.getUTCDate() - 1));
        const frequency = {
            multiplicity: 3,
            period: PeriodFactory.create('daily'),
        };
        const habit = new Habit(id, name, type, frequency, yesterday);
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
        const lastWeek = new Date(new Date(today).setUTCDate(today.getUTCDate() - 7));
        const frequency = {
            multiplicity: 3,
            period: PeriodFactory.create('weekly'),
        };
        const habit = new Habit(id, name, type, frequency, lastWeek);
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
        const lastMonth = new Date(new Date(today).setUTCMonth(today.getUTCMonth() - 1));
        const frequency = {
            multiplicity: 3,
            period: PeriodFactory.create('monthly'),
        };
        const habit = new Habit(id, name, type, frequency, lastMonth);
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
        const lastYear = new Date(new Date(today).setUTCFullYear(today.getUTCFullYear() - 1));
        const frequency = {
            multiplicity: 3,
            period: PeriodFactory.create('yearly'),
        };
        const habit = new Habit(id, name, type, frequency, lastYear);
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

describe("Test negative habits", () => {

    const today = new Date("2025-11-04T00:00:00Z");
    const type = HabitType.NEGATIVE;
    const id = '1';
    const name = "Limit caffiene consumption";

    test("Daily", () => {
        const yesterday = new Date(new Date(today).setUTCDate(today.getUTCDate() - 1));
        const frequency = {
            multiplicity: 1,
            period: PeriodFactory.create('daily'),
        };
        const habit = new Habit(id, name, type, frequency, yesterday);
        expect(habit.countPeriodEvents(yesterday)).toBe(0);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(2);
        expect(habit.calculateStreak(today)).toBe(0);
    });

    test("Weekly", () => {
        const lastWeek = new Date(new Date(today).setUTCDate(today.getUTCDate() - 7));
        const frequency = {
            multiplicity: 1,
            period: PeriodFactory.create('weekly'),
        };
        const habit = new Habit(id, name, type, frequency, lastWeek);
        expect(habit.countPeriodEvents(lastWeek)).toBe(0);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(2);
        expect(habit.calculateStreak(today)).toBe(0);
    });

    test("Monthly", () => {
        const lastMonth = new Date(new Date(today).setUTCMonth(today.getUTCMonth() - 1));
        const frequency = {
            multiplicity: 1,
            period: PeriodFactory.create('monthly'),
        };
        const habit = new Habit(id, name, type, frequency, lastMonth);
        expect(habit.countPeriodEvents(lastMonth)).toBe(0);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(2);
        expect(habit.calculateStreak(today)).toBe(0);
    });

    test("Yearly", () => {
        const lastYear = new Date(new Date(today).setUTCFullYear(today.getUTCFullYear() - 1));
        const frequency = {
            multiplicity: 1,
            period: PeriodFactory.create('yearly'),
        };
        const habit = new Habit(id, name, type, frequency, lastYear);
        expect(habit.countPeriodEvents(lastYear)).toBe(0);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(1);
        expect(habit.calculateStreak(today)).toBe(1);
        habit.logEvent(today);
        expect(habit.countPeriodEvents(today)).toBe(2);
        expect(habit.calculateStreak(today)).toBe(0);
    });

});