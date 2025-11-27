<script lang="ts">
    import { page } from "$app/state";
    export let href;
</script>

<a href={href} class="text-white {page.url.pathname === href ? 'font-semibold' : ''}"><slot /></a>
