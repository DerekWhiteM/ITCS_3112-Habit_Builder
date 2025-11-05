export type Period = "daily" | "weekly" | "monthly" | "yearly";

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

    /** Get the start date for a period. */
    getPeriodStart(date: Date): Date {
        const startDate = new Date(date);
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
            case "yearly":
                // Get the start of the current year
                startDate.setUTCMonth(0, 1);
                startDate.setUTCHours(0, 0, 0, 0);
                break;
        }
        return startDate;
    }

    /** Get the end date for a period. */
    getPeriodEnd(date: Date): Date {
        const endDate = new Date(date);
        switch (this.period) {
            case "daily":
                // Get the end of the current day
                endDate.setUTCHours(23, 59, 59, 999);
                break;
            case "weekly":
                // Get the end of the current week (Saturday)
                const dayOfWeek = endDate.getUTCDay();
                endDate.setUTCDate(endDate.getUTCDate() + (6 - dayOfWeek));
                endDate.setUTCHours(23, 59, 59, 999);
                break;
            case "monthly":
                // Get the end of the current month
                endDate.setUTCMonth(endDate.getUTCMonth() + 1, 0);
                endDate.setUTCHours(23, 59, 59, 999);
                break;
            case "yearly":
                // Get the end of the current year
                endDate.setUTCMonth(11, 31);
                endDate.setUTCHours(23, 59, 59, 999);
                break;
        }
        return endDate;
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
            case "yearly":
                previousDate.setUTCFullYear(previousDate.getUTCFullYear() - 1);
                break;
        }
        return this.getPeriodStart(previousDate);
    }

}