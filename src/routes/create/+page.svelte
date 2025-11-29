<script>
    import PrimaryButton from "$lib/client/components/PrimaryButton.svelte";
    const cardStyle = "bg-white p-4 rounded-md";
    const formStyle = "space-y-2 mb-8";
    const formHeadingStyle = "text-2xl font-semibold text-gray-800 mb-4";
    const labelStyle = "text-gray-700";
    const inputStyle =
        "w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-purple-500";
</script>

<div class={cardStyle}>
    <form method="post">
        <h1 class={formHeadingStyle}>New Habit</h1>
        <div class={formStyle}>
            <div>
                <label for="name" class={labelStyle}>Name</label>
                <input name="name" required placeholder="e.g. Brush teeth twice a day" class={inputStyle} />
            </div>
            <div>
                <label for="type" class={labelStyle}>Type</label>
                <select name="type" class={inputStyle}>
                    <option value="positive">Good</option>
                    <option value="negative">Bad</option>
                </select>
            </div>
            <div>
                <label for="multiplicity" class={labelStyle}>Multiplicity</label>
                <input name="multiplicity" type="number" required min={0} defaultValue={1} class={inputStyle} />
            </div>
            <div>
                <label for="period" class={labelStyle}>Period</label>
                <select name="period" class={inputStyle}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
        </div>
        <PrimaryButton>Create</PrimaryButton>
    </form>
</div>
