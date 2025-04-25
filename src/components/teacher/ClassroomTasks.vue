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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary/60">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="selectedClassroom && tasks.length > 0" class="divide-y divide-background-light">
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
import { defineProps, defineEmits, ref, computed, watch } from 'vue';

const props = defineProps({
  classrooms: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['create-task']);

// State
const selectedClassroomId = ref('');
const searchQuery = ref('');
const statusFilter = ref('all');

// Mock tasks data - in a real app, this would come from an API
const tasks = ref([
  {
    id: 1,
    title: 'Complete JavaScript Basics',
    description: 'Complete the exercises on variables, data types, and basic functions',
    status: 'active',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    submission_count: 12,
    assignment_type: 'class',
    assigned_students: []  // Will be populated based on selected classroom
  },
  {
    id: 2,
    title: 'Build a Simple Vue Component',
    description: 'Create a reusable Vue component with props, emits, and slots',
    status: 'upcoming',
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    submission_count: 0,
    assignment_type: 'students',
    assigned_students: [
      { id: 's-001', name: 'Ahmed Hassan' },
      { id: 's-005', name: 'Layla Bennani' }
    ]
  },
  {
    id: 3,
    title: 'CSS Flexbox Challenge',
    description: 'Complete the flexbox layout challenges in the provided codepen',
    status: 'completed',
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    submission_count: 18,
    assignment_type: 'students',
    assigned_students: [
      { id: 's-003', name: 'Younes El Khalifi' }
    ]
  }
]);

// Computed properties
const selectedClassroom = computed(() => {
  if (!selectedClassroomId.value && props.classrooms.length > 0) {
    return props.classrooms[0];
  }
  return props.classrooms.find(classroom => classroom.id === selectedClassroomId.value);
});

// Auto-select first classroom when available
watch(() => props.classrooms, (newClassrooms) => {
  if (newClassrooms.length > 0 && !selectedClassroomId.value) {
    selectedClassroomId.value = newClassrooms[0].id;
  }
}, { immediate: true });

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
    case 'active': return 'bg-primary-500';
    case 'upcoming': return 'bg-accent-500';
    case 'completed': return 'bg-secondary-500';
    default: return 'bg-text-muted';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'active': 
      return 'bg-primary-500/20 text-primary-500';
    case 'upcoming': 
      return 'bg-accent-500/20 text-accent-500';
    case 'completed': 
      return 'bg-secondary-500/20 text-secondary-500';
    default: 
      return 'bg-text-muted/20 text-text-muted';
  }
};
</script>
