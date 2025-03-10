<template>
    <div class="bg-surface rounded-xl shadow-card">
      <div class="px-6 py-4 border-b border-surface-hover">
        <h2 class="text-lg font-semibold text-text-primary">Attendance Record</h2>
      </div>
      
      <div class="overflow-x-auto">
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{{ absence.confirmed_by }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ absence.reason || '-' }}</td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="absences.length === 0" class="p-8 text-center text-text-secondary">
          <i class="fas fa-calendar-check text-3xl text-text-muted mb-2"></i>
          <p>No attendance records found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    absences: {
      type: Array,
      required: true
    }
  })
  </script>