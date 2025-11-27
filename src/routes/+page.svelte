<script lang="ts">
    import HabitList from "$lib/client/components/HabitList.svelte";

    export let data;
    $: habits = data?.habits || [];
</script>

<HabitList {habits} />