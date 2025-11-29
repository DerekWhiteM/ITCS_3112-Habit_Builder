import { redirect } from '@sveltejs/kit';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
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
        periodProgress: `${habit.countPeriodEvents(new Date())}/${habit.frequency.multiplicity}`,
        streak: `Streak: ${habit.calculateStreak(new Date())}`,
    }));

    return {
        user: locals.user,
        habits: formattedHabits
    };
};

export const actions: Actions = {

    logEvent: async ({ request }) => {
        const data = await request.formData();
        const habitId = data.get('id') as string;
        const habitBuilder = CustomHabitBuilder.getInstance();
        habitBuilder.logEvent(parseInt(habitId));
    },

    deleteHabit: async ({ request }) => {
        const data = await request.formData();
        const habitId = data.get('id') as string;
        const habitBuilder = CustomHabitBuilder.getInstance();
        await habitBuilder.deleteHabit(parseInt(habitId));
    }

}