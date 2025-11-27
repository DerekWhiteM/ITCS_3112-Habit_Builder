<script lang="ts">
    import HabitList from "$lib/components/HabitList.svelte";

    // Get habits from the server-side load function
    export let data;
    $: habits = data?.habits || [];
</script>

<div class="container mx-auto px-4 py-8">
    <HabitList {habits} />
</div>
