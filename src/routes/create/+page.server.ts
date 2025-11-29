import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import { validateHabitType, type HabitType } from '$lib/server/HabitBuilder/Habit';
import { validatePeriodType, type PeriodType } from '$lib/server/HabitBuilder/Period';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ locals, request }) => {

        // Identify the current user
        const user = locals.user;
        if (!user) {
            throw new Error("No user");
        }
        const userId = user.id;

        // Prepare form data
        const data = await request.formData();
        const name = data.get('name') as string;
        const type = data.get('type') as string;
        const multiplicity = data.get('multiplicity') as string;
        const period = data.get('period') as string;
        if (!validateHabitType(type)) {
            throw new Error("Invalid habit type");
        }
        let multiplicityNum = Number(multiplicity);
        if (Number.isNaN(multiplicityNum)) {
            throw new Error("Multiplicity must be a number");
        }
        if (!validatePeriodType(period)) {
            throw new Error("Invalid period type");
        }

        // Create the habit
        const habitBuilder = CustomHabitBuilder.getInstance();
        await habitBuilder.createHabit(
            name,
            type as HabitType,
            multiplicityNum,
            period as PeriodType,
            userId
        );

        // Redirect to habit list
        redirect(303, '/');
    }
};