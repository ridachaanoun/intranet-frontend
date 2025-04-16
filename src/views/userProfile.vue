<template>
    <div v-if="user && !loading" class="bg-background min-h-screen">

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
          <ProfileAssignments v-else-if="activeTab === 'assignments'" :user="user"/>
           <ProfileAbsences v-else-if="activeTab === 'absences'" :id="user.id"/>
          <ProfileCursus v-else-if="activeTab === 'cursus'" :id="user.id" />  
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
  import { ref, onMounted, watch } from 'vue';
  import ProfileHeader from '@/components/userProfile/ProfileHeader.vue';
  import ProfileNavigation from '@/components/profile/ProfileNavigation.vue';
  import ProfileOverview from '@/components/userProfile/ProfileOverview.vue';
  import ProfileClassroom from '@/components/userProfile/ProfileClassroom.vue';
  import ProfileAssignments from '@/components/userProfile/ProfileAssignments.vue';
  import ProfileAbsences from '@/components/userProfile/ProfileAbsences.vue';
  import ProfileCursus from '@/components/userProfile/ProfileCursus.vue';
  import { useRoute } from 'vue-router';
  
  const user = ref(null);
  const classroom = ref(null);
  const loading = ref(false)
  const route = useRoute();
  
  async function fetchUser(id) {
    try {
      loading.value = true
      const resp = await api.get(`user-details/${id}`);
      user.value = resp.data.user;
      classroom.value = resp.data.lastClassroom;
    } catch (error) {
      console.error('Error fetching user:', error);
      user.value = null;
      classroom.value = null;
    }finally{
      loading.value = false
    }
  }
  
  // Fetch user on initial mount
  onMounted(() => {
    fetchUser(route.params.id);
  });
  
  // Refetch user whenever the route param changes
  watch(
    () => route.params.id,
    (newId) => {
      fetchUser(newId);
      
      
    }
  );
  
  // Tab navigation
  const tabs = [
    { id: 'overview', name: 'OVERVIEW', icon: 'fas fa-user' },
    { id: 'classroom', name: 'CLASSROOM', icon: 'fas fa-chalkboard-teacher' },
    { id: 'assignments', name: 'ASSIGNMENTS', icon: 'fas fa-tasks' },
    { id: 'absences', name: 'ABSENCES', icon: 'fas fa-calendar-check' },
    { id: 'cursus', name: 'CURSUS', icon: 'fas fa-graduation-cap' }
  ];
  const activeTab = ref('overview');
  </script>