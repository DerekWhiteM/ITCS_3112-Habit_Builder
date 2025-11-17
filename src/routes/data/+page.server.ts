import { fail, redirect } from '@sveltejs/kit';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import type { Actions } from './$types';

export const actions: Actions = {
    import: async ({ request }) => {
        const data = await request.formData();
        const file = data.get('data');

        if (!file || typeof (file as any).text !== 'function') {
            return fail(400, { success: false, error: 'No file' } as any);
        }

        try {
            const text = await (file as any).text();
            const builder = CustomHabitBuilder.getInstance();
            await builder.importData(text);
            return { success: true } as any;
        } catch (e) {
            return fail(400, { success: false, error: 'Invalid JSON' } as any);
        }
    },

    export: async () => {
        throw redirect(303, '/data/export');
    }
};
