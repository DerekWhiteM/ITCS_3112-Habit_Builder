import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/auth');
    }

    const builder = CustomHabitBuilder.getInstance();
    const habits = await builder.listHabits(locals.user.id);

    const data = habits.map(h => ({
        id: h.id,
        name: h.name,
        type: h.type,
        currentCount: h.countPeriodEvents(new Date()),
        required: h.frequency.multiplicity,
        streak: h.calculateStreak(new Date()),
    }));

    return { habits: data };
};

export const actions: Actions = {
    log: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/auth');
        }
        const fd = await request.formData();
        const habitIdStr = fd.get('habitId')?.toString();
        if (!habitIdStr) {
            return fail(400, { error: 'Missing habitId' } as any);
        }
        const builder = CustomHabitBuilder.getInstance();
        await builder.logEvent(Number(habitIdStr), new Date());
        throw redirect(303, '/habits');
    },
    delete: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/auth');
        }
        const fd = await request.formData();
        const habitIdStr = fd.get('habitId')?.toString();
        if (!habitIdStr) {
            return fail(400, { error: 'Missing habitId' } as any);
        }
        const builder = CustomHabitBuilder.getInstance();
        await builder.deleteHabit(Number(habitIdStr));
        throw redirect(303, '/habits');
    }
};
