import { redirect } from '@sveltejs/kit';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = cookies.get('userId');
    
    if (!userId) {
        throw redirect(303, '/auth');
    }

    const habitBuilder = CustomHabitBuilder.getInstance();
    const habits = await habitBuilder.listHabits(parseInt(userId));
    
    // Transform the habits data to match our frontend expectations
    const formattedHabits = habits.map(habit => ({
        id: habit.id.toString(),
        name: habit.name,
        frequency: `${habit.frequency.multiplicity}x ${habit.frequency.period.constructor.name.toLowerCase()}`,
        completed: false, // This would need to be calculated based on the habit's events
        streak: `Streak: ${habit.calculateStreak(new Date())}`,
    }));

    return {
        habits: formattedHabits
    };
};
