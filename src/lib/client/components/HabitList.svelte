<script lang="ts">
    import type { Habit as THabit } from "$lib/client/types";
    export let habits: Array<THabit> = [];
    import Habit from "./Habit.svelte";
</script>

<div class="my-0">
    {#if habits.length === 0}
        <p class="text-white text-center py-4">
            No habits found. Add your first habit to get started!
        </p>
    {:else}
        <ul class="space-y-3">
            {#each habits as habit}
                <li>
                    <Habit habit={habit} />
                </li>
            {/each}
        </ul>
    {/if}
</div>
