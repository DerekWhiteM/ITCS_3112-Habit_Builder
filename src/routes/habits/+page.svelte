<script lang="ts">
    import HabitList from "$lib/components/HabitList.svelte";

    // Get habits from the server-side load function
    export let data;
    $: habits = data?.habits || [];
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-8">
    <HabitList {habits} />
</div>
