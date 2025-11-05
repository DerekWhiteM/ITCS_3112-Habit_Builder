import { Frequency } from "../Frequency";

describe("Test Frequency", () => {

    const date = new Date("2025-11-04T09:00:00Z");

    test("Daily", () => {
        const frequency = new Frequency(1, "daily");
        frequency.getPeriodStart(date);
        expect(frequency.getPeriodStart(date)).toEqual(new Date("2025-11-04T00:00:00Z"));
        expect(frequency.getPeriodEnd(date)).toEqual(new Date("2025-11-04T23:59:59.999Z"));
        expect(frequency.getPreviousPeriodStart(date)).toEqual(new Date("2025-11-03T00:00:00Z"));
    });

    test("Weekly", () => {
        const frequency = new Frequency(1, "weekly");
        frequency.getPeriodStart(date);
        expect(frequency.getPeriodStart(date)).toEqual(new Date("2025-11-02T00:00:00Z"));
        expect(frequency.getPeriodEnd(date)).toEqual(new Date("2025-11-08T23:59:59.999Z"));
        expect(frequency.getPreviousPeriodStart(date)).toEqual(new Date("2025-10-26T00:00:00Z"));
    });

    test("Monthly", () => {
        const frequency = new Frequency(1, "monthly");
        frequency.getPeriodStart(date);
        expect(frequency.getPeriodStart(date)).toEqual(new Date("2025-11-01T00:00:00Z"));
        expect(frequency.getPeriodEnd(date)).toEqual(new Date("2025-11-30T23:59:59.999Z"));
        expect(frequency.getPreviousPeriodStart(date)).toEqual(new Date("2025-10-01T00:00:00Z"));
    });

    test("Annually", () => {
        const frequency = new Frequency(1, "annually");
        frequency.getPeriodStart(date);
        expect(frequency.getPeriodStart(date)).toEqual(new Date("2025-01-01T00:00:00Z"));
        expect(frequency.getPeriodEnd(date)).toEqual(new Date("2025-12-31T23:59:59.999Z"));
        expect(frequency.getPreviousPeriodStart(date)).toEqual(new Date("2024-01-01T00:00:00Z"));
    });

});