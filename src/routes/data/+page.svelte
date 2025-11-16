<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;
    function reset() {
        form = null;
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-8">
    <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
            <h1 class="text-3xl font-bold text-gray-800">Data Import/Export</h1>

            <form
                method="POST"
                action="?/import"
                enctype="multipart/form-data"
                use:enhance
                on:submit={reset}
            >
                <label
                    for="data"
                    class="block text-sm font-medium text-gray-700 mb-2"
                >
                    Upload JSON
                </label>

                <input
                    id="data"
                    type="file"
                    name="data"
                    accept="application/json"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           focus:outline-none focus:border-purple-500 transition-colors"
                />

                <button
                    type="submit"
                    class="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg
                           hover:bg-purple-700 transition-colors"
                >
                    Import
                </button>

                {#if form?.success === false}
                    <p class="mt-2 text-sm text-red-600">
                        Import failed{form?.error ? ` - ${form.error}` : ''}
                    </p>
                {:else if form?.success === true}
                    <p class="mt-2 text-sm text-green-600">Import successful</p>
                {/if}
            </form>

            <form method="POST" action="?/export">
                <button
                    type="submit"
                    class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg
                           hover:bg-indigo-700 transition-colors"
                >
                    Export JSON
                </button>
            </form>
        </div>
    </div>
</div>
