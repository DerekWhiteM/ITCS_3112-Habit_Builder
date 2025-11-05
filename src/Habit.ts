import { Frequency } from "./Frequency";

/** Represents a habit. */
export abstract class Habit<CustomProperties> {
    id: number;
    name: string;
    frequency: Frequency;
    createdAt: Date;
    customProperties: CustomProperties;

    events: Date[] = [];

    constructor(
        id: number,
        name: string,
        frequency: Frequency,
        createdAt: Date = new Date(),
        customProperties: CustomProperties = {} as CustomProperties
    ) {
        this.id = id;
        this.name = name;
        this.frequency = frequency;
        this.createdAt = createdAt;
        this.customProperties = customProperties;
    }

    /** Log a performance of the habit. */
    logEvent(date: Date) {
        this.events.push(date);
        this.events.sort((a, b) => a.getTime() - b.getTime());
    }

    /** Count the number of events for a period. */
    countPeriodEvents(date: Date): number {
        const periodStart = this.frequency.getPeriodStart(date);
        const periodEnd = this.frequency.getPeriodEnd(date);
        let numEvents = 0;
        for (let i = this.events.length - 1; i >= 0; i--) {
            const event = this.events[i];
            if (event < periodStart) {
                break;
            }
            if (event < periodEnd) {
                numEvents++;
            }
        }
        return numEvents;
    }

    /** Calculate the streak at a given date. */
    calculateStreak(date: Date): number {
        let streak = 0;
        let periodStart = this.frequency.getPeriodStart(date);

        while (true) {
            const progress = this.countPeriodEvents(periodStart);

            // Check if the success condition is met for this period
            if (this.isPeriodSuccess(progress)) {
                streak++;
            } else {
                // Streak broken
                break;
            }

            // Move to previous period
            periodStart = this.frequency.getPreviousPeriodStart(periodStart);
            const periodEnd = this.frequency.getPeriodEnd(periodStart);

            // Stop if we've gone too far
            if (periodEnd <= this.createdAt) {
                break;
            }
        }

        return streak;
    }

    /** Determine whether the number of events adheres to the frequency policy. */
    protected abstract isPeriodSuccess(numEvents: number): boolean;
}