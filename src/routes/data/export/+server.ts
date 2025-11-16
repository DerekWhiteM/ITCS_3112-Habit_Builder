import type { RequestHandler } from '@sveltejs/kit';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';

export const GET: RequestHandler = async () => {
    const data = await CustomHabitBuilder.getInstance().exportData();
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="habit-builder-export.json"'
        }
    });
};