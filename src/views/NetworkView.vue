<template>
  <!-- Page Header -->
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8" >
    <div class="relative">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block">
        YouCode Network
      </h1>
      <div class="h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full w-3/4 mt-1"></div>
    </div>
    <div class="flex items-center space-x-3 mt-4 md:mt-0">
      <div v-if="!loading" class="glass-effect rounded-full py-2 px-4 flex items-center shadow-glow">
        <span class="text-text-secondary text-sm mr-2">Total Users:</span>
        <span class="text-primary-400 font-medium text-lg">{{ totalUsers }}</span>
      </div>
    </div>
  </div>

  <!-- Filter Bar -->
  <div class="bg-surface rounded-xl shadow-card p-6 mb-8 glass-effect">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Search Bar -->
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name or email..." 
          class="bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400 pr-12"
        >
        <button class="absolute right-4 top-3 text-primary-400 hover:text-primary-300 transition-colors">
          <i class="fas fa-search text-lg"></i>
        </button>
      </div>

      <!-- Grade Filter -->
      <div class="relative">
        <select 
          v-model="selectedGrade" 
          class="appearance-none bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer pr-12"
        >
          <option value="">All Grades</option>
          <option v-for="grade in grades" :key="grade.value" :value="grade.value">
            {{ grade.label }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <i class="fas fa-chevron-down text-primary-400"></i>
        </div>
      </div>

      <!-- Campus Filter -->
      <div class="relative">
        <select 
          v-model="selectedCampus"
          class="appearance-none bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer pr-12"
        >
          <option value="">All Campuses</option>
          <option v-for="campus in campuses" :key="campus.value" :value="campus.value">
            {{ campus.label }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <i class="fas fa-map-marker-alt text-primary-400"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- Network Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" v-if="!loading">
    <div 
      v-for="person in users" 
      :key="person.id"
      class="bg-surface rounded-xl shadow-card overflow-hidden hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
    >
      <router-link 
      :to="{ name: 'user-profile', params: { id: person.id } }" 
      class="block relative"
      >
      <div class="h-10 bg-gradient-to-r from-primary-600 to-primary-700 flex justify-end items-center px-4">
      <span 
      class="level-badge" 
      :class="getBadgeColor(person.grade)"
      >{{ person.grade }}</span>
      </div>
      <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
      <div class="w-20 h-20 rounded-xl overflow-hidden border-4 border-surface shadow-lg">
      <img :src="person.profilePicture" class="w-full h-full object-cover" :alt="person.name" />
      </div>
      </div>
      </router-link>
      <div class="pt-16 pb-5 px-6 text-center">
      <h3 class="text-lg font-medium text-text-primary">{{ person.name }}</h3>
      <p class="text-sm text-primary-400 mb-3">{{ person.email }}</p>
      <div class="flex items-center text-xs text-text-secondary bg-background-element rounded-full px-3 py-1.5 mx-auto">
      <i class="fas fa-map-marker-alt mr-1.5 text-primary-400"></i>
      <span>{{ person.campus }} Campus</span>
      </div>
      </div>
    </div>
    <div v-if="users.length === 0" class="text-center col-span-full">
      <p class="text-text-secondary text-lg">No users found.</p>
    </div>
  </div>
  <div v-else class="flex items-center justify-center my-[300px] ">
      <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  <!-- Pagination -->
  <div class="flex justify-center mt-10">
    <nav class="flex items-center space-x-2 bg-surface px-2 py-1 rounded-full shadow-card">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:text-primary-400 hover:bg-surface-hover transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/axios';

const users = ref([]);
const totalUsers = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const per_page = 10;

const searchQuery = ref('');
const selectedGrade = ref('');
const selectedCampus = ref('');
const loading = ref(false);

const grades = [
  { value: 'sas', label: 'SAS' },
  { value: 'A1', label: '1ère Année' },
  { value: 'A2', label: '2ème Année' },
];

const campuses = [
  { value: 'Youssoufia', label: 'Youssoufia' },
  { value: 'Safi', label: 'Safi' }
];

async function fetchUsers(page = 1) {
  loading.value = true
  try {
    const response = await api.get(`users?page=${page}&per_page=${per_page}`);
    users.value = response.data.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      campus: user.campus || '',
      grade: user.level ? user.level : (user.role === 'student' ? 'std' : 's'),
      profilePicture: user.image || 'https://via.placeholder.com/150'
    }));
    totalUsers.value = response.data.total;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
  } catch (error) {
    console.error('Error fetching users:', error);
  }finally{
    loading.value= false
  }
}

function getBadgeColor(level) {
  const levelLower = (level || '').toLowerCase();
  if (levelLower.includes('sas')) return 'level-sas';
  if (levelLower.includes('1ère') || levelLower.includes('a1')) return 'level-a1';
  if (levelLower.includes('2ème') || levelLower.includes('a2')) return 'level-a2';
  return 'level-default';
}

onMounted(() => {
  fetchUsers();
});

function goToPage(page) {
  if (page !== currentPage.value) {
    fetchUsers(page);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    fetchUsers(currentPage.value + 1);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    fetchUsers(currentPage.value - 1);
  }
}

const displayedPages = computed(() => {
  const pages = [];
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage.value > 3) {
      pages.push('...');
    }
    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(totalPages.value - 1, currentPage.value + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage.value < totalPages.value - 2) {
      pages.push('...');
    }
    pages.push(totalPages.value);
  }
  return pages;
});
</script>

<style>
.level-sas {
  background: linear-gradient(135deg, #4c1d95, #7c3aed);
  color: white;
}

.level-a1 {
  background: linear-gradient(135deg, #b45309, #f59e0b);
  color: white;
}

.level-a2 {
  background: linear-gradient(135deg, #0369a1, #dee90e);
  color: white;
}

.level-default {
  background: linear-gradient(135deg, #b45309, #f59e0b);
  color: white;
}

.level-badge {
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.level-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: inherit;
  filter: blur(8px);
  opacity: 0.4;
  z-index: -1;
}
</style>