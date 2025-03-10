<template>
    <div class="bg-surface rounded-xl shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-surface-hover flex justify-between items-center">
        <h2 class="text-lg font-semibold text-text-primary">Academic Journey</h2>
      </div>
      
      <!-- Timeline View -->
      <div class="cursus-timeline relative px-4 pt-8 pb-12 bg-gradient-to-br from-surface to-surface-hover">
        <!-- Path Line -->
        <div class="absolute h-1 bg-gradient-to-r from-primary-300/50 via-primary-500/70 to-primary-700/50 top-32 left-4 right-4 rounded-full z-0"></div>
        
        <!-- Timeline Steps -->
        <div class="relative z-10 flex flex-nowrap overflow-x-auto pb-4 gap-2 md:gap-4 hide-scrollbar">
          <div 
            v-for="(item, index) in cursus" 
            :key="item.id" 
            class="timeline-item flex-shrink-0 w-48 flex flex-col items-center"
          >
            <!-- Date Badge -->
            <div class="mb-3 px-2.5 py-1 bg-primary-500/10 text-text-secondary rounded-full text-xs font-semibold">
              {{ formatDate(item.date) }}
            </div>
            
            <!-- Connection Line & Marker -->
            <div class="relative h-12 w-full flex justify-center items-center mb-2">
              <!-- Marker Dot -->
              <div 
                :class="[
                  'w-8 h-8 rounded-full transition-all duration-500 transform',
                  'flex items-center justify-center z-10',
                  isCurrent(index) 
                    ? 'bg-primary-500 scale-110 shadow-lg shadow-primary-500/30' 
                    : isPast(index) 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                ]"
              >
                <i 
                  :class="[
                    'text-white text-xs',
                    isCurrent(index) 
                      ? 'fas fa-map-marker-alt' 
                      : isPast(index) 
                        ? 'fas fa-check' 
                        : 'fas fa-hourglass'
                  ]"
                ></i>
              </div>
            </div>
            
            <!-- Content Card -->
            <div 
              :class="[
                'w-full rounded-xl overflow-hidden transform transition-all duration-300',
                'hover:shadow-lg hover:-translate-y-1',
                isCurrent(index) ? 'bg-primary-500/10 border border-primary-500/30' : 'bg-white/80 border border-surface-hover'
              ]"
            >
              <!-- Card Header -->
              <div 
                :class="[
                  'px-4 py-2 text-center',
                  isCurrent(index) ? 'bg-primary-500 text-white' : 'bg-surface-hover text-text-primary'
                ]"
              >
                <h3 class="font-bold text-sm">{{ item.event }}</h3>
              </div>
              
              <!-- Card Content -->
              <div class="p-3 text-center">
                <div class="mb-2 text-xs font-bold text-primary-500 ">{{ item.promotion_year }}</div>
                
                <div class="font-medium text-sm mb-2">{{ item.class }}</div>
                
                <div 
                  :class="[
                    'inline-block px-2 py-0.5 rounded text-xs font-bold',
                    getStatusClass(item.status)
                  ]"
                >
                  {{ isCurrent(index) ? 'CURRENT' : item.status }}
                </div>
                
                <!-- Coach Info -->
                <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center">
                  <div class="flex flex-col items-center">
                    <div class="relative group">
                      <img 
                        :src="item.coachImage" 
                        :alt="item.coach" 
                        class="w-12 h-12 rounded-full object-cover border-2 group-hover:border-primary-500 transition-all"
                        :class="isCurrent(index) ? 'border-primary-500' : 'border-gray-200'"
                      >
                    </div>
                    <div class="mt-1 text-xs font-medium text-text-primary">{{ item.coach }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Animated Guide -->
        <div class="absolute bottom-2 right-4 text-text-secondary text-xs flex items-center animate-pulse">
          <span>Scroll to view more</span>
          <i class="fas fa-chevron-right ml-1"></i>
        </div>
      </div>
      
      <!-- Remarks & Notes Section -->
      <div v-if="hasRemarks" class="px-6 py-4 border-t border-surface-hover">
        <h3 class="text-sm font-semibold text-primary-500 mb-4 flex items-center">
          <i class="fas fa-clipboard-list mr-2"></i>
          Journey Notes & Remarks
        </h3>
        
        <div class="space-y-3">
          <div 
            v-for="(item, index) in cursusWithRemarks" 
            :key="`remark-${index}`" 
            class="bg-surface-hover p-4 rounded-xl hover:shadow-md transition-shadow"
          >
            <div class="flex items-start gap-3">
              <div 
                :class="[
                  'mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  getEventIconClass(item.event).bgClass
                ]"
              >
                <i :class="[getEventIconClass(item.event).icon, 'text-sm']"></i>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start mb-1">
                  <span class="font-medium text-text-primary">{{ item.event }}</span>
                  <span class="text-xs text-text-secondary bg-surface px-2 py-0.5 rounded">{{ formatDate(item.date) }}</span>
                </div>
                <p class="text-text-secondary text-sm">{{ item.remarks }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="cursus.length === 0" class="py-12 text-center text-text-secondary bg-surface-hover">
        <div class="inline-block p-4 rounded-full bg-surface mb-4">
          <i class="fas fa-graduation-cap text-3xl text-text-muted"></i>
        </div>
        <h3 class="text-lg font-medium text-text-primary mb-2">No History Yet</h3>
        <p class="text-text-secondary max-w-md mx-auto">Your academic journey is just beginning. Records will appear here as you progress through your education at YouCode.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  
  // Props with cursus data
  const props = defineProps({
    cursus: {
      type: Array,
      required: true
    }
  })
  
  // Helper methods
  const isCurrent = (index) => {
    // Define current step as the one with "IN PROGRESS" status
    return props.cursus[index].status === 'IN PROGRESS';
  }
  
  const isPast = (index) => {
    // Past steps are those with "PASS" status
    return props.cursus[index].status === 'PASS';
  }
  
  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
  
  // Get status color classes
  const getStatusClass = (status) => {
    switch(status) {
      case 'PASS':
        return 'bg-green-100 text-green-700';
      case 'FAIL':
        return 'bg-red-100 text-red-700';
      case 'IN PROGRESS':
        return 'bg-yellow-100 text-yellow-700';
      case 'PENDING':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-primary-100 text-primary-700';
    }
  }
  
  // Get event icon based on event type
  const getEventIconClass = (event) => {
    switch(event) {
      case 'Registration':
        return { icon: 'fas fa-user-plus text-blue-500', bgClass: 'bg-blue-100' };
      case 'SAS':
        return { icon: 'fas fa-chalkboard text-yellow-500', bgClass: 'bg-yellow-100' };
      case '1ère Année':
        return { icon: 'fas fa-book-open text-green-500', bgClass: 'bg-green-100' };
      case 'Class Change':
        return { icon: 'fas fa-exchange-alt text-purple-500', bgClass: 'bg-purple-100' };
      case 'Promotion':
        return { icon: 'fas fa-level-up-alt text-indigo-500', bgClass: 'bg-indigo-100' };
      default:
        return { icon: 'fas fa-graduation-cap text-primary-500', bgClass: 'bg-primary-100' };
    }
  }
  
  const cursusWithRemarks = computed(() => {
    return props.cursus.filter(item => item.remarks);
  })
  
  const hasRemarks = computed(() => {
    return cursusWithRemarks.value.length > 0;
  })
  </script>
  
  <style scoped>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .cursus-timeline {
    overflow-x: auto;
    scrollbar-width: none;
  }
  
  /* Animation for the scroll guide */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  /* Timeline item hover effect */
  .timeline-item:hover {
    z-index: 10;
  }
  </style>