<template>

      <!-- Page Header with Improved Design -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="relative">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block">
            YouCode Classrooms
          </h1>
          <div class="h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full w-3/4 mt-1"></div>
        </div>
        <div class="flex items-center space-x-3 mt-4 md:mt-0">
          <div class="glass-effect rounded-full py-2 px-4 flex items-center shadow-glow">
            <span class="text-text-secondary text-sm mr-2">Total Classrooms:</span>
            <span class="text-primary-400 font-medium text-lg">{{ totalClassrooms }}</span>
          </div>
        </div>
      </div>
    
      <!-- Enhanced Filter Bar -->
      <div class="bg-surface rounded-xl shadow-card p-6 mb-8 glass-effect">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Search Bar with Improved Design -->
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search classroom..." 
              class="bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400 pr-12"
            >
            <button class="absolute right-4 top-3 text-primary-400 hover:text-primary-300 transition-colors">
              <i class="fas fa-search text-lg"></i>
            </button>
          </div>
    
          <!-- Campus Filter Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedCampus"
              class="appearance-none bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer pr-12"
            >
              <option value="">All Campuses</option>
              <option 
                v-for="campus in campuses" 
                :key="campus.value" 
                :value="campus.value" 
                class="text-text-secondary"
              >
                {{ campus.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <i class="fas fa-map-marker-alt text-primary-400"></i>
            </div>
          </div>
    
          <!-- Level Filter Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedLevel"
              class="appearance-none bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer pr-12"
            >
              <option value="">All Levels</option>
              <option 
                v-for="level in levels" 
                :key="level.value" 
                :value="level.value" 
                class="text-text-secondary"
              >
                {{ level.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <i class="fas fa-layer-group text-primary-400"></i>
            </div>
          </div>
        </div>
      </div>
    
      <!-- Visual Divider -->
      <div class="flex items-center mb-8">
        <div class="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent flex-grow"></div>
        <div class="px-4">
          <span class="bg-surface rounded-full w-10 h-10 flex items-center justify-center shadow-glow">
            <i class="fas fa-chalkboard text-primary-400"></i>
          </span>
        </div>
        <div class="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent flex-grow"></div>
      </div>
    
      <!-- Classroom Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Classroom Card -->
        <div 
          v-for="classroom in filteredClassrooms" 
          :key="classroom.id" 
          class="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Cover Image with Gradient Overlay -->
          <div class="relative">
            <router-link :to="`/classroom/${classroom.slug}`" class="block">
              <div 
                class="h-44 bg-cover bg-center bg-no-repeat" 
                :style="{ backgroundImage: `url('${classroom.coverImage}')` }"
              >
                <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
              </div>
            </router-link>
            
            <!-- Team Members Photos -->
            <div class="absolute bottom-0 right-0 p-3 flex justify-end space-x-2">
              <!-- Delegates -->
              <div 
                v-for="(delegate, idx) in classroom.delegates" 
                :key="idx"
                class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                :title="delegate.role + ': ' + delegate.name"
                @click="goToProfile(delegate.username)"
              >
                <img 
                  :src="delegate.image" 
                  :alt="delegate.name"
                  class="w-full h-full object-cover"
                >
              </div>
              
              <!-- Trainer -->
              <div 
                class="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary-500 transform hover:scale-110 transition-transform cursor-pointer shadow-glow"
                :title="`Trainer: ${classroom.trainer.name}`"
                @click="goToProfile(classroom.trainer.username)"
              >
                <img 
                  :src="classroom.trainer.image" 
                  :alt="classroom.trainer.name"
                  class="w-full h-full object-cover"
                >
              </div>
            </div>
          </div>
    
          <!-- Card Content -->
          <div class="p-5">
            <router-link :to="`/classroom/${classroom.slug}`" class="block">
              <h3 class="text-xl font-semibold text-text-primary mb-3 hover:text-primary-400 transition-colors">
                {{ classroom.name }}
              </h3>
            </router-link>
            
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
                <span 
                  class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors"
                  @click="goToProfile(classroom.trainer.username)"
                >{{ classroom.trainer.name }}</span>
              </div>
              
              <!-- Learners -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                    <i class="fas fa-user-group text-primary-400 text-xs"></i>
                  </div>
                  <span class="text-text-secondary">Learners</span>
                </div>
                <span class="font-medium text-text-primary">{{ classroom.learners }}</span>
              </div>
              
              <!-- Delegate -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                    <i class="fas fa-user-shield text-primary-400 text-xs"></i>
                  </div>
                  <span class="text-text-secondary">Delegate</span>
                </div>
                <span 
                  class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors"
                  @click="goToProfile(classroom.mainDelegate.username)"
                >{{ classroom.mainDelegate.name }}</span>
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
                <span class="font-medium text-text-primary">{{ classroom.promotion }}</span>
              </div>
            </div>
          </div>
          
          <!-- Card Footer -->
          <div class="px-5 py-3 bg-surface-hover flex justify-center">
            <router-link 
              :to="`/classroom/${classroom.slug}`" 
              class="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center"
            >
              View Classroom <i class="fas fa-chevron-right ml-2"></i>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Additional Info Cards -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Classroom Stats Card -->
        <div class="bg-surface rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-300">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fas fa-chart-pie text-primary-400 mr-2"></i>
            <span>Classroom Statistics</span>
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(stat, index) in stats" :key="index" class="bg-surface-hover rounded-lg p-4 text-center">
              <div class="text-3xl font-bold text-primary-400 mb-1">{{ stat.value }}</div>
              <div class="text-sm text-text-secondary">{{ stat.label }}</div>
            </div>
          </div>
        </div>
  
        <!-- Quick Access Card -->
        <div class="bg-surface rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-300">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fas fa-bolt text-primary-400 mr-2"></i>
            <span>Quick Access</span>
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <router-link 
              v-for="(link, index) in quickLinks" 
              :key="index"
              :to="link.path" 
              class="bg-surface-hover hover:bg-surface-active transition-colors rounded-lg p-4 flex items-center"
            >
              <div class="w-10 h-10 rounded-full bg-primary-600/20 flex items-center justify-center mr-3">
                <i :class="link.icon + ' text-primary-400'"></i>
              </div>
              <span class="text-text-primary">{{ link.label }}</span>
            </router-link>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/stores/app'
  
  const router = useRouter()
  const appStore = useAppStore()
  
  
  // Filter states
  const searchQuery = ref('')
  const selectedCampus = ref('')
  const selectedLevel = ref('')
  
  // Filter options
  const campuses = [
    { value: '1', label: 'Youssoufia' },
    { value: '2', label: 'Safi' },
  ]
  
  const levels = [
    { value: '1', label: '1ère Année' },
    { value: '2', label: '2ème Année' },
    { value: '3', label: 'SAS' },
  ]
  
  // Statistics data
  const stats = [
    { value: 12, label: 'Total Classes' },
    { value: 248, label: 'Active Learners' },
    { value: 18, label: 'Trainers' },
    { value: 2, label: 'Campuses' },
  ]
  
  // Quick access links
  const quickLinks = [
    { label: 'Class Schedule', icon: 'fas fa-calendar-alt', path: '/schedule' },
    { label: 'Find a Trainer', icon: 'fas fa-user-tie', path: '/trainers' },
    { label: 'Resources', icon: 'fas fa-bookmark', path: '/resources' },
    { label: 'Learning Path', icon: 'fas fa-graduation-cap', path: '/learning-path' },
  ]
  
  // Classroom data
  const classrooms = ref([
    {
      id: 1,
      slug: 'mernops-masters',
      name: 'MernOps Masters',
      level: '2ème Année',
      levelValue: '2',
      campus: 'Youssoufia',
      campusValue: '1',
      learners: 16,
      promotion: '2024 / 2025',
      coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: {
        name: 'Ilyass Chakir',
        username: 'ilyasschakir',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      mainDelegate: {
        name: 'Abdeljalil El Filaly',
        username: 'abdeljalilelfilaly'
      },
      delegates: [
        {
          name: 'Abdelhafid Belfqir',
          username: 'abdelhafidbelfqir',
          role: 'Back-up',
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          name: 'Abdeljalil El Filaly',
          username: 'abdeljalilelfilaly',
          role: 'Delegate',
          image: 'https://randomuser.me/api/portraits/men/42.jpg'
        }
      ]
    },
    {
      id: 2,
      slug: 'ai-architects',
      name: 'AI Architects',
      level: '1ère Année',
      levelValue: '1',
      campus: 'Safi',
      campusValue: '2',
      learners: 18,
      promotion: '2024 / 2025',
      coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: {
        name: 'Mohammed Alami',
        username: 'mohammedalami',
        image: 'https://randomuser.me/api/portraits/men/55.jpg'
      },
      mainDelegate: {
        name: 'Sara Ahmed',
        username: 'saraahmed'
      },
      delegates: [
        {
          name: 'Sara Ahmed',
          username: 'saraahmed',
          role: 'Delegate',
          image: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
      ]
    },
    {
      id: 3,
      slug: 'react-rockstars',
      name: 'React Rockstars',
      level: '2ème Année',
      levelValue: '2',
      campus: 'Youssoufia',
      campusValue: '1',
      learners: 15,
      promotion: '2024 / 2025',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: {
        name: 'Leila Benali',
        username: 'leilabenali',
        image: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      mainDelegate: {
        name: 'Omar Fadili',
        username: 'omarfadili'
      },
      delegates: [
        {
          name: 'Omar Fadili',
          username: 'omarfadili',
          role: 'Delegate',
          image: 'https://randomuser.me/api/portraits/men/75.jpg'
        }
      ]
    },
    {
      id: 4,
      slug: 'sas-digital-ninjas',
      name: 'SAS Digital Ninjas',
      level: 'SAS',
      levelValue: '3',
      campus: 'Safi',
      campusValue: '2',
      learners: 20,
      promotion: '2024 / 2025',
      coverImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: {
        name: 'Karim Mansouri',
        username: 'karimmansouri',
        image: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      mainDelegate: {
        name: 'Hassan Mekouar',
        username: 'hassanmekouar'
      },
      delegates: [
        {
          name: 'Hassan Mekouar',
          username: 'hassanmekouar',
          role: 'Delegate',
          image: 'https://randomuser.me/api/portraits/men/85.jpg'
        }
      ]
    }
  ])
  
  // Computed properties
  const totalClassrooms = computed(() => classrooms.value.length)
  
  const filteredClassrooms = computed(() => {
    return classrooms.value.filter(classroom => {
      const matchesSearch = searchQuery.value === '' || 
        classroom.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        
      const matchesCampus = selectedCampus.value === '' || 
        classroom.campusValue === selectedCampus.value
        
      const matchesLevel = selectedLevel.value === '' || 
        classroom.levelValue === selectedLevel.value
        
      return matchesSearch && matchesCampus && matchesLevel
    })
  })
  
  // Methods
  function goToProfile(username) {
    router.push(`/profile/${username}`)
  }
  </script>