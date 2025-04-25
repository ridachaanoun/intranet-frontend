<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Left Column - Stats & Quick Actions -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-surface rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-text-secondary">Total Students</h3>
            <span class="p-2 bg-primary-500/10 rounded-full">
              <i class="fas fa-user-graduate text-primary-400"></i>
            </span>
          </div>
          <p class="text-2xl font-bold text-text-primary">{{ totalStudents }}</p>
          <p class="text-xs text-text-muted mt-1">Across {{ classrooms.length }} classrooms</p>
        </div>
        
        <div class="bg-surface rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-text-secondary">Active Tasks</h3>
            <span class="p-2 bg-accent-500/10 rounded-full">
              <i class="fas fa-tasks text-accent-400"></i>
            </span>
          </div>
          <p class="text-2xl font-bold text-text-primary">{{ activeTasks }}</p>
          <p class="text-xs text-text-muted mt-1">Due this week</p>
        </div>
        
        <div class="bg-surface rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-text-secondary">Pending Reviews</h3>
            <span class="p-2 bg-secondary-500/10 rounded-full">
              <i class="fas fa-clipboard-check text-secondary-400"></i>
            </span>
          </div>
          <p class="text-2xl font-bold text-text-primary">{{ pendingReviews }}</p>
          <p class="text-xs text-text-muted mt-1">Submissions awaiting review</p>
        </div>
      </div>
      
      <!-- Classrooms Overview -->
      <div class="bg-surface rounded-lg shadow-card overflow-hidden">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
          <h2 class="text-lg font-semibold text-text-primary">Your Classrooms</h2>
        </div>
        
        <div v-if="classrooms && classrooms.length" class="divide-y divide-background-light">
          <div 
            v-for="(classroom, index) in classrooms" 
            :key="index"
            class="p-4 hover:bg-surface-hover transition-colors"
          >
            <div class="flex justify-between mb-2">
              <h3 class="font-medium text-text-primary flex items-center">
                <i class="fas fa-chalkboard mr-2 text-primary-400"></i>
                {{ classroom.name }}
              </h3>
              <span class="px-3 py-1 bg-background text-text-secondary text-xs rounded-full">
                {{ classroom.students?.length || 0 }} Students
              </span>
            </div>
            <p class="text-sm text-text-secondary mb-2">
              {{ classroom.description || 'No description available' }}
            </p>
            <div class="flex justify-end mt-2">
              <button class="text-primary-400 hover:text-primary-600 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
        <div v-else class="p-12 text-center text-text-muted">
          <i class="fas fa-school text-4xl mb-3 opacity-30"></i>
          <p>No classrooms assigned yet</p>
        </div>
      </div>
    </div>
    
    <!-- Right Column - Recent Activities -->
    <div class="space-y-6">
      <!-- Quick Actions -->
      <div class="bg-surface rounded-lg shadow-card p-4">
        <h3 class="font-medium text-text-primary mb-4">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-3">
          <button class="flex flex-col items-center justify-center p-3 bg-background-element rounded-lg hover:bg-surface-hover transition-colors">
            <i class="fas fa-clipboard-list text-primary-400 text-xl mb-2"></i>
            <span class="text-sm text-text-secondary">New Task</span>
          </button>
          <button class="flex flex-col items-center justify-center p-3 bg-background-element rounded-lg hover:bg-surface-hover transition-colors">
            <i class="fas fa-star text-accent-400 text-xl mb-2"></i>
            <span class="text-sm text-text-secondary">Assign Points</span>
          </button>
          <button class="flex flex-col items-center justify-center p-3 bg-background-element rounded-lg hover:bg-surface-hover transition-colors">
            <i class="fas fa-bell text-secondary-400 text-xl mb-2"></i>
            <span class="text-sm text-text-secondary">Announcement</span>
          </button>
          <button class="flex flex-col items-center justify-center p-3 bg-background-element rounded-lg hover:bg-surface-hover transition-colors">
            <i class="fas fa-calendar-alt text-primary-400 text-xl mb-2"></i>
            <span class="text-sm text-text-secondary">Schedule</span>
          </button>
        </div>
      </div>
      
      <!-- Recent Activities -->
      <div class="bg-surface rounded-lg shadow-card overflow-hidden">
        <div class="bg-gradient-to-r from-accent-600 to-accent-700 px-6 py-4">
          <h2 class="text-lg font-semibold text-text-primary">Recent Activities</h2>
        </div>
        
        <div class="max-h-96 overflow-y-auto">
          <div v-if="recentActivities && recentActivities.length" class="divide-y divide-background-light">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id" 
              class="p-4 hover:bg-surface-hover transition-colors"
            >
              <div class="flex">
                <div :class="[activity.iconBg, 'p-2 rounded-full mr-3']">
                  <i :class="[activity.iconColor, activity.icon]"></i>
                </div>
                <div>
                  <p class="text-sm text-text-secondary" v-html="activity.message"></p>
                  <p class="text-xs text-text-muted mt-1">{{ formatTimeAgo(activity.id) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center text-text-muted">
            <i class="fas fa-history text-4xl mb-3 opacity-30"></i>
            <p>No recent activities</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  classrooms: {
    type: Array,
    required: true
  },
  recentActivities: {
    type: Array,
    default: () => []
  }
});

// Computed properties
const totalStudents = computed(() => {
  return props.classrooms.reduce((total, classroom) => {
    return total + (classroom.students?.length || 0);
  }, 0);
});

const activeTasks = computed(() => {
  // Mock value - in real app would calculate from actual tasks
  return 5;
});

const pendingReviews = computed(() => {
  // Mock value - in real app would calculate from actual submissions
  return 8;
});

// Format time ago function
const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  
  return 'Just now';
};
</script>
