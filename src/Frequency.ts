type Period = "daily" | "weekly" | "monthly" | "annually";

export class Frequency {
    multiplicity: number;
    period: "daily" | "weekly" | "monthly" | "annually";

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

    getCurrentPeriodStartDate(): Date {
        const earliestDate = new Date();
        switch (this.period) {
            case "daily":
                // Get the start of the current day
                earliestDate.setUTCHours(0, 0, 0, 0);
                break;
            case "weekly":
                // Get the start of the current week (Sunday)
                const dayOfWeek = earliestDate.getUTCDay();
                earliestDate.setUTCDate(earliestDate.getUTCDate() - dayOfWeek);
                earliestDate.setUTCHours(0, 0, 0, 0);
                break;
            case "monthly":
                // Get the start of the current month
                earliestDate.setUTCDate(1);
                earliestDate.setUTCHours(0, 0, 0, 0);
                break;
            case "annually":
                // Get the start of the current year
                earliestDate.setUTCMonth(0, 1);
                earliestDate.setUTCHours(0, 0, 0, 0);
                break;
        }
        return earliestDate;
    }

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