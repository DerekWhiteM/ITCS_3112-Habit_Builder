import { Habit } from "./Habit";

/** Represents a habit the user wants to do more of. */
export class PositiveHabit<TProps> extends Habit<TProps> {

    /** Success if the number of events is greater than or equal to the defined multiplicity. */
    isPeriodSuccess(numEvents: number): boolean {
        return numEvents >= this.frequency.multiplicity;
    }

}