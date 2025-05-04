<template>
    <div class="bg-surface rounded-xl shadow-card glass-effect overflow-hidden">
      <div class="px-6 py-4 border-b border-background-light">
        <h3 class="font-semibold text-text-primary">Quick Actions</h3>
      </div>
      <div class="p-6 space-y-4">
        <button 
          @click="$emit('add-user')"
          class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-user-plus mr-2"></i>
          <span>Add New User</span>
        </button>
        <button 
          @click="$emit('add-class')"
          class="w-full py-3 px-4 bg-accent-600 hover:bg-accent-700 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-plus-circle mr-2"></i>
          <span>Create Class</span>
        </button>
        <button 
          @click="$emit('add-announcements')"
          class="w-full py-3 px-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-user-graduate mr-2"></i>
          <span>Add Announcements</span>
        </button>
        <button 
          @click="addNewPromotion"
          :disabled="isLoading" 
          class="w-full py-3 px-4 bg-background-element hover:bg-surface-hover text-text-primary rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-calendar-plus mr-2"></i>
          <span v-if="!isLoading">Add New Promotion</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
          </span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import api from '@/axios';
  import Swal from 'sweetalert2';

  defineEmits(['add-user', 'add-class', 'add-announcements']);
  
  const isLoading = ref(false);

  async function addNewPromotion() {
    // Show prompt to get the promotion year
    const { value: year } = await Swal.fire({
      title: 'Add New Promotion',
      input: 'text',
      background: 'rgb(15 13 46)',
      color:'white',
      inputLabel: 'Enter promotion year (like , 2026-2027)',
      inputPlaceholder: 'YYYY-YYYY',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a year!';
        }
        // Simple regex to validate format YYYY-YYYY
        const regex = /^\d{4}-\d{4}$/;
        if (!regex.test(value)) {
          return 'Format must be YYYY-YYYY (e.g., 2026-2027)';
        }
      }
    });

    if (!year) return; 

    isLoading.value = true;
    
    try {
        await api.post('/admin/promotions', {
        year: year
      });

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Promotion Added',
        text: `Promotion ${year} has been successfully added.`,
        timer: 3000,
        timerProgressBar: true
      });

    } catch (error) {
      console.error('Error adding promotion:', error);
      
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Promotion',
        text: error.response?.data?.message || 'An unexpected error occurred'
      });
    } finally {
      isLoading.value = false;
    }
  }
  </script>