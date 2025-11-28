import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/auth');
    }
    return {};
};

export const actions: Actions = {
    create: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/auth');
        }

        const data = await request.formData();
        const name = data.get('name')?.toString().trim();
        const typeVal = data.get('type')?.toString();
        const multiplicityStr = data.get('multiplicity')?.toString();
        const periodVal = data.get('period')?.toString();

        const multiplicity = parseInt(multiplicityStr ?? '0', 10);
        if (!name || !typeVal || !periodVal || !Number.isFinite(multiplicity) || multiplicity < 1) {
            return fail(400, { error: 'Missing or invalid fields', values: { name, type: typeVal, multiplicity, period: periodVal } } as any);
        }

        const type: 'positive' | 'negative' = typeVal as any;
        const period: 'daily' | 'weekly' | 'monthly' | 'yearly' = periodVal as any;
        const id = Date.now();

        const builder = CustomHabitBuilder.getInstance();
        await builder.createHabit(id, locals.user.id, name, type, multiplicity, period);

        throw redirect(303, '/habits');
    }
};
