<script lang="ts">
    import LogoutButton from "./LogoutButton.svelte";
    import NavItem from "./NavItem.svelte";
</script>

<header class="w-full px-4 py-2 flex items-center justify-between fixed">
    <a href="/"
        ><h1 class="text-xl text-white font-semibold">HabitBuilder</h1></a
    >
    <div class="flex items-center space-x-4">
        <NavItem href="/">My habits</NavItem>
        <NavItem href="/create">New habit</NavItem>
        <NavItem href="/data">Import/Export</NavItem>
        <LogoutButton />
    </div>
</header>
