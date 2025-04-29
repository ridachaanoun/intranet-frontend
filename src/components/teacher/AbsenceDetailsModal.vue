<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-surface rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-secondary-600 to-secondary-700 px-6 py-4 text-white flex justify-between items-center">
        <h3 class="text-lg font-semibold">Absence Details</h3>
        <button @click="closeModal" class="text-white/80 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6">
        <!-- Student Info -->
        <div class="flex items-center space-x-4 mb-6 pb-6 border-b border-background-light">
          <img 
            :src="absence.user.image_url" 
            :alt="absence.user.name"
            class="w-16 h-16 rounded-full object-cover border-2 border-secondary-500"
          />
          <div>
            <h4 class="text-lg font-semibold text-text-primary">{{ absence.user.name }}</h4>
            <p class="text-text-secondary text-sm">{{ absence.user.email }}</p>
            <div class="flex items-center mt-1 space-x-2">
              <span class="px-2 py-0.5 bg-primary-500/10 text-primary-600 text-xs rounded-full">{{ absence.user.level }}</span>
              <span class="px-2 py-0.5 bg-secondary-500/10 text-secondary-600 text-xs rounded-full">{{ absence.user.campus }}</span>
              <span class="px-2 py-0.5 bg-accent-500/10 text-accent-600 text-xs rounded-full">{{ absence.user.classroom }}</span>
            </div>
          </div>
        </div>
        
        <!-- Absence Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h5 class="font-medium text-text-primary border-b border-background-light pb-2">Absence Information</h5>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Date</div>
              <div class="text-text-primary">{{ formatDate(absence.date) }}</div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Class</div>
              <div class="text-text-primary">{{ absence.class }}</div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Session</div>
              <span 
                class="px-2 py-0.5 rounded-full text-xs capitalize"
                :class="getSessionBadgeClass(absence.session)"
              >
                {{ absence.session }}
              </span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Status</div>
              <span 
                class="px-2 py-0.5 rounded-full text-xs capitalize"
                :class="getStatusBadgeClass(absence.status)"
              >
                {{ absence.status }}
              </span>
            </div>
            
            <div v-if="absence.reason" class="space-y-1">
              <div class="text-sm font-medium text-text-secondary">Reason</div>
              <div class="bg-background p-3 rounded-md text-text-primary text-sm">
                {{ absence.reason }}
              </div>
            </div>
            <div v-else class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Reason</div>
              <div class="text-text-muted text-sm italic">No reason provided</div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h5 class="font-medium text-text-primary border-b border-background-light pb-2">Administrative Details</h5>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Created</div>
              <div class="text-text-primary text-sm">{{ formatDateTime(absence.created_at) }}</div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium text-text-secondary">Last Updated</div>
              <div class="text-text-primary text-sm">{{ formatDateTime(absence.updated_at) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="bg-background-element px-6 py-4 flex justify-end space-x-3">
        <button 
          @click="closeModal" 
          class="px-4 py-2 rounded-md bg-background border border-background-element text-text-primary hover:bg-background-light transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  absence: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateTime = (dateTimeString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case 'absences': return 'bg-red-500/20 text-red-600';
    case 'present': return 'bg-green-500/20 text-green-600';
    case 'panding': return 'bg-yellow-500/20 text-yellow-600';
    default: return 'bg-gray-500/20 text-gray-600';
  }
};

const getSessionBadgeClass = (session) => {
  switch (session.toLowerCase()) {
    case 'morning': return 'bg-blue-500/20 text-blue-600';
    case 'afternoon': return 'bg-purple-500/20 text-purple-600';
    case 'full-day': return 'bg-indigo-500/20 text-indigo-600';
    default: return 'bg-gray-500/20 text-gray-600';
  }
};
</script>