<script lang="ts">
  // Define the Habit type
  export let habits: Array<{
    id: string;
    name: string;
    frequency: string;
    completed: boolean;
    streak: string;
  }> = [];

  // Function to toggle habit completion status
  function toggleHabit(id: string) {
    habits = habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
  }
</script>

<div class="max-w-[600px] my-0 mx-auto">
  {#if habits.length === 0}
    <p class="text-gray-500 text-center py-4">No habits found. Add your first habit to get started!</p>
  {:else}
    <ul class="space-y-3">
      {#each habits as habit (habit.id)}
        <li class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <button
                on:click={() => toggleHabit(habit.id)}
                class={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  habit.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 hover:border-green-500'
                }`}
                aria-label={habit.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {#if habit.completed}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                {/if}
              </button>
              <div>
                <h3 class="font-medium text-gray-900">{habit.name}</h3>
                <p class="text-sm text-gray-500">{habit.frequency} • {habit.streak}</p>
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .habit-list {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
