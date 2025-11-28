<script lang="ts">
    import { enhance } from '$app/forms';
    export let habit: { id: string | number; name: string; type: string };
    export let streak: number;
    export let periodProgress: { count: number; required: number };
</script>

<div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
    <div>
        <h3 class="font-medium text-gray-900">{habit.name}</h3>
        <p class="text-sm text-gray-600">{habit.type} • {periodProgress.count}/{periodProgress.required} • Streak {streak}</p>
    </div>
    <div class="flex items-center gap-2">
        <form method="POST" action="?/log" use:enhance>
            <input type="hidden" name="habitId" value={String(habit.id)} />
            <button class="px-3 py-2 bg-purple-600 text-white rounded-lg">Log completion</button>
        </form>
        <form method="POST" action="?/delete" use:enhance>
            <input type="hidden" name="habitId" value={String(habit.id)} />
            <button class="px-3 py-2 bg-red-600 text-white rounded-lg">Delete habit</button>
        </form>
    </div>
</div>
