import { CustomProperties } from "./CustomProperties";
import { Frequency } from "./Frequency";

export abstract class Habit<TCustomProperties extends CustomProperties> {
    id: number;
    name: string;
    frequency: Frequency;
    createdAt: Date;
    customProperties: TCustomProperties;

    events: Date[] = [];

    constructor(
        id: number,
        name: string,
        frequency: Frequency,
        createdAt: Date = new Date(),
        customProperties: TCustomProperties = {} as TCustomProperties
    ) {
        this.id = id;
        this.name = name;
        this.frequency = frequency;
        this.createdAt = createdAt;
        this.customProperties = customProperties;
    }

    logEvent(date: Date = new Date()) {
        this.events.push(date);
        this.events.sort((a, b) => a.getTime() - b.getTime());
    }

    calculateCurrentPeriodProgress(): number {
        return this.calculatePeriodProgress(this.frequency.getCurrentPeriodStartDate());
    }

    calculatePeriodProgress(periodStart: Date): number {
        const periodEnd = this.frequency.getNextPeriodStart(periodStart);
        let progress = 0;

        // Iterate through events in reverse order
        for (let i = this.events.length - 1; i >= 0; i--) {
            const event = this.events[i];
            console.log(`Checking event ${i}:`, event,
                `>= periodStart: ${event >= periodStart}`,
                `< periodEnd: ${event < periodEnd}`);
            if (event < periodStart) {
                break;
            }
            if (event < periodEnd) {
                progress++;
            }
        }
        return progress;
    }

    abstract isStreakMet(progress: number): boolean;

    calculateStreak(): number {
        let streak = 0;
        let periodStart = this.frequency.getCurrentPeriodStartDate();

        while (true) {
            const progress = this.calculatePeriodProgress(periodStart);

            // Check if streak condition is met (implemented by subclasses)
            if (this.isStreakMet(progress)) {
                streak++;
            } else {
                // Streak broken
                break;
            }

            // Move to previous period
            periodStart = this.frequency.getPreviousPeriodStart(periodStart);
            const periodEnd = this.frequency.getNextPeriodStart(periodStart);

            // Stop if we've gone before the creation date
            if (periodEnd <= this.createdAt) {
                break;
            }
        }

        return streak;
    }
}