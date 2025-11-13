import { redirect } from '@sveltejs/kit';
import { UserRepository } from '$lib/server/User';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const userId = event.cookies.get('userId');
    let user = null;
    
    // Verify user actually exists in repository
    if (userId) {
        const userRepo = UserRepository.getInstance();
        user = await userRepo.getUserById(parseInt(userId));
        
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