<script>
    import DangerButton from "./DangerButton.svelte";
</script>

<form method="POST" action="/auth?/logout">
    <DangerButton>Logout</DangerButton>
</form>
