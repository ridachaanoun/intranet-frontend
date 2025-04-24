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
          <!-- Search Bar -->
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
      
      <div v-if="!loading">

        <!-- Classroom Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Classroom Card -->
          <div 
            v-for="classroom in classrooms" 
            :key="classroom.id" 
            class="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- Cover Image -->
            <div class="relative">
              <router-link :to="`/classroom/${classroom.id}`" class="block">
                <div 
                  class="h-44 bg-cover bg-center bg-no-repeat" 
                  :style="{ backgroundImage: `url('${classroom.cover_image_url}')` }"
                >
                  <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                </div>
              </router-link>

              <!-- Team Members -->
              <div class="absolute bottom-0 right-0 p-3 flex justify-end space-x-2">
                <!-- Delegate -->
                <div 
                  class="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface transform hover:scale-110 transition-transform cursor-pointer hover:border-primary-400 shadow-lg"
                  :title="`Delegate: ${classroom.delegate?.name}`"
                  @click="goToProfile(classroom.delegate?.id)"
                >
                  <img 
                    :src="classroom.delegate?.image_url" 
                    :alt="classroom.delegate?.name"
                    class="w-full h-full object-cover"
                  >
                </div>

                <!-- Teacher -->
                <div 
                  class="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary-500 transform hover:scale-110 transition-transform cursor-pointer shadow-glow"
                  :title="`Teacher: ${classroom.teacher?.name}`"
                  @click="goToProfile(classroom.teacher?.id)"
                >
                  <img 
                    :src="classroom.teacher?.image_url" 
                    :alt="classroom.teacher?.name"
                    class="w-full h-full object-cover"
                  >
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-5">
              <router-link :to="`/classroom/${classroom.id}`" class="block">
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
                    @click="goToProfile(classroom.teacher?.id)"
                  >{{ classroom.teacher?.name }}</span>
                </div>
                
                <!-- Learners -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                      <i class="fas fa-user-group text-primary-400 text-xs"></i>
                    </div>
                    <span class="text-text-secondary">Learners</span>
                  </div>
                  <span class="font-medium text-text-primary">{{ classroom.students?.length }}</span>
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
                    @click="goToProfile(classroom.delegate?.id)"
                  >{{ classroom.delegate?.name }}</span>
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
                  <span class="font-medium text-text-primary">{{ classroom.promotion?.year || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="px-5 py-3 bg-surface-hover flex justify-center">
              <router-link 
                :to="`/classroom/${classroom.id}`" 
                class="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center"
              >
                View Classroom <i class="fas fa-chevron-right ml-2"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-10" v-if="totalPages > 1">
          <nav class="flex items-center space-x-2 bg-surface px-2 py-1 rounded-full shadow-card">
            <!-- Previous Button -->
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:text-primary-400 hover:bg-surface-hover transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <!-- Page Numbers -->
            <div v-for="page in displayedPages" :key="page">
              <span v-if="page === '...'" class="w-10 h-10 flex items-center justify-center text-text-muted">...</span>
              <a 
                v-else 
                href="#" 
                @click.prevent="goToPage(page)"
                class="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                :class="currentPage === page 
                  ? 'bg-primary-500 text-text-primary shadow-glow' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'"
              >{{ page }}</a>
            </div>
            
            <!-- Next Button -->
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:text-primary-400 hover:bg-surface-hover transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </nav>
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
          <!-- <div class="bg-surface rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-300">
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
          </div> -->
          <QuickLinks/>
        </div>
      </div>
    <div v-else class="h-[32rem] flex justify-center items-center">
        <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
  </template>
  
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import api from '@/axios';
import QuickLinks from '../components/home/QuickLinks.vue'

// Access the app store
const app = useAppStore();

// State variables
const classrooms = ref([]);
const totalClassrooms = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const per_page = 10;

const searchQuery = ref('');
const selectedCampus = ref('');
const selectedLevel = ref('');
const loading = ref(false);

// Filter options from the store
const campuses = computed(() => app.campuses);
const levels = computed(() => app.levels);

// Debounce for search
let debounceTimeout;
watch(searchQuery, () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchClassrooms(1);
  }, 1000); 
});

watch([selectedCampus, selectedLevel], () => {
  fetchClassrooms(1);
});

// Fetch classrooms from API
async function fetchClassrooms(page = 1) {
  loading.value = true;
  try {
    const params = {
      query: searchQuery.value || null,
      campus: selectedCampus.value || null,
      level: selectedLevel.value || null,
      page: page,
      per_page: per_page,
    };

    const response = await api.get('classrooms/search', { params });
    classrooms.value = response.data.classrooms; // Use data directly from the API response
    totalClassrooms.value = response.data.total;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
  } catch (error) {
    console.error('Error fetching classrooms:', error);
  } finally {
    loading.value = false;
  }
}

// Pagination methods
function goToPage(page) {
  if (page !== currentPage.value && page > 0 && page <= totalPages.value) {
    fetchClassrooms(page);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    fetchClassrooms(currentPage.value + 1);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    fetchClassrooms(currentPage.value - 1);
  }
}

// Fetch classrooms on mount
onMounted(() => {
  fetchClassrooms();
});

import { useRouter } from 'vue-router';
const router = useRouter();

function goToProfile(userId) {
  if (userId) {
    router.push(`/profile/${userId}`);
  }
}

  // Statistics data
  const stats = [
    { value: 12, label: 'Total Classes' },
    { value: 248, label: 'Active Learners' },
    { value: 18, label: 'Trainers' },
    { value: 2, label: 'Campuses' },
  ]
    // Quick access links
// const quickLinks = [
//   { label: 'Home', icon: 'fas fa-home', path: '/' },
//   { label: 'Network', icon: 'fas fa-network-wired', path: '/network' },
//   { label: 'Classrooms', icon: 'fas fa-chalkboard', path: '/classrooms' },
//   { label: 'Marketplace', icon: 'fas fa-store', path: '/marketplace' },
//   { label: 'Profile', icon: 'fas fa-user', path: '/profile' },
// ];
</script>