<template>
  <div class="space-y-6">
    <!-- Classroom Selection -->
    <div class="bg-surface rounded-lg shadow-card p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-medium text-text-primary">Select Classroom</h3>
        <div class="flex items-center space-x-3">
          <button 
            @click="$emit('mark-absence', selectedClassroomId)" 
            class="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm flex items-center text-sm"
          >
            <i class="fas fa-calendar-minus mr-2"></i>
            Mark Absence
          </button>
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
      </div>
    </div>
    
    <!-- Students List -->
    <div class="bg-surface rounded-lg shadow-card overflow-hidden">
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-text-primary">Students</h2>
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search students..."
            class="bg-background/20 backdrop-blur-sm text-text-primary rounded-full py-1 px-4 text-sm placeholder-text-primary/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/60 text-sm"></i>
        </div>
      </div>
      
      <div v-if="selectedClassroom" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-background-light">
          <thead class="bg-background-element">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Student</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Points</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Completed Tasks</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-surface divide-y divide-background-light">
            <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-surface-hover transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full object-cover" :src="student.avatar || 'https://ui-avatars.com/api/?name=' + student.name" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-text-primary">{{ student.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-text-secondary">{{ student.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-text-secondary mr-2">{{ student.points || 0 }}</span>
                  <i class="fas fa-star text-yellow-400 text-xs"></i>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-text-secondary">{{ student.completedTasks || 0 }}/{{ student.totalTasks || 0 }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="$emit('assign-points', student)" 
                  class="text-primary-400 hover:text-primary-600 mr-3"
                >
                  <i class="fas fa-plus-circle mr-1"></i> Points
                </button>
                <button class="text-accent-400 hover:text-accent-600">
                  <i class="fas fa-eye mr-1"></i> View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="p-12 text-center text-text-muted">
        <i class="fas fa-user-graduate text-4xl mb-3 opacity-30"></i>
        <p>Select a classroom to see students</p>
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

const emit = defineEmits(['assign-points', 'mark-absence']);

// State
const selectedClassroomId = ref('');
const searchQuery = ref('');

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

const filteredStudents = computed(() => {
  if (!selectedClassroom.value || !selectedClassroom.value.students) {
    return [];
  }
  
  const query = searchQuery.value.toLowerCase();
  if (!query) {
    return selectedClassroom.value.students;
  }
  
  return selectedClassroom.value.students.filter(student => {
    return student.name.toLowerCase().includes(query) || 
           student.email.toLowerCase().includes(query);
  });
});
</script>
