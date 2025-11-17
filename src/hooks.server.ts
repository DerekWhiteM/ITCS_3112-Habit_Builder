import { CustomHabit } from '$lib/server/CustomHabitBuilder/CustomHabit';
import { CustomHabitBuilder } from '$lib/server/CustomHabitBuilder/CustomHabitBuilder';
import { HabitRepository } from '$lib/server/HabitBuilder/HabitRepository';
import { InMemoryRepository } from '$lib/server/CustomHabitBuilder/InMemoryRepository';
import { redirect } from '@sveltejs/kit';
import { UserRepository } from '$lib/server/CustomHabitBuilder/User';
import type { Handle } from '@sveltejs/kit';

let initialized = false;

function initialize() {
    const userRepo = UserRepository.getInstance();
    const repositoryAdapter = new InMemoryRepository<CustomHabit>();
    const habitRepo = HabitRepository.getInstance(repositoryAdapter);
    CustomHabitBuilder.getInstance(userRepo, habitRepo);
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
        user = await habitBuilder.getUserById(parseInt(userId));
        
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
    }

    return resolve(event);
};