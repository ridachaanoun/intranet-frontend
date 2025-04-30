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
              @change="loadAbsences"
              class="bg-background rounded-lg border border-background-element py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary-400 text-text-primary appearance-none"
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
            @click="markAbsence"
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
              <option value="Panding">Panding</option>
              <option value="Absences">Absences</option>
              <option value="Present">Present</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary/60">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!absenceStore.isLoading">
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
                <div class="text-sm font-medium text-text-primary">{{ absence.user.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-text-secondary">{{ formatDate(absence.date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-text-secondary">{{ absence.class }}</div>
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
                <button class="text-accent-400 hover:text-accent-600" @click="showDetails(absence)">
                  <i class="fas fa-eye mr-1"></i> Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="filteredAbsences.length === 0" class="p-12 text-center text-text-muted">
        <i class="fas fa-calendar-times text-4xl mb-3 opacity-30"></i>
        <p>No absence records found</p>
        <button 
          @click="markAbsence"
          class="mt-4 text-secondary-400 hover:text-secondary-600 font-medium flex items-center mx-auto"
        >
          <i class="fas fa-plus mr-1"></i> Record new absence
        </button>
      </div>
    </div>
    <div v-else class="h-[32rem] flex justify-center items-center">
        <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    </div>

    <!-- Absence Details Modal -->
    <AbsenceDetailsModal 
      v-if="isModalOpen" 
      :isOpen="isModalOpen" 
      :absence="selectedAbsence" 
      @close="isModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTeacherStore } from '@/stores/teacherStore';
import { useAbsenceStore } from '@/stores/absenceStore';
import AbsenceDetailsModal from './AbsenceDetailsModal.vue';

const emit = defineEmits(['mark-absence']);

const teacherStore = useTeacherStore();
const absenceStore = useAbsenceStore();

const selectedClassroomId = ref('');
const dateFilter = ref('');
const statusFilter = ref('all');
const isModalOpen = ref(false);
const selectedAbsence = ref(null);

const classrooms = computed(() => teacherStore.classrooms);
const absences = computed(() => absenceStore.absences[selectedClassroomId.value] || []);

// Define filteredAbsences to avoid undefined errors
const filteredAbsences = computed(() => {
  let result = absences.value;

  // Filter by date
  if (dateFilter.value) {
    result = result.filter(absence => absence.date === dateFilter.value);
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    result = result.filter(absence => absence.status === statusFilter.value);
  }

  return result;
});

// Load absences when the classroom changes
const loadAbsences = async () => {
  if (selectedClassroomId.value) {
    await absenceStore.fetchAbsences(selectedClassroomId.value);
  }
};

// Mark a new absence
const markAbsence = () => {
  console.log('Marking absence for classroom:', selectedClassroomId.value);
  emit('mark-absence')
};

const showDetails = (absence) => {
  selectedAbsence.value = absence;
  isModalOpen.value = true;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get badge class for session
const getSessionBadgeClass = (session) => {
  switch (session) {
    case 'morning': return 'bg-emerald-500/20 text-emerald-600';
    case 'afternoon': return 'bg-blue-500/20 text-blue-600';
    case 'full-day': return 'bg-red-500/20 text-red-600';
    default: return 'bg-gray-500/20 text-gray-600';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Absences': return 'bg-red-500/20 text-red-600';
    case 'Present': return 'bg-green-500/20 text-green-600';
    case 'Panding': return 'bg-yellow-500/20 text-yellow-600';
    default: return 'bg-gray-500/20 text-gray-600';
  }
};

onMounted(async () => {
  await teacherStore.fetchClassrooms();
  if (teacherStore.classrooms.length > 0) {
    selectedClassroomId.value = teacherStore.classrooms[0].id;
    await loadAbsences();
  }
});
</script>
