<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                Welcome to SvelteKit, {data.user?.username}!
            </h1>
            <p class="text-gray-600 mb-6">
                Visit <a href="https://svelte.dev/docs/kit" class="text-purple-600 hover:text-purple-800 underline">svelte.dev/docs/kit</a> to read the documentation
            </p>
            
            <form method="POST" action="/auth?/logout">
                <button 
                    type="submit"
                    class="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </form>
        </div>
    </div>
</div>