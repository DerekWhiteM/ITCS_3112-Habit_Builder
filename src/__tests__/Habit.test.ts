import { Frequency } from "../Frequency";
import { PositiveHabit } from "../PositiveHabit";

describe("Test habits", () => {

    test("PositiveHabit", () => {
        const id = 1;
        const name = "Do 10 push-ups";
        const multiplicity = 3;
        const period = "daily";
        const frequency = new Frequency(multiplicity, period);
        const createdAt = new Date("2025-11-03T00:00:00Z");

        interface CustomProperties {
            category: string;
            difficulty: number;
        }

        const customProperties: CustomProperties = {
            category: "fitness",
            difficulty: 5,
        };

        const habit = new PositiveHabit<CustomProperties>(id, name, frequency, createdAt, customProperties);

        expect(habit.id).toBe(id);
        expect(habit.name).toBe(name);
        expect(habit.frequency.multiplicity).toBe(multiplicity);
        expect(habit.frequency.period).toBe(period);
        expect(habit.customProperties.category).toBe(customProperties.category);
        expect(habit.customProperties.difficulty).toBe(customProperties.difficulty);

        habit.logEvent();

        expect(habit.countCurrentPeriodEvents()).toBe(1);
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