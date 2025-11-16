// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
type User = import("$lib/server/CustomHabitBuilder/User").User;

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: User;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
