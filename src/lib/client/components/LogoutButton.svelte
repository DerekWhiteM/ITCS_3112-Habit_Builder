<script>
    import { enhance } from "$app/forms";
    import DangerButton from "./DangerButton.svelte";
</script>

<form method="POST" action="/auth?/logout" use:enhance>
    <DangerButton>Logout</DangerButton>
</form>
