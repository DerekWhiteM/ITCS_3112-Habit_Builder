import { Frequency } from "./Frequency";

export enum HabitType {
    POSITIVE,
    NEGATIVE
}

/** Represents a habit. */
export class Habit {
    type: HabitType;
    id: string;
    name: string;
    frequency: Frequency;
    createdAt: Date;

    events: Date[] = [];

    constructor(
        type: HabitType,
        id: string,
        name: string,
        frequency: Frequency,
        createdAt: Date,
    ) {
        if (
            type === undefined ||
            id === undefined ||
            name === undefined ||
            frequency === undefined ||
            createdAt === undefined
        ) {
            throw "Missing required parameter";
        }
        this.type = type;
        this.id = id;
        this.name = name;
        this.frequency = frequency;
        this.createdAt = createdAt;
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

        return this.adjustCalculatedStreak(streak);
    }

    /** Overridden by NegativeHabit */
    private adjustCalculatedStreak(streak: number) {
        switch (this.type) {
            case HabitType.POSITIVE:
                return streak;
            case HabitType.NEGATIVE:
                return Math.max(0, streak - 1);
        }
    }

    /** Determine whether the number of events adheres to the frequency policy. */
    private isPeriodSuccess(numEvents: number): boolean {
        switch (this.type) {
            case HabitType.POSITIVE:
                return numEvents >= this.frequency.multiplicity;
            case HabitType.NEGATIVE:
                return numEvents <= this.frequency.multiplicity;
        }
    };
}