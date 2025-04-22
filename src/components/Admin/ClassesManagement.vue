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

      <!-- Classes Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClassCard 
          v-for="classItem in classroomsStore.classrooms" 
          :key="classItem.id" 
          :class-data="classItem"
          @edit="editClass"
          @manage-students="manageStudents"
        />
      </div>
      
      <!-- Empty state -->
      <div v-if="classroomsStore.classrooms.length === 0 && !classroomsStore.loading" class="flex items-center justify-center py-12 bg-surface rounded-xl shadow-card glass-effect">
        <div class="text-center text-text-secondary">
          <i class="fas fa-chalkboard-teacher text-3xl mb-2"></i>
          <p>No classes found</p>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="mt-6 flex justify-center">
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
    </div>
  </template>

<script setup>
import { useClassroomsStore } from '@/stores/classroomsStore';
import { useAppStore } from '@/stores/app';
import { onMounted } from 'vue';
import ClassCard from './ClassCard.vue';

const classroomsStore = useClassroomsStore();
const appStore = useAppStore();

const campuses = appStore.campuses;
const levels = appStore.levels;

const filters = classroomsStore.filters;

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
  }, 2000);
};

// Pagination
const setPage = (page) => {
  classroomsStore.setPage(page);
};

// Methods
const editClass = (classId) => {
  console.log('Edit class with ID:', classId);
};

const manageStudents = (classId) => {
  console.log('Manage students for class ID:', classId);
};
</script>