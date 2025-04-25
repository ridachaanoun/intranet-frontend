<template>
  <div class="space-y-6">
    <!-- Classroom Selection and Filters -->
    <div class="bg-surface rounded-lg shadow-card p-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center">
          <h3 class="font-medium text-text-primary mr-4">Filter Absences</h3>
          <div class="relative">
            <select 
              v-model="selectedClassroomId" 
              class="bg-background rounded-lg border border-background-element py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary-400 text-text-primary appearance-none"
            >
              <option value="">All Classrooms</option>
              <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">
                {{ classroom.name }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-muted">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <div class="relative">
            <input 
              type="date" 
              v-model="dateFilter"
              class="bg-background rounded-lg border border-background-element py-2 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 text-text-primary"
              placeholder="Filter by date"
            />
          </div>
          
          <button 
            @click="$emit('mark-absence', selectedClassroomId)" 
            class="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm flex items-center text-sm"
          >
            <i class="fas fa-calendar-minus mr-2"></i>
            Mark Absence
          </button>
        </div>
      </div>
    </div>
    
    <!-- Absences List -->
    <div class="bg-surface rounded-lg shadow-card overflow-hidden">
      <div class="bg-gradient-to-r from-secondary-600 to-secondary-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-text-primary">Absences Records</h2>
        <div class="flex space-x-2">
          <div class="relative">
            <select 
              v-model="statusFilter" 
              class="bg-background/20 backdrop-blur-sm text-text-primary rounded-full py-1 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary/60">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredAbsences.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-background-light">
          <thead class="bg-background-element">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Student</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Classroom</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Session</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-surface divide-y divide-background-light">
            <tr v-for="absence in filteredAbsences" :key="absence.user_id + absence.date + absence.session" class="hover:bg-surface-hover transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-text-primary">{{ absence.student_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-text-secondary">{{ formatDate(absence.date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-text-secondary">{{ absence.classroom }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span 
                    class="px-2 py-1 text-xs rounded-full capitalize"
                    :class="getSessionBadgeClass(absence.session)"
                  >
                    {{ absence.session }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs rounded-full capitalize"
                  :class="getStatusBadgeClass(absence.status)"
                >
                  {{ absence.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  v-if="absence.status === 'pending'" 
                  @click="updateAbsenceStatus(absence, 'approved')" 
                  class="text-secondary-400 hover:text-secondary-600 mr-2"
                >
                  <i class="fas fa-check mr-1"></i> Approve
                </button>
                <button 
                  v-if="absence.status === 'pending'" 
                  @click="updateAbsenceStatus(absence, 'rejected')" 
                  class="text-red-400 hover:text-red-600 mr-2"
                >
                  <i class="fas fa-times mr-1"></i> Reject
                </button>
                <button class="text-accent-400 hover:text-accent-600">
                  <i class="fas fa-eye mr-1"></i> Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="absences.length === 0" class="p-12 text-center text-text-muted">
        <i class="fas fa-calendar-times text-4xl mb-3 opacity-30"></i>
        <p>No absence records found</p>
        <button 
          @click="$emit('mark-absence', selectedClassroomId)" 
          class="mt-4 text-secondary-400 hover:text-secondary-600 font-medium flex items-center mx-auto"
        >
          <i class="fas fa-plus mr-1"></i> Record new absence
        </button>
      </div>
      <div v-else class="p-12 text-center text-text-muted">
        <i class="fas fa-filter text-4xl mb-3 opacity-30"></i>
        <p>No absences match your current filters</p>
        <button 
          @click="clearFilters" 
          class="mt-4 text-secondary-400 hover:text-secondary-600 font-medium flex items-center mx-auto"
        >
          <i class="fas fa-times-circle mr-1"></i> Clear filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  classrooms: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['mark-absence', 'update-absence']);

// State
const absences = ref([]);
const selectedClassroomId = ref('');
const dateFilter = ref('');
const statusFilter = ref('all');

// Load absence data from localStorage
onMounted(() => {
  loadAbsences();
});

const loadAbsences = () => {
  const storedAbsences = localStorage.getItem('teacherAbsences');
  if (storedAbsences) {
    absences.value = JSON.parse(storedAbsences);
  }
};

// Filter absences based on selected filters
const filteredAbsences = computed(() => {
  let result = absences.value;
  
  // Filter by classroom
  if (selectedClassroomId.value) {
    result = result.filter(absence => absence.classroom_id === selectedClassroomId.value);
  }
  
  // Filter by date
  if (dateFilter.value) {
    result = result.filter(absence => absence.date === dateFilter.value);
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    result = result.filter(absence => absence.status === statusFilter.value);
  }
  
  // Sort by date (newest first)
  return result.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Update absence status (approve or reject)
const updateAbsenceStatus = (absence, newStatus) => {
  const index = absences.value.findIndex(
    a => a.user_id === absence.user_id && 
         a.date === absence.date && 
         a.session === absence.session
  );
  
  if (index !== -1) {
    absences.value[index] = {
      ...absences.value[index],
      status: newStatus,
      updated_at: new Date()
    };
    
    // Save changes to localStorage
    localStorage.setItem('teacherAbsences', JSON.stringify(absences.value));
    
    // Emit event for parent component
    emit('update-absence', { absence: absences.value[index], newStatus });
  }
};

// Clear all filters
const clearFilters = () => {
  selectedClassroomId.value = '';
  dateFilter.value = '';
  statusFilter.value = 'all';
};

// Helper functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'approved': 
      return 'bg-green-500/20 text-green-600';
    case 'rejected': 
      return 'bg-red-500/20 text-red-600';
    case 'pending': 
    default: 
      return 'bg-yellow-500/20 text-yellow-600';
  }
};

const getSessionBadgeClass = (session) => {
  switch (session) {
    case 'morning': 
      return 'bg-blue-500/20 text-blue-600';
    case 'afternoon': 
      return 'bg-purple-500/20 text-purple-600';
    case 'full-day': 
      return 'bg-indigo-500/20 text-indigo-600';
    default: 
      return 'bg-gray-500/20 text-gray-600';
  }
};
</script>
