<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;

    let isLogin = true;

    function toggleMode() {
        isLogin = !isLogin;
        form = null;
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">
            {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        
        <form method="POST" action="?/{isLogin ? 'login' : 'signup'}" use:enhance>
            <div class="mb-6">
                <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={form?.username || ''}
                    placeholder="Enter your username"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>

            {#if form?.error}
                <div class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <p class="text-red-700 text-sm">{form.error}</p>
                </div>
            {/if}

            <button 
                type="submit" 
                class="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
        </form>

        <p class="text-center mt-6 text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button 
                type="button" 
                on:click={toggleMode} 
                class="text-purple-600 font-semibold hover:text-purple-800 ml-1 underline"
            >
                {isLogin ? 'Sign Up' : 'Login'}
            </button>
        </p>
    </div>
</div>