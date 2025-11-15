export interface Period {

    /** Get the start date for a period */
    getPeriodStart(date: Date): Date;

    /** Get the end date for a period */
    getPeriodEnd(date: Date): Date;

    /** Get the start date for the previous period given a date */
    getPreviousPeriodStart(date: Date): Date;

}

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly';

/*
export const PeriodFactory = {
    
    create: (type: PeriodType): Period => (this as any)[type](),
};
*/

export class PeriodFactory {
    private static periods = {
        daily: () => new Daily(),
        weekly: () => new Weekly(),
        monthly: () => new Monthly(),
        yearly: () => new Yearly(),
    }

    public static create(type: PeriodType) {
        const creator = PeriodFactory.periods[type];
        if (!creator) {
            throw new Error(`Unknown period type: ${type}`);
        }
        return creator();
    }
}

class Daily implements Period {

    /** Get the start of the day */
    getPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        return startDate;
    }

    /** Get the end of the day */
    getPeriodEnd(date: Date): Date {
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);
        return endDate;
    }

    /** Get the start of the previous day */
    getPreviousPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCDate(startDate.getUTCDate() - 1);
        return this.getPeriodStart(startDate);
    }
}

class Weekly implements Period {

    /** Get the start of the week (Sunday) */
    getPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        const dayOfWeek = startDate.getUTCDay();
        startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek);
        startDate.setUTCHours(0, 0, 0, 0);
        return startDate;
    }

    /** Get the end of the week (Saturday) */
    getPeriodEnd(date: Date): Date {
        const endDate = new Date(date);
        const dayOfWeek = endDate.getUTCDay();
        endDate.setUTCDate(endDate.getUTCDate() + (6 - dayOfWeek));
        endDate.setUTCHours(23, 59, 59, 999);
        return endDate;
    }

    /** Get the start of the previous week */
    getPreviousPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCDate(startDate.getUTCDate() - 7);
        return this.getPeriodStart(startDate);
    }
}

class Monthly implements Period {

    /** Get the start of the month */
    getPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCDate(1);
        startDate.setUTCHours(0, 0, 0, 0);
        return startDate;
    }

    /** Get the end of the month */
    getPeriodEnd(date: Date): Date {
        const endDate = new Date(date);
        endDate.setUTCMonth(endDate.getUTCMonth() + 1, 0);
        endDate.setUTCHours(23, 59, 59, 999);
        return endDate;
    }

    /** Get the start of the previous month */
    getPreviousPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCMonth(startDate.getUTCMonth() - 1);
        return this.getPeriodStart(startDate);
    }
}

class Yearly implements Period {

    /** Get the start of the year */
    getPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCMonth(0, 1);
        startDate.setUTCHours(0, 0, 0, 0);
        return startDate;
    }

    /** Get the end of the year */
    getPeriodEnd(date: Date): Date {
        const endDate = new Date(date);
        endDate.setUTCMonth(11, 31);
        endDate.setUTCHours(23, 59, 59, 999);
        return endDate;
    }

    /** Get the start of the previous year */
    getPreviousPeriodStart(date: Date): Date {
        const startDate = new Date(date);
        startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
        return this.getPeriodStart(startDate);
    }
}