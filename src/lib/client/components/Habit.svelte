<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Habit } from "$lib/client/types";
    import PrimaryButton from "./PrimaryButton.svelte";
    export let habit: Habit;
</script>

<div
    class="relative flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
>
    <span class="absolute left-2 top-2 h-2 w-2 rounded-full {habit.type === 'positive' ? 'bg-green-500' : 'bg-orange-500'}"></span>
    <div>
        <h3 class="font-medium text-gray-900">
            {habit.name}
        </h3>
        <p class="text-sm text-gray-500">
            {habit.frequency} • {habit.periodProgress} •
            {habit.streak}
        </p>
    </div>
    <form method="POST" action={`?/logEvent`} use:enhance>
        <input type="hidden" name="id" value={habit.id} />
        <PrimaryButton>Log</PrimaryButton>
    </form>
</div>
