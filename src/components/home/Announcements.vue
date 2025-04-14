<script setup>
import { defineProps } from 'vue';

// Define the "announcements" prop to receive data from the parent
defineProps({
  announcements: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden mb-8 card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-bullhorn text-primary-400 mr-2"></i>
        Latest Announcements
      </h4>
      <span class="px-3 py-1 bg-secondary-500 text-text-primary text-xs font-medium rounded-full">New</span>
    </div>
    <div v-if="announcements" class="divide-y divide-background-light">
      <div 
        v-for="(announcement, index) in announcements" 
        :key="announcement.id" 
        class="p-4 hover:bg-surface-hover transition-colors"
      >
        <div class="flex justify-between mb-2">
          <h5 class="font-medium text-text-primary">{{ announcement.title }}</h5>
          <span class="text-xs text-text-muted">{{ new Date(announcement.created_at).toLocaleDateString() }}</span>
        </div>
        <p class="text-sm text-text-secondary mb-2">
          {{ announcement.content }}
        </p>
        <div class="flex justify-end">
          <a href="#" class="text-xs text-primary-400 hover:text-primary-300">Read more</a>
        </div>
      </div>
    </div>
    <div v-else class="loading flex items-center justify-center py-36">        <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    <div class="bg-surface-muted px-6 py-3 text-center">
      <a href="#" class="text-primary-400 hover:text-primary-300 font-medium text-sm flex items-center justify-center">
        View all announcements
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>