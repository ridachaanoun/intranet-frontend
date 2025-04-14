<template>
    <div class="id">User ID: {{ id }}</div>
    <div v-if="user" class="bg-background min-h-screen">

        <ProfileHeader  :user="user" />

          <!-- Main Content Section -->
          <div class="container mx-auto px-4 pb-12">
        <!-- <Tabs Navigation -->
            <ProfileNavigation 
            :tabs="tabs" 
            :active-tab="activeTab" 
            @change-tab="activeTab = $event" 
            :role="user.role"
            /> 
           
        <!-- Tab Content -->
        <div class="mt-6">
            
            <ProfileOverview v-if="activeTab === 'overview'" :user="user" :role="user.role"  />
          <ProfileClassroom v-else-if="activeTab === 'classroom'" :classroom="classroom"    />
          <!-- <ProfileAssignments v-else-if="activeTab === 'assignments'"/>
          <ProfileAbsences v-else-if="activeTab === 'absences'" />
          <ProfileCursus v-else-if="activeTab === 'cursus'" />  -->
        </div>

      </div>
    </div>
        <div v-else class="loading flex items-center justify-center pt-6 h-[80vh]">        <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        </div>

  </template>
  
  <script setup>
  import api from '@/axios';
  import { ref } from 'vue';
  import ProfileHeader from '@/components/userProfile/ProfileHeader.vue';
  import ProfileNavigation from '@/components/profile/ProfileNavigation.vue';
  import ProfileOverview from '@/components/userProfile/ProfileOverview.vue';
  import ProfileClassroom from '@/components/userProfile/ProfileClassroom.vue';
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  });
  
  const user = ref(null);
  const classroom = ref(null);
  
  async function fetchUser(id) {
    try {
      const resp = await api.get(`user-details/${id}`);
      user.value = await resp.data.user; 
      classroom.value = await resp.data.lastClassroom; 
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  
  fetchUser(props.id);
  
  // Tab navigation
  const tabs = [
    { id: 'overview', name: 'OVERVIEW', icon: 'fas fa-user' },
    { id: 'classroom', name: 'CLASSROOM', icon: 'fas fa-chalkboard-teacher' },
    { id: 'assignments', name: 'ASSIGNMENTS', icon: 'fas fa-tasks' },
    { id: 'absences', name: 'ABSENCES', icon: 'fas fa-calendar-check' },
    { id: 'cursus', name: 'CURSUS', icon: 'fas fa-graduation-cap' }
  ]
  const activeTab = ref('overview')
  </script>