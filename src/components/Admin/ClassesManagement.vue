<template>
    <div>
      <!-- Action Bar -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex space-x-2">
          <button 
            @click="$emit('add-class')" 
            class="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <i class="fas fa-plus mr-2"></i>
            <span>Add Class</span>
          </button>
          <select 
            v-model="filters.campus"
            @change="updateFilter('campus', filters.campus)"
            class="bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            <option value="">All Campuses</option>
            <option v-for="campus in campuses" :key="campus.value" :value="campus.value">
              {{ campus.label }}
            </option>
          </select>
          <select 
            v-model="filters.level"
            @change="updateFilter('level', filters.level)"
            class="bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            <option value="">All Levels</option>
            <option v-for="level in levels" :key="level.value" :value="level.value">
              {{ level.label }}
            </option>
          </select>
        </div>
        <div class="relative">
          <input 
            v-model="filters.query"
            @input="debouncedUpdateFilter('query', filters.query)"
            type="text" 
            placeholder="Search classes..." 
            class="bg-surface border border-background-light rounded-lg px-4 py-2 pl-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400 w-64"
          >
          <i class="fas fa-search absolute left-3 top-3 text-text-muted"></i>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="classroomsStore.loading && classroomsStore.classrooms.length === 0" class="flex items-center justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Classes Grid -->
       <div v-else >
        <div class="px-6 py-4 border-b border-background-light">
      <div class="flex items-center">
        <h3 class="font-semibold text-text-primary">All classrooms</h3>
        <svg v-if="classroomsStore.loading" class="ml-2 animate-spin h-4 w-4 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <ClassCard 
             v-for="classItem in classroomsStore.classrooms" 
             :key="classItem.id" 
             :class-data="classItem"
             @edit="editClass"
             @manage-students="manageStudents"
           />
         </div>
       </div>
      
      <!-- Empty state -->
      <div v-if="!classroomsStore.loading && classroomsStore.classrooms.length === 0" class="flex items-center justify-center py-12 bg-surface rounded-xl shadow-card glass-effect">
        <div class="text-center text-text-secondary">
          <i class="fas fa-chalkboard-teacher text-3xl mb-2"></i>
          <p>No classes found</p>
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="!classroomsStore.loading && classroomsStore.classrooms.length > 0" class="mt-6 flex justify-center">
        <div class="flex space-x-1">
          <button 
            @click="setPage(classroomsStore.pagination.current_page - 1)" 
            :disabled="classroomsStore.pagination.current_page === 1 || classroomsStore.loading"
            class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors"
          >
            Previous
          </button>
          <button 
            v-for="page in classroomsStore.pagination.last_page" 
            :key="page" 
            @click="setPage(page)" 
            :class="classroomsStore.pagination.current_page === page ? 'bg-accent-600 text-white' : 'bg-background-element text-text-secondary hover:bg-surface-hover'"
            class="px-3 py-1 rounded-md transition-colors"
          >
            {{ page }}
          </button>
          <button 
            @click="setPage(classroomsStore.pagination.current_page + 1)" 
            :disabled="classroomsStore.pagination.current_page === classroomsStore.pagination.last_page || classroomsStore.loading"
            class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Edit Classroom Modal -->
      <EditClassroomModal 
        v-if="editingClassroom" 
        :visible="true" 
        :classroom="editingClassroom" 
        @close="editingClassroom = null" 
        @updated="handleClassroomUpdated"
      />

      <!-- Manage Students Modal -->
      <ManageStudentsModal
        v-if="managingClassroom"
        :visible="true"
        :classroom="managingClassroom"
        @close="managingClassroom = null"
        @updated="handleClassroomUpdated"
      />
    </div>
  </template>

<script setup>
import { useClassroomsStore } from '@/stores/classroomsStore';
import { useAppStore } from '@/stores/app';
import { onMounted, ref } from 'vue';
import ClassCard from './ClassCard.vue';
import EditClassroomModal from './EditClassroomModal.vue';
import ManageStudentsModal from './ManageStudentsModal.vue';

const classroomsStore = useClassroomsStore();
const appStore = useAppStore();

const campuses = appStore.campuses;
const levels = appStore.levels;

const filters = classroomsStore.filters;

const editingClassroom = ref(null);
const managingClassroom = ref(null);

// Fetch classrooms on component mount
onMounted(() => {
  classroomsStore.fetchClassrooms();
});

// Update filters
const updateFilter = (key, value) => {
  classroomsStore.setFilter(key, value);
};

// Debounced update for search input
let debounceTimeout;
const debouncedUpdateFilter = (key, value) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    classroomsStore.setFilter(key, value);
  }, 500);
};

// Pagination
const setPage = (page) => {
  classroomsStore.setPage(page);
};

// Methods
const editClass = (classroom) => {
  console.log('Edit class with ID:', classroom);
  editingClassroom.value = classroom;
};

const manageStudents = (classroom) => {
  console.log('Manage students for classroom:', classroom);
  managingClassroom.value = classroom;
};

// Handle classroom updated event
const handleClassroomUpdated = (updatedClassroom) => {
  console.log('Classroom updated:', updatedClassroom);
  const index = classroomsStore.classrooms.findIndex(c => c.id === updatedClassroom.id);
  if (index !== -1) {
    classroomsStore.classrooms[index] = { ...classroomsStore.classrooms[index], ...updatedClassroom };
  }
  console.log(classroomsStore.classrooms[index]);
};
</script>