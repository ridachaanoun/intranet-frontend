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
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';

  defineProps({
    activities: {
      type: Array,
      default: () => []
    }
  });

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