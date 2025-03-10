<template>
    <div class="bg-surface rounded-xl overflow-hidden shadow-card">
      <!-- Card Header with Background -->
      <div class="p-4 relative" style="background: no-repeat bottom right url('/src/assets/img/pattern-dots.svg'); background-size: auto 90%;">
        <div class="font-bold text-text-primary">LEARNERS <small class="text-text-secondary font-normal">({{ learners.length }})</small></div>
      </div>
      
      <!-- Learners List -->
      <div class="max-h-[750px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <a 
          v-for="learner in learners" 
          :key="learner.id" 
          :href="`/profile/${learner.username}`" 
          class="flex items-center px-4 py-3 border-b border-gray-100 hover:bg-surface-hover transition-colors"
        >
          <!-- User Image -->
          <div class="flex-shrink-0">
            <img 
              :src="learner.profileImage" 
              :alt="learner.fullName" 
              class="rounded-full h-[35px] w-[35px] object-cover"
            >
          </div>
          
          <!-- User Info -->
          <div class="ml-3 flex-grow min-w-0">
            <h4 class="text-text-primary font-medium text-sm truncate">{{ learner.fullName }}</h4>
            <p class="text-text-secondary text-xs truncate">@{{ learner.username }}</p>
          </div>
          
          <!-- Arrow Icon -->
          <div class="flex-shrink-0 ml-2">
            <i class="fas fa-angle-right text-lg text-gray-500"></i>
          </div>
        </a>
        
        <!-- Empty State -->
        <div v-if="learners.length === 0" class="p-6 text-center text-text-secondary">
          <i class="fas fa-users text-3xl text-text-muted mb-2"></i>
          <p>No learners found in this classroom.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    learners: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
  /* Custom scrollbar styling */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
  </style>