<script lang="ts">
    import HabitCard from '$lib/client/components/HabitCard.svelte';
    export let data;
</script>

<div class="space-y-4">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Your Habits</h1>
        <a href="/habits/create" class="px-4 py-2 bg-green-600 text-white rounded-lg">+ New Habit</a>
    </div>

    {#if data?.habits?.length === 0}
        <p class="text-white">No habits yet</p>
    {:else}
        <div class="space-y-3">
            {#each data.habits as h}
                <HabitCard habit={{ id: h.id, name: h.name, type: h.type }} streak={h.streak} periodProgress={{ count: h.currentCount, required: h.required }} />
            {/each}
        </div>
    {/if}
</div>

