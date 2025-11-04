export type Period = "daily" | "weekly" | "monthly" | "annually";

/** Represents the minimum/maximum frequency of which the user wants to perform/avoid a habit. */
export class Frequency {
    multiplicity: number;
    period: Period;

    constructor(multiplicity: number, period: Period) {
        if (!Number.isInteger(multiplicity)) {
            throw new Error(`Multiplicity must be an integer: ${multiplicity}`);
        }
        if (multiplicity <= 0) {
            throw new Error(`Multiplicity must be greater than zero: ${multiplicity}`);
        }
        this.multiplicity = multiplicity;
        this.period = period;
    }

    /** Get the start date for the current period. */
    getCurrentPeriodStartDate(): Date {
        const startDate = new Date();
        switch (this.period) {
            case "daily":
                // Get the start of the current day
                startDate.setUTCHours(0, 0, 0, 0);
                break;
            case "weekly":
                // Get the start of the current week (Sunday)
                const dayOfWeek = startDate.getUTCDay();
                startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek);
                startDate.setUTCHours(0, 0, 0, 0);
                break;
            case "monthly":
                // Get the start of the current month
                startDate.setUTCDate(1);
                startDate.setUTCHours(0, 0, 0, 0);
                break;
            case "annually":
                // Get the start of the current year
                startDate.setUTCMonth(0, 1);
                startDate.setUTCHours(0, 0, 0, 0);
                break;
        }
        return startDate;
    }

    /** Get the start date for the previous period given a date. */
    getPreviousPeriodStart(date: Date): Date {
        const previousDate = new Date(date);
        switch (this.period) {
            case "daily":
                previousDate.setUTCDate(previousDate.getUTCDate() - 1);
                break;
            case "weekly":
                previousDate.setUTCDate(previousDate.getUTCDate() - 7);
                break;
            case "monthly":
                previousDate.setUTCMonth(previousDate.getUTCMonth() - 1);
                break;
            case "annually":
                previousDate.setUTCFullYear(previousDate.getUTCFullYear() - 1);
                break;
        }
        return previousDate;
    }

    /** Get the start date for the next period given a date. */
    getNextPeriodStart(date: Date): Date {
        const nextDate = new Date(date);
        switch (this.period) {
            case "daily":
                nextDate.setUTCDate(nextDate.getUTCDate() + 1);
                break;
            case "weekly":
                nextDate.setUTCDate(nextDate.getUTCDate() + 7);
                break;
            case "monthly":
                nextDate.setUTCMonth(nextDate.getUTCMonth() + 1);
                break;
            case "annually":
                nextDate.setUTCFullYear(nextDate.getUTCFullYear() + 1);
                break;
        }
        return nextDate;
    }
}