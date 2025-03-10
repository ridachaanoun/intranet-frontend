<template>
    <div class="bg-background min-h-screen">
      <!-- Profile Header Section -->
      <ProfileHeader :user="userData" />
      
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
          <ProfileOverview v-if="activeTab === 'overview'" :user-data="userData" />
          <ProfileClassroom v-else-if="activeTab === 'classroom'" :classroom-data="classroomData" />
          <ProfileAssignments v-else-if="activeTab === 'assignments'" :assignments="assignmentsData" />
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
  
  // User data
  const userData = ref({
    firstName: 'Rida',
    lastName: 'Chaanoun',
    username: 'ridachaanouni',
    phoneNumber: 'Private',
    youcodeEmail: 'ridachaanouni@youcode.ma',
    personalEmail: 'ridachaanouni@gmail.com',
    city: 'Youssoufia',
    level: '1ère Année',
    classroom: 'Aliens',
    referentCoach: 'Said Aabilla',
    registrationDate: '2024-09-02',
    campus: 'Youssoufia',
    promotion: '2024 - 2025',
    points: '2500 YC',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    lvl: '1ère Année',
    isConnected: true,
    links:{
        linkedin_url:"https://www.linkedin.com/in/rida-chaanoun/",
        github_url:"https://github.com/ridachaanoun",
        website_url:"rftgyhuj",
        codingame_url:"null",
        hackerrank_url:"null",
        twitter_url:"null",
        instagram_url:"null",
        instagram_url:"null",
        facebook_url:"null"
      }
  })
  
  // Classroom data
  const classroomData = ref([
    {
      id: 1,
      name: 'Aliens',
      level: '1ère Année',
      coach: 'Said Aabilla',
      coachImage: 'https://randomuser.me/api/portraits/men/22.jpg',
      learners: 18,
      delegate: 'Abdeljalil El Filaly',
      delegateImage: 'https://randomuser.me/api/portraits/men/42.jpg',
      backupCoach: 'Abdelhafid Belfqir',
      backupCoachImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      campus: 'Youssoufia',
      promotion: '2024 / 2025',
      coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    }
  ])
  
  // Assignments data
  const assignmentsData = ref([
    {
      id: 1,
      title: 'Build a Personal Portfolio Website',
      description: 'Create a responsive personal portfolio website using HTML, CSS and JavaScript.',
      assigned_by: 'Said Aabilla',
      assigned_to: 'Rida Chaanoun',
      due_date: '2025-03-15T23:59:59',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'E-commerce Product Page',
      description: 'Develop an interactive product page for an e-commerce website with a shopping cart functionality.',
      assigned_by: 'Said Aabilla',
      assigned_to: 'Rida Chaanoun',
      due_date: '2025-03-05T23:59:59',
      status: 'Submitted'
    },
    {
      id: 3,
      title: 'REST API Integration',
      description: 'Create a web application that fetches and displays data from a public REST API.',
      assigned_by: 'Said Aabilla',
      assigned_to: 'Rida Chaanoun',
      due_date: '2025-02-28T23:59:59',
      status: 'Graded'
    }
  ])
  
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
    role: 'Lead Instructor',
    coachImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
  ])
  </script>