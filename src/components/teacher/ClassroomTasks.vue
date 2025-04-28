<template>
  <div class="space-y-6">
    <!-- Classroom Selection and Create Task Button -->
    <div class="bg-surface rounded-lg shadow-card p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <h3 class="font-medium text-text-primary mr-4">Select Classroom</h3>
          <div class="relative">
            <select 
              v-model="selectedClassroomId" 
              @change="handleClassroomChange"
              class="bg-background rounded-lg border border-background-element py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-400 text-text-primary appearance-none"
            >
              <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">
                {{ classroom.name }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
        <button 
          @click="$emit('create-task')" 
          class="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-md hover:from-primary-700 hover:to-primary-800 transition-colors shadow-sm flex items-center"
        >
          <i class="fas fa-plus mr-2"></i>
          Create Task
        </button>
      </div>
    </div>
    
    <!-- Tasks List -->
    <div class="bg-surface rounded-lg shadow-card overflow-hidden">
      <div class="bg-gradient-to-r from-accent-600 to-accent-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-text-primary">Tasks</h2>
        <div class="flex space-x-2">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search tasks..."
              class="bg-background/20 backdrop-blur-sm text-text-primary rounded-full py-1 px-4 text-sm placeholder-text-primary/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/60 text-sm"></i>
          </div>
          <div class="relative">
            <select 
              v-model="statusFilter" 
              class="bg-background/20 backdrop-blur-sm text-text-primary rounded-full py-1 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary/60">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="selectedClassroom && filteredTasks.length > 0" class="divide-y divide-background-light">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id" 
          class="p-4 hover:bg-surface-hover transition-colors"
        >
          <div class="flex justify-between mb-2">
            <div class="flex items-center">
              <div 
                :class="[getStatusClass(task.status), 'w-2 h-2 rounded-full mr-2']"
              ></div>
              <h5 class="font-medium text-text-primary">{{ task.title }}</h5>
            </div>
            <div class="flex space-x-2">
              <span class="text-xs px-2 py-1 rounded bg-background text-text-secondary">
                Due: {{ formatDate(task.due_date) }}
              </span>
              <span 
                class="text-xs px-2 py-1 rounded"
                :class="getStatusBadgeClass(task.status)"
              >
                {{ task.status }}
              </span>
            </div>
          </div>
          <p class="text-sm text-text-secondary mb-4 ml-4">
            {{ task.description }}
          </p>
          <div class="flex justify-between items-center ml-4">
            <div class="flex items-center">
              <i class="fas fa-users text-text-muted mr-1"></i>
              <span v-if="task.assignment_type === 'class'" class="text-xs text-text-muted">
                Assigned to entire class
              </span>
              <span v-else-if="task.assigned_students?.length === 1" class="text-xs text-text-muted">
                Assigned to {{ task.assigned_students[0].name }}
              </span>
              <span v-else class="text-xs text-text-muted">
                Assigned to {{ task.assigned_students?.length || 0 }} students
              </span>
              <span class="mx-2 text-xs text-text-muted">•</span>
              <span class="text-xs text-text-muted">{{ task.submission_count || 0 }} submissions</span>
            </div>
            <div class="flex space-x-3">
              <button class="text-sm text-primary-400 hover:text-primary-600 flex items-center">
                <i class="fas fa-edit mr-1"></i> Edit
              </button>
              <button class="text-sm text-accent-400 hover:text-accent-600 flex items-center">
                <i class="fas fa-eye mr-1"></i> View Submissions
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="selectedClassroom" class="p-12 text-center text-text-muted">
        <i class="fas fa-tasks text-4xl mb-3 opacity-30"></i>
        <p>No tasks available for this classroom</p>
        <button 
          @click="$emit('create-task')" 
          class="mt-4 text-primary-400 hover:text-primary-600 font-medium flex items-center mx-auto"
        >
          <i class="fas fa-plus mr-1"></i> Create your first task
        </button>
      </div>
      <div v-else class="p-12 text-center text-text-muted">
        <i class="fas fa-chalkboard text-4xl mb-3 opacity-30"></i>
        <p>Select a classroom to see tasks</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTeacherStore } from '@/stores/teacherStore';

// Initialize teacher store
const teacherStore = useTeacherStore();

// State
const searchQuery = ref('');
const statusFilter = ref('all');

// Get classrooms from teacherStore
const classrooms = computed(() => teacherStore.classrooms);

// Bind selectedClassroomId to the store's selectedClassroom
const selectedClassroomId = computed({
  get: () => teacherStore.selectedClassroom?.id || (classrooms.value.length > 0 ? classrooms.value[0].id : ''), // Default to first classroom
  set: (value) => teacherStore.selectClassroom(value),
});

// Use the store's selectedClassroom directly
const selectedClassroom = computed(() => teacherStore.selectedClassroom);

// Get tasks for the selected classroom
const tasks = computed(() => {
  return selectedClassroom.value?.tasks || [];
});

// Filtered tasks
const filteredTasks = computed(() => {
  let result = tasks.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(task => {
      return task.title.toLowerCase().includes(query) || 
             task.description.toLowerCase().includes(query);
    });
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(task => task.status === statusFilter.value);
  }

  return result;
});

// Helper functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Active': return 'bg-primary-500';
    case 'Pending': return 'bg-accent-500';
    case 'Completed': return 'bg-secondary-500';
    default: return 'bg-text-muted';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Active': 
      return 'bg-primary-500/20 text-primary-500';
    case 'Pending': 
      return 'bg-accent-500/20 text-accent-500';
    case 'Completed': 
      return 'bg-secondary-500/20 text-secondary-500';
    default: 
      return 'bg-text-muted/20 text-text-muted';
  }
};
</script>
