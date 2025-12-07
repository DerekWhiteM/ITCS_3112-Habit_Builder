import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        user: {
            id: locals.user?.id,
            username: locals.user?.username,
            role: locals.user?.getRole(),
        }
    };
};