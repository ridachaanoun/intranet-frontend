<template>
    <div class="bg-background min-h-screen">
      <!-- Profile Header Section -->
      <ProfileHeader />
      
      <!-- Main Content Section -->
      <div class="container mx-auto px-4 pb-12">
        <!-- Tabs Navigation -->
        <ProfileNavigation v-if="role"
          :tabs="tabs" 
          :active-tab="activeTab" 
          @change-tab="activeTab = $event"
          :role="role" 
        />
        
        <!-- Tab Content -->
        <div class="mt-6">
          <ProfileOverview v-if="activeTab === 'overview'" />
          <ProfileClassroom v-else-if="activeTab === 'classroom'" />
          <ProfileAssignments v-else-if="activeTab === 'assignments'"/>
          <ProfileAbsences v-else-if="activeTab === 'absences'" />
          <ProfileCursus v-else-if="activeTab === 'cursus'" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  import ProfileHeader from '@/components/profile/ProfileHeader.vue'
  import ProfileNavigation from '@/components/profile/ProfileNavigation.vue'
  import ProfileOverview from '@/components/profile/ProfileOverview.vue'
  import ProfileClassroom from '@/components/profile/ProfileClassroom.vue'
  import ProfileAssignments from '@/components/profile/ProfileAssignments.vue'
  import ProfileAbsences from '@/components/profile/ProfileAbsences.vue'
  import ProfileCursus from '@/components/profile/ProfileCursus.vue'
  import { useUserStore } from '@/stores/userStore'; 

const userStore = useUserStore();
const role = computed(()=>userStore.user?.role)
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