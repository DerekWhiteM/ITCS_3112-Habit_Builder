import { Habit } from "./Habit";
import { CustomProperties } from "./CustomProperties";

export class NegativeHabit<TCustomProperties extends CustomProperties> extends Habit<TCustomProperties> {

    isStreakMet(progress: number): boolean {
        return progress < this.frequency.multiplicity;
    }

}