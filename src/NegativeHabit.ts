import { Habit } from "./Habit";

/** Represents a habit the user wants to do less of. */
export class NegativeHabit<CustomProperties> extends Habit<CustomProperties> {

    /** Success if the number of events is less than or equal to the defined multiplicity. */
    isPeriodSuccess(numEvents: number): boolean {
        return numEvents <= this.frequency.multiplicity;
    }

    /** Adjusts down the calculated streak to account for success being counted in the current period. */
    protected adjustCalculatedStreak(streak: number): number {
        return Math.max(0, streak - 1);
    }

}