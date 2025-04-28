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
          <p class="text-xs text-text-muted mt-1">Across {{ totalClassrooms }} classrooms</p>
        </div>
        
        <div class="bg-surface rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-text-secondary">Total Tasks</h3>
            <span class="p-2 bg-accent-500/10 rounded-full">
              <i class="fas fa-clipboard-list text-accent-400"></i>
            </span>
          </div>
          <p class="text-2xl font-bold text-text-primary">{{ totalTasks }}</p>
          <p class="text-xs text-text-muted mt-1">Due this week</p>
        </div>
        
        <div class="bg-surface rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-text-secondary">Total Classrooms</h3>
            <span class="p-2 bg-secondary-500/10 rounded-full">
              <i class="fas fa-chalkboard text-secondary-400"></i>
            </span>
          </div>
          <p class="text-2xl font-bold text-text-primary">{{ totalClassrooms }}</p>
          <p class="text-xs text-text-muted mt-1">Active teaching spaces</p>
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
        
        <!-- Use ActivityList component -->
        <ActivityList :activities="recentActivities" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useTeacherStore } from '@/stores/teacherStore';
import ActivityList from '@/components/Admin/ActivityList.vue';

const props = defineProps({
  recentActivities: {
    type: Array,
    default: () => []
  }
});

const teacherStore = useTeacherStore();
const classrooms = computed(() => teacherStore.classrooms);

// Computed properties
const totalStudents = computed(() => teacherStore.totalStudents);
const totalTasks = computed(() => teacherStore.totalTasks);
const totalClassrooms = computed(() => teacherStore.classrooms.length);
</script>
