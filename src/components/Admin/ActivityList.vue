<template>
    <div class="divide-y divide-background-light">
      <div 
        v-for="activity in activities" 
        :key="activity.id" 
        class="flex items-center px-6 py-4 hover:bg-surface-hover transition-colors"
      >
        <div class="w-10 h-10 rounded-full flex items-center justify-center mr-4" :class="activity.iconBg">
          <i :class="[activity.icon, activity.iconColor]"></i>
        </div>
        <div class="flex-1">
          <p class="text-text-primary" v-html="activity.message"></p>
          <p class="text-xs text-text-secondary">{{ activity.time }}</p>
        </div>
      </div>
      
      <div v-if="activities.length === 0" class="flex items-center justify-center p-8">
        <div class="text-center text-text-secondary">
          <i class="fas fa-history text-2xl mb-2"></i>
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ActivityList',
    props: {
      activities: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>