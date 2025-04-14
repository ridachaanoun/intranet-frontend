<template>
    <div v-if="classroom">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Classrooms Grid -->
        <div class="lg:col-span-2">
          <div>
            <div
              class="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <!-- Cover Image with Gradient Overlay -->
              <div class="relative">
                <a href="#" class="block">
                  <div 
                    class="h-44 bg-cover bg-center bg-no-repeat" 
                    :style="`background-image: url('${classroom?.cover_image}')`"
                  >
                    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                  </div>
                </a>
                <!-- Team Members Photos -->
                <div class="absolute bottom-0 right-0 p-3 flex justify-end space-x-2">
                  <!-- Delegates -->
                  <div 
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                    :title="`Coach: ${classroom?.teacher?.name || 'N/A'}`"
                  >
                    <img :src="classroom?.teacher?.image_url" :alt="classroom?.teacher?.name" class="w-full h-full object-cover">
                  </div>
                  <div 
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                    :title="`Delegate: ${classroom?.delegate?.name || 'N/A'}`"
                  >
                    <img :src="classroom?.delegate?.image_url" :alt="classroom?.delegate?.name" class="w-full h-full object-cover">
                  </div>
                  <!-- Trainer -->
                  <div 
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary-500 transform hover:scale-110 transition-transform cursor-pointer shadow-glow"
                    :title="`Trainer: ${classroom?.students?.[0]?.name || 'N/A'}`"
                  >
                    <img :src="classroom?.students?.[0]?.image_url" :alt="classroom?.students?.[0]?.name" class="w-full h-full object-cover">
                  </div>
                </div>
              </div>
              
              <!-- Card Content -->
              <div class="p-5">
                <a href="#" class="block">
                  <h3 class="text-xl font-semibold text-text-primary mb-3 hover:text-primary-400 transition-colors">
                    {{ classroom?.slug }}
                  </h3>
                </a>
                
                <!-- Details List -->
                <div class="space-y-2.5 text-sm">
                  <!-- Level -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-arrow-trend-up text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Level</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom?.level }}</span>
                  </div>
                  
                  <!-- Coach -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-briefcase text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Coach</span>
                    </div>
                    <span class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors">
                      {{ classroom?.teacher?.name || 'N/A' }}
                    </span>
                  </div>
                  
                  <!-- Learners -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-user-group text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Learners</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom?.students?.length || 0 }}</span>
                  </div>
                  
                  <!-- Delegate -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-user-shield text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Delegate</span>
                    </div>
                    <span class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors">
                      {{ classroom?.delegate?.name || 'N/A' }}
                    </span>
                  </div>
                  
                  <!-- Campus -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-school text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Campus</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom?.campus }}</span>
                  </div>
                  
                  <!-- Promotion -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-calendar-check text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Promotion</span>
                    </div>
                    <span class="font-medium text-text-primary">{{ classroom?.promotion?.year || 'N/A' }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Card Footer -->
              <div class="px-5 py-3 bg-surface-hover flex justify-center">
                <a href="#" class="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
                  View Classroom <i class="fas fa-chevron-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- Learners List Sidebar -->
        <div class="lg:col-span-1">
          <ProfileClassroomLearners :learners="classroom?.students || []" />
        </div>
      </div>
    </div>
</template>

<script setup>
import ProfileClassroomLearners from '@/components/profile/ProfileClassroomLearners.vue';

// Define props to accept data from the parent component
const props = defineProps({
  classroom: {
    type: Object,
    required: true,
  },
});
</script>