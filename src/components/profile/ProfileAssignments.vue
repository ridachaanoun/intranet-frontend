<template>
  <div class="bg-surface rounded-xl shadow-card overflow-hidden">
    <!-- Header with statistics summary -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-5 text-white">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-xl font-bold tracking-tight">Assignments</h2>
        <span class="text-xs opacity-80">{{ user?.name }}</span>
      </div>
      
      <!-- Assignment Statistics -->
      <div class="flex items-center space-x-5 mt-4">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <i class="fas fa-hourglass-half text-white"></i>
          </div>
          <div class="ml-3">
            <div class="text-xs text-white/70">Pending</div>
            <div class="font-bold">{{ getPendingCount() }}</div>
          </div>
        </div>
        
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <i class="fas fa-play-circle text-white"></i>
          </div>
          <div class="ml-3">
            <div class="text-xs text-white/70">Active</div>
            <div class="font-bold">{{ getActiveCount() }}</div>
          </div>
        </div>
        
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <i class="fas fa-check-circle text-white"></i>
          </div>
          <div class="ml-3">
            <div class="text-xs text-white/70">Completed</div>
            <div class="font-bold">{{ getCompletedCount() }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Assignment List -->
    <div class="divide-y divide-surface-hover" v-if="notloading">
      <div 
        v-for="assignment in assignments" 
        :key="assignment.id" 
        class="p-6 hover:bg-surface-hover/50 transition-all duration-200 cursor-pointer group relative"
      >
        <!-- Left border color indicator -->
        <div 
          :class="{
            'bg-yellow-500': assignment.status === 'Pending',
            'bg-blue-500': assignment.status === 'Active',
            'bg-green-500': assignment.status === 'Completed'
          }" 
          class="absolute left-0 top-0 bottom-0 w-1"
        ></div>
        
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
          <!-- Status icon -->
          <div class="flex-shrink-0">
            <div 
              :class="{
                'bg-yellow-100 text-yellow-600': assignment.status === 'Pending',
                'bg-blue-100 text-blue-600': assignment.status === 'Active',
                'bg-green-100 text-green-600': assignment.status === 'Completed'
              }" 
              class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
            >
              <i 
                :class="{
                  'fas fa-calendar-alt': assignment.status === 'Pending',
                  'fas fa-play': assignment.status === 'Active',
                  'fas fa-check-circle': assignment.status === 'Completed'
                }" 
                class="text-xl"
              ></i>
            </div>
          </div>
          
          <!-- Assignment info -->
          <div class="flex-1">
            <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h3 class="text-lg font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                {{ assignment.title }}
              </h3>
              <div 
                :class="{
                  'border-yellow-200 bg-yellow-50 text-yellow-700': assignment.status === 'Pending',
                  'border-blue-200 bg-blue-50 text-blue-700': assignment.status === 'Active',
                  'border-green-200 bg-green-50 text-green-700': assignment.status === 'Completed'
                }" 
                class="px-2.5 py-1 text-xs font-medium rounded-md border"
              >
                {{ assignment.status }}
              </div>
            </div>
            
            <p class="text-text-secondary text-sm mb-3 line-clamp-2">{{ assignment.description }}</p>
            
            <!-- Assignment metadata -->
            <div class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <router-link 
          :to="`/profile/${assignment.assigned_by.id}`" 
          class="flex items-center text-text-secondary hover:bg-surface-hover p-2 rounded-lg transition-colors"
          >
          <div class="flex items-center">
            <img 
            :src="assignment.assigned_by.image_url" 
            :alt="assignment.assigned_by.name"
            class="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div class="flex flex-col">
            <span class="font-medium">{{ assignment.assigned_by.name }}</span>
            <span class="text-xs text-text-secondary">{{ assignment.assigned_by.role }}</span>
            </div>
          </div>
          </router-link>
              
              <div 
                class="flex items-center text-text-secondary"
                :class="{ 'text-red-600': isOverdue(assignment.due_date) }"
              >
                <div 
                  class="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center mr-2"
                  :class="{ 'bg-red-100': isOverdue(assignment.due_date) }"
                >
                  <i 
                    class="fas fa-clock text-primary-500"
                    :class="{ 'text-red-500': isOverdue(assignment.due_date) }"
                  ></i>
                </div>
                <span>
                  {{ isOverdue(assignment.due_date) ? 'Overdue: ' : 'Due: ' }}
                  {{ formatDate(assignment.due_date) }}
                </span>
              </div>

              <div class="flex items-center text-text-secondary">
                <div class="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center mr-2">
                  <i class="fas fa-book text-primary-500"></i>
                </div>
                <span>Task Type: {{ assignment.task_type }}</span>
              </div>

              <div class="flex items-center text-text-secondary">
                <div class="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center mr-2">
                  <i class="fas fa-star text-primary-500"></i>
                </div>
                <span>Points: {{ assignment.points }}</span>
              </div>

              <div class="flex items-center text-text-secondary">
                <div class="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center mr-2">
                  <i class="fas fa-users text-primary-500"></i>
                </div>
                <span>Assignment Type: {{ assignment.assignment_type }}</span>
              </div>
            </div>
          </div>
          
          <!-- Right arrow indicator on hover -->
          <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <i class="fas fa-chevron-right text-primary-400"></i>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-if="assignments.length === 0" class="py-16 text-center">
        <div class="inline-block p-4 rounded-full bg-surface-hover mb-4 text-text-muted">
          <i class="fas fa-clipboard-list text-4xl"></i>
        </div>
        <h3 class="text-lg font-medium text-text-primary mb-2">No Assignments Yet</h3>
        <p class="text-text-secondary max-w-md mx-auto">
          Assignments from your courses will appear here when they become available.
        </p>
      </div>
    </div>
    <div v-else-if="fitchtasks()" class="flex items-center justify-center py-20">
      <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
     <!-- Footer -->
     <div class="px-6 py-3 bg-surface-hover border-t border-surface-hover flex justify-between items-center text-xs text-text-secondary">
      <span>@{{ user?.name }}</span>
      <span>Showing {{ assignments.length }} assignment{{ assignments.length !== 1 ? 's' : '' }}</span>
    </div>
</template>

<script setup>
import { ref,computed } from 'vue'
import api from '@/axios'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const user = computed(() => userStore.user)

// Reactive state for assignments
const assignments = ref([])
const notloading = ref(false)

// Fetch assignments
async function fitchtasks() {
  try {
    const response = await api.get(`student/tasks/${user.value.id}`)
    const { data } = response
    if (data.success) {
      assignments.value = data.data
      notloading.value = true
    }
  } catch (error) {
    console.error('Failed to fetch assignments:', error)
  }
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function isOverdue(dateString) {
  const dueDate = new Date(dateString)
  const now = new Date()
  return dueDate < now
}

function getPendingCount() {
  return assignments.value.filter(a => a.status === 'Pending').length;
}

function getActiveCount() {
  return assignments.value.filter(a => a.status === 'Active').length;
}

function getCompletedCount() {
  return assignments.value.filter(a => a.status === 'Completed').length;
}
</script>

<style scoped>
/* Optional: Add a subtle hover animation */
.group {
  transform: translateZ(0);
}
.group:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* For text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>