import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = cookies.get('userId');
    if (userId) {
        throw redirect(303, '/');
    }
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();

        if (!username) {
            return fail(400, { error: 'Username is required', username: '' });
        }

        const habitBuilder = CustomHabitBuilder.getInstance();
        const user = habitBuilder.getUserByUsername(username);

        if (!user) {
            return fail(400, { error: 'User not found', username });
        }

        cookies.set('userId', user.id.toString(), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        throw redirect(303, '/');
    },

    signup: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString();

        if (!username) {
            return fail(400, { error: 'Username is required', username: '' });
        }

        if (username.length < 3) {
            return fail(400, { error: 'Username must be at least 3 characters', username });
        }

        const habitBuilder = CustomHabitBuilder.getInstance();
        const existingUser = habitBuilder.getUserByUsername(username);

        if (existingUser) {
            return fail(400, { error: 'Username already exists', username });
        }

        const user = habitBuilder.createUser(username, 'user');

        cookies.set('userId', user.id.toString(), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        });

        throw redirect(303, '/');
    },

    logout: async ({ cookies }) => {
        cookies.delete('userId', { path: '/' });
        throw redirect(303, '/auth');
    }
};