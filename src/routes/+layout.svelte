<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "$lib/client/components/Navbar.svelte";
    import { page } from "$app/state";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname.startsWith("/auth")}
    <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 px-4 pt-22">
        <div class="max-w-[400px] mx-auto">
            {@render children()}
        </div>
    </div>
{:else}
    <div class="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
        <Navbar />
        <div class="max-w-[600px] mt-8 mx-auto">
            {@render children()}
        </div>
    </div>
{/if}
