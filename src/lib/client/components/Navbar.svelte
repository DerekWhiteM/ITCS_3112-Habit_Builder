<script lang="ts">
    import LogoutButton from "./LogoutButton.svelte";
    import NavItem from "./NavItem.svelte";
</script>

<header class="w-full px-4 py-2 flex items-center justify-between fixed">
    <a href="/"
        ><h1 class="text-xl text-white font-semibold">HabitBuilder</h1></a
    >
    <div class="flex items-center space-x-4">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/habits">My Habits</NavItem>
        <NavItem href="/habits/create">Create Habit</NavItem>
        <NavItem href="/data">Import/Export</NavItem>
        <LogoutButton />
    </div>
</header>
