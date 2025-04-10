<script setup>
import { ref, computed } from 'vue'
import api from '@/axios'

// Reactive states for delegates, loading, and classroom visibility
const delegates = ref([]) 
const isLoading = ref(false) 
const showAll = ref(false) 

// Fetch classroom delegates from API
const fetchDelegates = async () => {
  isLoading.value = true 
  try {
    const response = await api.get('/classrooms/delegates')
    delegates.value = response.data 
  } catch (error) {
    console.error('Error fetching delegates:', error)
  } finally {
    isLoading.value = false 
  }
}
fetchDelegates()
// Computed property to filter classrooms based on the `showAll` state
const visibleDelegates = computed(() => {
  return showAll.value ? delegates.value : delegates.value.slice(0, 6)
})
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-user-tie text-primary-400 mr-2"></i>
        Classroom Delegates
      </h4>
      <span class="px-3 py-1 bg-yellow-400 text-primary-800 text-sm font-medium rounded-full">{{ delegates.length }}</span>
    </div>
    <div class="p-6">
      <!-- Show loading spinner if data is still loading -->
      <div v-if="isLoading" class="flex justify-center items-center">
        <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Show delegates once data is loaded -->
      <div v-else class="grid grid-cols-2 gap-5">
        <div 
          v-for="(delegate, index) in visibleDelegates" 
          :key="index"
          class="flex flex-col items-center group"
        >
          <a href="#" class="relative block mb-3">
            <img 
              :src="delegate.delegate.img_url" 
              :alt="delegate.delegate.name" 
              class="w-16 h-16 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-accent-400 transition-all"
            />
            <div :class="`absolute -top-1 -right-1 bg-accent-400 text-text-primary text-xs px-2 py-0.5 rounded-full`">
              {{ delegate.delegate.level }}
            </div>
          </a>
          <h4 class="text-sm font-medium text-text-primary text-center truncate w-full max-w-[120px]">
            {{ delegate.delegate.name }}
          </h4>
          <div class="text-xs text-text-muted flex items-center mt-1">
            <i class="fa fa-location-dot mr-1"></i>
            {{ delegate.campus }}
          </div>
        </div>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-background-light text-center bg-surface-muted">
      <button 
        @click="showAll = !showAll" 
        class="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium flex items-center justify-center"
        :disabled="isLoading"
      >
        {{ showAll ? 'Show Less' : 'View All Classrooms' }} 
        <i :class="showAll ? 'fas fa-arrow-up ml-2' : 'fas fa-arrow-right ml-2'"></i>
      </button>
    </div>
    <div class="mt-4 text-center">
    </div>
  </section>
</template>