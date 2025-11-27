<script lang="ts">
    // Define the Habit type
    export let habits: Array<{
        id: string;
        name: string;
        frequency: string;
        periodProgress: string;
        streak: string;
    }> = [];

    // Function to toggle habit completion status
    function logEvent(id: string) {
        console.log(`Log event for habit: ${id}`);
        fetch(`/habits/${id}/logEvent`, {
            method: "POST",
        });
    }
</script>

<div class="max-w-[600px] my-0 mx-auto">
    {#if habits.length === 0}
        <p class="text-gray-500 text-center py-4">
            No habits found. Add your first habit to get started!
        </p>
    {:else}
        <ul class="space-y-3">
            {#each habits as habit (habit.id)}
                <li
                    class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <form method="POST" action={`?/logEvent`}>
                                <input type="hidden" name="id" value={habit.id} />
                                <button>Log event</button>
                            </form>
                            <div>
                                <h3 class="font-medium text-gray-900">
                                    {habit.name}
                                </h3>
                                <p class="text-sm text-gray-500">
                                    {habit.frequency} • {habit.periodProgress} •
                                    {habit.streak}
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
