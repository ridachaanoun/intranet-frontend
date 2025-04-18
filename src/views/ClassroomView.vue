<template>
    <div>
      <div v-if="classroom" class="container mx-auto py-8 px-4">
        <!-- Classroom Banner -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Content - Left Column -->
          <div class="lg:col-span-2">
            <div
              class="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <!-- Cover Image with Gradient Overlay -->
              <div class="relative">
                <a href="#" class="block">
                  <div 
                    class="h-64 bg-cover bg-center bg-no-repeat" 
                    :style="`background-image: url('${classroom.cover_image}')`"
                  >
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background-dark/70 p-6 flex justify-between items-end">
                      <div>
                        <h1 class="text-2xl font-bold text-white">{{ classroom.name }}</h1>
                        <p class="text-sm text-gray-300">Level: {{ classroom.level }}</p>
                        <p class="text-sm text-gray-300">Campus: {{ classroom.campus }}</p>
                      </div>
                    </div>
                  </div>
                </a>
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
                  <router-link v-if="classroom.students[0]"
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
                <a href="#" class="block">
                  <h3 class="text-xl font-semibold text-text-primary mb-3 hover:text-primary-400 transition-colors">
                    {{ classroom.slug }}
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
                    <router-link :to="`/profile/${classroom.teacher.id}`" class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors">
                      {{ classroom.teacher.name }}
                    </router-link>
                  </div>
                  
                  <!-- Learners -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-user-group text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Learners</span>
                    </div>
                    <span class="font-medium text-text-primary">{{classroom.students.length}}</span>
                  </div>
                  
                  <!-- Delegate -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                        <i class="fas fa-user-shield text-primary-400 text-xs"></i>
                      </div>
                      <span class="text-text-secondary">Delegate</span>
                    </div>
                    <router-link :to="`/profile/${classroom.delegate.id}`" class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors">
                      {{ classroom.delegate.name }}
                    </router-link>
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
                    <span class="font-medium text-text-primary">{{ classroom?.promotion?.year}}</span>
                  </div>
                </div>
              </div>
              
              <!-- Card Footer -->
              <div class="px-5 py-3 bg-surface-hover flex justify-center">
                <a href="#" class="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center">
                  {{ classroom.slug }} Classroom
                </a>
              </div>
            </div>
          </div>
          
          <!-- Learners List Sidebar - Right Column -->
          <div class="lg:col-span-1">
            <ProfileClassroomLearners :learners="classroom.students || classroomLearners" />
          </div>
        </div>
      </div>
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center">
        {{ error }}
      </div>
      <div v-else class="h-screen flex justify-center items-center">
        <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import ProfileClassroomLearners from '@/components/profile/ProfileClassroomLearners.vue';
  import api from '@/axios';
  
  const classroom = ref(null);
  const route = useRoute();
  
  // Fetch classroom data from API
  async function fetchClassroom(id) {
    try {
      const response = await api.get(`http://localhost:8000/api/classroom/${id}`);
      classroom.value = response.data;
    } catch (error) {
      console.error('Error fetching classroom data:', error);
    }
  }
  
  // Fetch data when component is mounted
  onMounted(() => {
    fetchClassroom(route.params.id);
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1024px;
  }
  </style>