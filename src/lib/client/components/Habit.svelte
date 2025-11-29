<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Habit } from "$lib/client/types";
    import DangerButton from "./DangerButton.svelte";
    import PrimaryButton from "./PrimaryButton.svelte";
    export let habit: Habit;
</script>

<div
    class="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
>
    <div>
        <h3 class="font-medium text-gray-900">
            {habit.name}
        </h3>
        <p class="text-sm text-gray-500">
            {habit.frequency} • {habit.periodProgress} •
            {habit.streak}
        </p>
    </div>
    <div class="flex space-x-2">
        <form method="POST" action={`?/logEvent`} use:enhance>
            <input type="hidden" name="id" value={habit.id} />
            <PrimaryButton>Log</PrimaryButton>
        </form>
        <form method="POST" action={`?/deleteHabit`} use:enhance>
            <input type="hidden" name="id" value={habit.id} />
            <DangerButton>Delete</DangerButton>
        </form>
    </div>
</div>
