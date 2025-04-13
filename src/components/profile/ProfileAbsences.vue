<template>
  <div class="bg-surface rounded-xl shadow-card">
    <div class="px-6 py-4 border-b border-surface-hover">
      <h2 class="text-lg font-semibold text-text-primary">Attendance Record</h2>
    </div>
    
    <div class="overflow-x-auto" v-if="absences">
      <table class="w-full">
        <thead>
          <tr class="bg-surface-hover">
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Class</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Session</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Confirmed By</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Reason</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-hover">
          <tr 
            v-for="absence in absences" 
            :key="absence.id" 
            class="hover:bg-surface-hover transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{{ absence.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div 
                :class="{
                  'text-yellow-500 bg-yellow-100': absence.status === 'panding',
                  'text-green-500 bg-green-100': absence.status === 'Present',
                  'text-red-500 bg-red-100': absence.status === 'Absent'
                }" 
                class="px-2 py-0.5 text-xs font-medium rounded-full inline-block"
              >
                {{ absence.status }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{{ absence.class }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{{ absence.session }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{{ absence.confirmed_by || '-' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ absence.reason || '-' }}</td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="absences.length === 0" class="p-8 text-center text-text-secondary">
        <i class="fas fa-calendar-check text-3xl text-text-muted mb-2"></i>
        <p>No attendance records found.</p>
      </div>
    </div>
    <div v-else-if="fetchAbsences()" class="loading flex items-center justify-center pt-6">        <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
  </div>

</template>

<script setup>
import { useAbsencesStore } from '@/stores/absenceStor';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

// Import the absence store
const absenceStore = useAbsencesStore();
const userStore = useUserStore();

const user = computed(()=>userStore.user)
// Fetch absences when the component is mounted
async function fetchAbsences () {
  
  await absenceStore.fetchAbsence(user.value.id); // Fetch absences for user ID 16
} 

// Reactive references to state
const absences = computed(() => absenceStore.absences?.absences);
</script>