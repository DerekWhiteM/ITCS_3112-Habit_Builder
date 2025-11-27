<script lang="ts">
    import { enhance } from "$app/forms";
    import PrimaryButton from "$lib/client/components/PrimaryButton.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let isLogin = true;

    function toggleMode() {
        isLogin = !isLogin;
        form = null;
    }
</script>

<div class="bg-white rounded-2xl shadow-2xl w-full p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
    </h1>

    <form method="POST" action="?/{isLogin ? 'login' : 'signup'}" use:enhance>
        <div class="mb-6">
            <input
                type="text"
                id="username"
                name="username"
                value={form?.username || ""}
                placeholder="Enter your username"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
        </div>

        {#if form?.error}
            <div
                class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
            >
                <p class="text-red-700 text-sm">{form.error}</p>
            </div>
        {/if}

        <PrimaryButton>{isLogin ? "Login" : "Sign Up"}</PrimaryButton>
    </form>

    <p class="mt-6 text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
            type="button"
            on:click={toggleMode}
            class="text-purple-600 font-semibold hover:text-purple-800 ml-1 underline cursor-pointer"
        >
            {isLogin ? "Sign Up" : "Login"}
        </button>
    </p>
</div>
