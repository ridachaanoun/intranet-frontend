<template>
    <div class="bg-surface rounded-xl shadow-card overflow-hidden">
      <!-- Header with statistics summary -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-5 text-white">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold tracking-tight">Assignments</h2>
          <span class="text-xs opacity-80">{{ appStore.currentDateTime }}</span>
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
              <i class="fas fa-paper-plane text-white"></i>
            </div>
            <div class="ml-3">
              <div class="text-xs text-white/70">Submitted</div>
              <div class="font-bold">{{ getSubmittedCount() }}</div>
            </div>
          </div>
          
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <i class="fas fa-check-circle text-white"></i>
            </div>
            <div class="ml-3">
              <div class="text-xs text-white/70">Graded</div>
              <div class="font-bold">{{ getGradedCount() }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Assignment List -->
      <div class="divide-y divide-surface-hover">
        <div 
          v-for="assignment in assignments" 
          :key="assignment.id" 
          class="p-6 hover:bg-surface-hover/50 transition-all duration-200 cursor-pointer group relative"
        >
          <!-- Left border color indicator -->
          <div 
            :class="{
              'bg-yellow-500': assignment.status === 'Pending',
              'bg-blue-500': assignment.status === 'Submitted',
              'bg-green-500': assignment.status === 'Graded'
            }" 
            class="absolute left-0 top-0 bottom-0 w-1"
          ></div>
          
          <div class="flex flex-col lg:flex-row lg:items-center gap-4">
            <!-- Status icon -->
            <div class="flex-shrink-0">
              <div 
                :class="{
                  'bg-yellow-100 text-yellow-600': assignment.status === 'Pending',
                  'bg-blue-100 text-blue-600': assignment.status === 'Submitted',
                  'bg-green-100 text-green-600': assignment.status === 'Graded'
                }" 
                class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
              >
                <i 
                  :class="{
                    'fas fa-calendar-alt': assignment.status === 'Pending',
                    'fas fa-paper-plane': assignment.status === 'Submitted',
                    'fas fa-check-circle': assignment.status === 'Graded'
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
                    'border-blue-200 bg-blue-50 text-blue-700': assignment.status === 'Submitted',
                    'border-green-200 bg-green-50 text-green-700': assignment.status === 'Graded'
                  }" 
                  class="px-2.5 py-1 text-xs font-medium rounded-md border"
                >
                  {{ assignment.status }}
                </div>
              </div>
              
              <p class="text-text-secondary text-sm mb-3 line-clamp-2">{{ assignment.description }}</p>
              
              <!-- Assignment metadata -->
              <div class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <div class="flex items-center text-text-secondary">
                  <div class="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center mr-2">
                    <i class="fas fa-user-tie text-primary-500"></i>
                  </div>
                  <span>{{ assignment.assigned_by }}</span>
                </div>
                
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
                
                <!-- Assignment grade if available -->
                <div class="flex items-center text-text-secondary" v-if="assignment.grade">
                  <div class="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center mr-2">
                    <i class="fas fa-star text-amber-500"></i>
                  </div>
                  <span>Grade: <span class="font-semibold text-amber-600">{{ assignment.grade }}/100</span></span>
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
      
      <!-- Footer -->
      <div class="px-6 py-3 bg-surface-hover border-t border-surface-hover flex justify-between items-center text-xs text-text-secondary">
        <span>@{{ appStore.currentUser }}</span>
        <span>Showing {{ assignments.length }} assignment{{ assignments.length !== 1 ? 's' : '' }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAppStore } from '@/stores/app'
  
  // Get store reference
  const appStore = useAppStore()
  
  // Update the current date/time when component is mounted
  // You can also run this periodically using setInterval if needed
  appStore.updateDateTime()
  
//   defineProps({
//     assignments: {
//       type: Array,
//       required: true
//     }
//   })
  
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
  
  // Access props for the count functions
  const props = defineProps({
    assignments: {
      type: Array,
      required: true
    }
  })
  
  function getPendingCount() {
    return props.assignments.filter(a => a.status === 'Pending').length
  }
  
  function getSubmittedCount() {
    return props.assignments.filter(a => a.status === 'Submitted').length
  }
  
  function getGradedCount() {
    return props.assignments.filter(a => a.status === 'Graded').length
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