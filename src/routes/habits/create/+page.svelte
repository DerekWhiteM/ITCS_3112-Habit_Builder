<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Create Habit</h1>
    <form method="POST" action="?/create" use:enhance class="space-y-4">
        <input
            type="text"
            name="name"
            placeholder="Habit name"
            value={form?.values?.name ?? ''}
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
        />

        <div class="grid grid-cols-3 gap-4">
            <select
                name="type"
                required
                class="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
                <option value="positive">positive</option>
                <option value="negative">negative</option>
            </select>

            <input
                type="number"
                name="multiplicity"
                min="1"
                value={form?.values?.multiplicity ?? 1}
                required
                class="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />

            <select
                name="period"
                required
                class="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
            </select>
        </div>

        {#if form?.error}
            <p class="text-sm text-red-600">{form.error}</p>
        {/if}

        <button
            type="submit"
            class="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
            Create
        </button>
    </form>
</div>

