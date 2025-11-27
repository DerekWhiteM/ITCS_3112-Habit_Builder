<script lang="ts">
    import { enhance } from "$app/forms";
    import PrimaryButton from "$lib/client/components/PrimaryButton.svelte";
    import SecondaryButton from "$lib/client/components/SecondaryButton.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
    function reset() {
        form = null;
    }
</script>

<div class="space-y-8">
    <div class="bg-white rounded-2xl shadow-2xl p-4 space-y-4">
        <h2 class="text-lg font-semibold">Import</h2>
        <p>Import application state from a JSON file.</p>
        <form
            method="POST"
            action="?/import"
            enctype="multipart/form-data"
            class="space-y-4"
            use:enhance
            on:submit={reset}
        >
            <input
                id="data"
                type="file"
                name="data"
                accept="application/json"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg
                           focus:outline-none focus:border-purple-500 cursor-pointer"
            />

            <PrimaryButton>Import</PrimaryButton>

            {#if form?.success === false}
                <p class="mt-2 text-sm text-red-600">
                    Import failed{form?.error ? ` - ${form.error}` : ""}
                </p>
            {:else if form?.success === true}
                <p class="mt-2 text-sm text-green-600">Import successful</p>
            {/if}
        </form>
    </div>

    <div class="bg-white rounded-2xl shadow-2xl p-4 space-y-4">
        <h2 class="text-lg font-semibold">Export</h2>
        <p>Export application state to a JSON file.</p>
        <form method="POST" action="?/export">
            <PrimaryButton>Export</PrimaryButton>
        </form>
    </div>
</div>
