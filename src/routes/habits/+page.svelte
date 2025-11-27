<script lang="ts">
  import HabitList from '$lib/components/HabitList.svelte';
  import { page } from '$app/stores';
  
  // Get habits from the server-side load function
  export let data;
  $: habits = data?.habits || [];

  function addNewHabit() {
    // In a real app, this would open a form/modal to add a new habit
    alert('Add new habit functionality will be implemented here');
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold text-gray-900">My Habits</h1>
    <button 
      on:click={addNewHabit}
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      <span>New Habit</span>
    </button>
  </div>
  
  <HabitList {habits} />
</div>
