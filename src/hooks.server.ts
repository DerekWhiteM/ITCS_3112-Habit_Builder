import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import { HabitRepository } from '$lib/server/CustomHabitBuilder/HabitRepository';
import { error, redirect } from '@sveltejs/kit';
import { UserRepository } from '$lib/server/CustomHabitBuilder/UserRepository';
import type { Handle } from '@sveltejs/kit';

let initialized = false;

function initialize() {
    const userRepo = UserRepository.getInstance();
    const habitRepo = HabitRepository.getInstance();
    const habitBuilder = CustomHabitBuilder.getInstance(userRepo, habitRepo);
    habitBuilder.createUser('admin', 'admin');
}

export const handle: Handle = async ({ event, resolve }) => {

    if (!initialized) {
        initialize();
        initialized = true;
    }

    const userId = event.cookies.get('userId');
    let user = null;
    
    // Verify user actually exists in repository
    if (userId) {
        const habitBuilder = CustomHabitBuilder.getInstance();
        user = habitBuilder.getUserById(parseInt(userId));
        
        // If cookie exists but user doesn't, clear the invalid cookie
        if (!user) {
            event.cookies.delete('userId', { path: '/' });
        } else {
            event.locals.user = user;
        }
    }

    // Don't redirect during form actions (let them complete first)
    const isFormAction = event.request.method === 'POST';
    
    if (!isFormAction) {
        // Redirect to /auth if not logged in and trying to access protected routes
        if (!user && event.url.pathname === '/') {
            throw redirect(303, '/auth');
        }

        // Redirect to / if logged in and trying to access /auth
        if (user && event.url.pathname === '/auth') {
            throw redirect(303, '/');
        }

        if (user && event.url.pathname === '/data') {
            if (user.role !== 'admin') {
                throw error(403)
            }
        }
    }

    return resolve(event);
};