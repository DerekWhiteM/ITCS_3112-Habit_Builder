import { Habit } from "./Habit";
import { CustomProperties } from "./CustomProperties";

export class PositiveHabit<TCustomProperties extends CustomProperties> extends Habit<TCustomProperties> {

    isStreakMet(progress: number): boolean {
        return progress >= this.frequency.multiplicity;
    }

}