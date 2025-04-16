<script setup>
import { defineProps } from 'vue';

defineProps({
  users: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden mb-8 card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-trophy text-primary-400 mr-2"></i>
        Hall of Fame
      </h4>
    </div>
    <div v-if="users" class="divide-y divide-background-light">
      <router-link 
        v-for="(user, index) in users" 
        :key="user.id" 
        :to="`/profile/${user.id}`"
        class="block"
      >
        <div class="p-4 flex items-center justify-between hover:bg-surface-hover transition-colors">
          <div class="flex items-center space-x-4">
            <img 
              :src="user.image" 
              :alt="user.name" 
              class="w-12 h-12 rounded-lg object-cover shadow-sm"
            />
            <div>
              <h4 class="text-base font-medium text-text-primary">{{ user.name }}</h4>
              <p class="text-sm text-text-secondary">@{{ user.name }}</p>
              <div class="text-sm text-text-muted flex items-center mt-1">
                <i class="fas fa-location-dot text-text-muted mr-1"></i>
                {{ user.total_points }} Points
              </div>
            </div>
          </div>
          <div class="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            {{ user.total_points }}
          </div>
        </div>
      </router-link>
    </div>
    <div v-else class="loading flex items-center justify-center py-36">
      <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div class="bg-surface-muted px-6 py-3 text-right">
      <a href="#" class="text-primary-400 hover:text-primary-300 font-medium text-sm flex items-center justify-end">
        View full rankings
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>
