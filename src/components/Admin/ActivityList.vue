<template>
    <div class="divide-y divide-background-light">
      <div 
        v-for="activity in visibleActivities" 
        :key="activity.id" 
        class="flex items-center px-6 py-4 hover:bg-surface-hover transition-colors"
      >
        <div class="w-10 h-10 rounded-full flex items-center justify-center mr-4" :class="activity.iconBg">
          <i :class="[activity.icon, activity.iconColor]"></i>
        </div>
        <div class="flex-1">
          <p class="text-text-primary" v-html="activity.message"></p>
            <p class="text-xs text-text-secondary">
            {{ formatAgo(activity.id) }}
            </p>
        </div>
      </div>
      
      <div v-if="activities.length === 0" class="flex items-center justify-center p-8">
        <div class="text-center text-text-secondary">
          <i class="fas fa-history text-2xl mb-2"></i>
          <p>No recent activity</p>
        </div>
      </div>

    <!-- Show All Button -->
    <div v-if="activities.length > 15" class="flex justify-center p-4">
      <button 
        @click="toggleShowAll" 
        class="text-secondary-500 hover:text-secondary-700 font-medium"
      >
        {{ showAll ? 'Show Less' : 'Show All' }}
      </button>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue';

  const props =  defineProps({
    activities: {
      type: Array,
      default: () => []
    }
  });

const showAll = ref(false);

// Computed property to determine visible activities
const visibleActivities = computed(() => {
  return showAll.value ?props.activities : props.activities.slice(0, 5);
});

// Toggle the showAll state
const toggleShowAll = () => {
  showAll.value = !showAll.value;
};

// Format timestamps to "time ago" format
  function formatAgo(timestamp) {
    const now = Date.now();
    const diff = Math.floor((now - new Date(timestamp)) / 1000);
    if (diff < 30) return `just now`;
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }
  </script>