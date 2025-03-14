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
          <button class="bg-background-element hover:bg-surface-hover text-text-primary px-4 py-2 rounded-lg flex items-center transition-colors">
            <i class="fas fa-filter mr-2"></i>
            <span>Filter</span>
          </button>
        </div>
        <div class="relative">
          <input 
            v-model="searchQuery"
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
          v-for="classItem in filteredClasses" 
          :key="classItem.id" 
          :class-data="classItem"
          @edit="editClass"
          @manage-students="manageStudents"
        />
      </div>
      
      <!-- Empty state -->
      <div v-if="filteredClasses.length === 0" class="flex items-center justify-center py-12 bg-surface rounded-xl shadow-card glass-effect">
        <div class="text-center text-text-secondary">
          <i class="fas fa-chalkboard-teacher text-3xl mb-2"></i>
          <p>No classes found</p>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="mt-6 flex justify-center">
        <div class="flex space-x-1">
          <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
            Previous
          </button>
          <button class="px-3 py-1 rounded-md bg-accent-600 text-white">
            1
          </button>
          <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
            2
          </button>
          <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import ClassCard from './ClassCard.vue';
  
  export default {
    name: 'ClassesManagement',
    components: {
      ClassCard
    },
    emits: ['add-class'],
    setup() {
      const searchQuery = ref('');
      
      const classes = ref([
        {
          id: 1,
          name: 'Aliens',
          level: '1ère Année',
          teacher: 'Said Aabilla',
          students: 22,
          campus: 'Youssoufia',
          promotion: '2024-2025',
          color: 'primary',
          icon: 'fas fa-laptop-code'
        },
        {
          id: 2,
          name: 'Web Warriors',
          level: '2ème Année',
          teacher: 'Abdelhafid Belfqir',
          students: 18,
          campus: 'Youssoufia',
          promotion: '2024-2025',
          color: 'accent',
          icon: 'fas fa-code'
        },
        {
          id: 3,
          name: 'Data Masters',
          level: '2ème Année',
          teacher: 'Sarah Moukrim',
          students: 20,
          campus: 'Youssoufia',
          promotion: '2024-2025',
          color: 'secondary',
          icon: 'fas fa-database'
        }
      ]);
      
      const filteredClasses = computed(() => {
        if (!searchQuery.value) return classes.value;
        
        const query = searchQuery.value.toLowerCase();
        return classes.value.filter(c => 
          c.name.toLowerCase().includes(query) ||
          c.level.toLowerCase().includes(query) ||
          c.teacher.toLowerCase().includes(query) ||
          c.campus.toLowerCase().includes(query) ||
          c.promotion.toLowerCase().includes(query)
        );
      });
      
      const editClass = (classId) => {
        console.log('Edit class with ID:', classId);
        // Implementation would go here
      };
      
      const manageStudents = (classId) => {
        console.log('Manage students for class ID:', classId);
        // Implementation would go here
      };
      
      return {
        searchQuery,
        filteredClasses,
        editClass,
        manageStudents
      };
    }
  };
  </script>