<template>
    <div class="bg-background min-h-screen">
      <!-- Profile Header Section -->
      <ProfileHeader />
      
      <!-- Main Content Section -->
      <div class="container mx-auto px-4 pb-12">
        <!-- Tabs Navigation -->
        <ProfileNavigation 
          :tabs="tabs" 
          :active-tab="activeTab" 
          @change-tab="activeTab = $event" 
        />
        
        <!-- Tab Content -->
        <div class="mt-6">
          <ProfileOverview v-if="activeTab === 'overview'" />
          <ProfileClassroom v-else-if="activeTab === 'classroom'" />
          <ProfileAssignments v-else-if="activeTab === 'assignments'"/>
          <ProfileAbsences v-else-if="activeTab === 'absences'" :absences="absencesData" />
          <ProfileCursus v-else-if="activeTab === 'cursus'" :cursus="cursusData" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProfileHeader from '@/components/profile/ProfileHeader.vue'
  import ProfileNavigation from '@/components/profile/ProfileNavigation.vue'
  import ProfileOverview from '@/components/profile/ProfileOverview.vue'
  import ProfileClassroom from '@/components/profile/ProfileClassroom.vue'
  import ProfileAssignments from '@/components/profile/ProfileAssignments.vue'
  import ProfileAbsences from '@/components/profile/ProfileAbsences.vue'
  import ProfileCursus from '@/components/profile/ProfileCursus.vue'
  
  // Tab navigation
  const tabs = [
    { id: 'overview', name: 'OVERVIEW', icon: 'fas fa-user' },
    { id: 'classroom', name: 'CLASSROOM', icon: 'fas fa-chalkboard-teacher' },
    { id: 'assignments', name: 'ASSIGNMENTS', icon: 'fas fa-tasks' },
    { id: 'absences', name: 'ABSENCES', icon: 'fas fa-calendar-check' },
    { id: 'cursus', name: 'CURSUS', icon: 'fas fa-graduation-cap' }
  ]
  const activeTab = ref('overview')
  
  // Absences data
  const absencesData = ref([
    {
      id: 1,
      date: '2025-03-08',
      status: 'Present',
      class: 'Aliens',
      session: 'Morning',
      confirmed_by: 'Said Aabilla'
    },
    {
      id: 2,
      date: '2025-03-07',
      status: 'Present',
      class: 'Aliens',
      session: 'Morning',
      confirmed_by: 'Said Aabilla'
    },
    {
      id: 3,
      date: '2025-03-06',
      status: 'Absent',
      class: 'Aliens',
      session: 'Morning',
      confirmed_by: 'Said Aabilla',
      reason: 'Medical appointment'
    },
    {
      id: 4,
      date: '2025-03-05',
      status: 'Present',
      class: 'Aliens',
      session: 'Morning',
      confirmed_by: 'Said Aabilla'
    }
  ])
  
  // Cursus data
  const cursusData = ref([
  {
    id: 1,
    date: '2024-09-02',
    event: 'Registration',
    status: 'PASS',
    class: 'Aliens',
    promotion_year: '2024 / 2025',
    remarks: 'Initial registration at YouCode',
    coach: 'Sarah Moukrim',
    role: 'Admissions Officer',
    coachImage: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 2,
    date: '2024-09-02',
    event: 'Promotion',
    status: 'IN PROGRESS',
    class: 'Aliens',
    promotion_year: '2024 / 2025',
    remarks: 'Initial registration at YouCode',
    coach: 'Said Aabilla',
    role: 'Lead Instructor',
    coachImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: 3,
    date: '2024-09-02',
    event: ' Class Change',
    status: 'FAIL',
    class: 'test',
    promotion_year: '2024 / 2025',
    remarks: 'Initial registration at YouCode',
    coach: 'Said2 Aabilla',
    coachImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
  ])
  </script>