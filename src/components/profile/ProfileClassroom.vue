<template>
  <div>
    <div v-if="classroom" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Classrooms Grid -->
       <!-- <> -->
      <router-link :to="`/classroom/${classroom.id}`" class="lg:col-span-2">
        <div>
          <div
            class="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- Cover Image with Gradient Overlay -->
            <div class="relative">
                <div 
                  class="h-44 bg-cover bg-center bg-no-repeat" 
                  :style="`background-image: url('${classroom.cover_image}')`"
                >
                  <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                </div>
              <!-- Team Members Photos -->
              <div class="absolute bottom-4 right-4 p-3 flex justify-end space-x-2">
                  <!-- Teacher -->
                  <router-link
                    :to="`/profile/${classroom.teacher.id}`"
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                    :title="`Coach: ${classroom.teacher.name}`"
                  >
                    <img :src="classroom.teacher.image_url" :alt="classroom.teacher.name" class="w-full h-full object-cover">
                  </router-link>
                  <!-- Delegate -->
                  <router-link
                    :to="`/profile/${classroom.delegate.id}`"
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                    :title="`Delegate: ${classroom.delegate.name}`"
                  >
                    <img :src="classroom.delegate.image_url" :alt="classroom.delegate.name" class="w-full h-full object-cover">
                  </router-link>
                  <!-- Trainer -->
                  <router-link
                    :to="`/profile/${classroom.students[0].id}`"
                    class="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary-500 transform hover:scale-110 transition-transform cursor-pointer shadow-glow"
                    :title="`Trainer: ${classroom.students[0].name}`"
                  >
                    <img :src="classroom.students[0].image_url" :alt="classroom.students[0].name" class="w-full h-full object-cover">
                  </router-link>
                </div>
            </div>
            <!-- Card Content -->
            <div class="p-5">
                <h3 class="text-xl font-semibold text-text-primary mb-3 hover:text-primary-400 transition-colors">
                  {{ classroom.slug }}
                </h3>
              
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
                  <span class="font-medium text-text-primary">{{ classroom.level }}</span>
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
                    {{ classroom.teacher.name }}
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
                  <span class="font-medium text-text-primary">{{ classroom.Learners }}</span>
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
                    {{ classroom.delegate.name }}
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
                  <span class="font-medium text-text-primary">{{ classroom.campus }}</span>
                </div>
                
                <!-- Promotion -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                      <i class="fas fa-calendar-check text-primary-400 text-xs"></i>
                    </div>
                    <span class="text-text-secondary">Promotion</span>
                  </div>
                  <span class="font-medium text-text-primary">{{ classroom.promostion.year }}</span>
                </div>
              </div>
            </div>
            
            <!-- Card Footer -->
            <div class="px-5 py-3 bg-surface-hover flex justify-center">
              <a  class="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
                View Classroom <i class="fas fa-chevron-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </router-link>
    <!-- </> -->
      <!-- Learners List Sidebar -->
      <div class="lg:col-span-1">
        <ProfileClassroomLearners :learners="classroomLearners" />
      </div>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center">
  {{ error }}
</div>
    <div v-else class="flex items-center justify-center">
      <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import ProfileClassroomLearners from './ProfileClassroomLearners.vue';
import { computed, onMounted } from 'vue';
import { useClassroomStore } from '@/stores/classroomStore';

// Initialize the store
const classroomStore = useClassroomStore();

// Fetch data on component mount
onMounted(async () => {
  await classroomStore.fetchClassroom();
});

// Map data from the store
const classroom = computed(() => classroomStore.classroom);
const error = computed(() => classroomStore.error);

// Map learners from the classroom
const classroomLearners = computed(() => classroom?.value?.students || []);
</script>