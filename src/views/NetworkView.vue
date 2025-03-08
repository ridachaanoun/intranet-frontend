<template>
      <!-- Page Header with Improved Design -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="relative">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block">
            YouCode Network
          </h1>
          <div class="h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full w-3/4 mt-1"></div>
        </div>
        <div class="flex items-center space-x-3 mt-4 md:mt-0">
          <div class="glass-effect rounded-full py-2 px-4 flex items-center shadow-glow">
            <span class="text-text-secondary text-sm mr-2">Connected Users:</span>
            <span class="text-primary-400 font-medium text-lg">{{ connectedUsers }}</span>
          </div>
        </div>
      </div>
  
      <!-- Enhanced Filter Bar with Requested Dropdowns -->
      <div class="bg-surface rounded-xl shadow-card p-6 mb-8 glass-effect">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Search Bar with Improved Design -->
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
  
          <!-- Grade Filter Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedGrade" 
              class="appearance-none bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer pr-12"
            >
              <option value="">All Grades</option>
              <option v-for="grade in grades" :key="grade.value" :value="grade.value" class="text-text-secondary">
                {{ grade.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <i class="fas fa-chevron-down text-primary-400"></i>
            </div>
          </div>
  
          <!-- Campus Filter Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedCampus"
              class="appearance-none bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer pr-12"
            >
              <option value="">All Locations</option>
              <option v-for="campus in campuses" :key="campus.value" :value="campus.value" class="text-text-secondary">
                {{ campus.label }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <i class="fas fa-map-marker-alt text-primary-400"></i>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Visual Divider -->
      <div class="flex items-center mb-8">
        <div class="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent flex-grow"></div>
        <div class="px-4">
          <span class="bg-surface rounded-full w-10 h-10 flex items-center justify-center shadow-glow">
            <i class="fas fa-users text-primary-400"></i>
          </span>
        </div>
        <div class="h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent flex-grow"></div>
      </div>
  
      <!-- Network Grid with Improved Card Design and Centered Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Person Card -->
        <div 
          v-for="person in filteredUsers" 
          :key="person.id"
          class="bg-surface rounded-xl shadow-card overflow-hidden hover:shadow-glow transition-all duration-300 card-hover transform hover:-translate-y-1"
        >
          <div class="relative">
            <!-- Top Banner with Badge -->
            <div class="h-10 bg-gradient-to-r from-primary-600 to-primary-700 flex justify-end items-center px-4">
              <span 
                :class="`bg-${person.gradeBadgeColor} text-text-primary text-xs px-2.5 py-1 rounded-full font-medium`"
              >{{ person.grade }}</span>
            </div>
            <!-- Profile Image - Centered -->
            <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
              <div class="w-20 h-20 rounded-xl overflow-hidden border-4 border-surface shadow-lg">
                <img 
                  :src="person.profilePicture" 
                  class="w-full h-full object-cover"
                  :alt="person.name"
                />
              </div>
            </div>
          </div>
          
          <!-- Card Content - Centered -->
          <div class="pt-16 pb-5 px-6 text-center">
            <!-- User Details -->
            <h3 class="text-lg font-medium text-text-primary">{{ person.name }}</h3>
            <p class="text-sm text-primary-400 mb-3">{{ person.email }}</p>
            
            <!-- Campus with Icon - Centered -->
            <div class="flex items-center text-xs text-text-secondary bg-background-element rounded-full px-3 py-1.5 mx-auto">
              <i class="fas fa-map-marker-alt mr-1.5 text-primary-400"></i>
              <span>{{ person.campus }} Campus</span>
            </div>
          </div>
        </div>
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
          
          <template v-for="page in displayedPages" :key="page">
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
          </template>
          
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
  
      <!-- Current Time Display with Updated Information -->
      <div class="mt-10 flex justify-center">
        <div class="bg-surface rounded-full px-4 py-2 flex items-center space-x-4 text-xs text-text-muted glass-effect">
          <div class="flex items-center">
            <i class="far fa-clock mr-2 text-primary-400"></i>
            <span>{{ currentDateTime }}</span>
          </div>
          <div class="w-1 h-1 rounded-full bg-text-muted"></div>
          <div class="flex items-center">
            <i class="far fa-user mr-2 text-primary-400"></i>
            <span>@{{ currentUser }}</span>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/stores/app'
  
  const appStore = useAppStore()
  const sidebarOpen = computed(() => appStore.sidebarOpen)
  
  // Current info
  const currentDateTime = ref('2025-03-08 15:00:24')
  const currentUser = ref('ridachaanoung')
  
  // Network page data
  const connectedUsers = ref(147)
  const searchQuery = ref('')
  const selectedGrade = ref('')
  const selectedCampus = ref('')
  const currentPage = ref(1)
  const totalPages = ref(12)
  const itemsPerPage = ref(8)
  
  // Filter options
  const grades = [
    { value: '0', label: 'Staff' },
    { value: '3', label: 'SAS' },
    { value: '1', label: '1ère Année' },
    { value: '2', label: '2ème Année' },
    { value: '7', label: 'Mini SAS' }
  ]
  
  const campuses = [
    { value: '1', label: 'Youssoufia' },
    { value: '2', label: 'Safi' }
  ]
  
  // User data
  const users = ref([
    {
      id: 1,
      name: 'Mouad Nassri',
      email: 'mouadnassri@youcode.ma',
      campus: 'Youssoufia',
      grade: 'A1',
      gradeValue: '1',
      gradeBadgeColor: 'primary-400',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRazGKny1CSlH3XZGzdceONvBwSZqNVKklLnA&s'
    },
    {
      id: 2,
      name: 'Sara Khalid',
      email: 'sarakhalid@youcode.ma',
      campus: 'Safi',
      grade: 'A2',
      gradeValue: '2',
      gradeBadgeColor: 'secondary-500',
      profilePicture: 'https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg'
    },
    {
      id: 3,
      name: 'Omar Farouq',
      email: 'omarfarouq@youcode.ma',
      campus: 'Youssoufia',
      grade: 'A1',
      gradeValue: '1',
      gradeBadgeColor: 'primary-400',
      profilePicture: 'https://static1.bigstockphoto.com/8/9/3/large1500/398335286.jpg'
    },
    {
      id: 4,
      name: 'Leila Bennani',
      email: 'leilabennani@youcode.ma',
      campus: 'Safi',
      grade: 'SAS',
      gradeValue: '3',
      gradeBadgeColor: 'primary-400',
      profilePicture: 'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg'
    },
    {
      id: 5,
      name: 'Mehdi Alaoui',
      email: 'mehdialaoui@youcode.ma',
      campus: 'Youssoufia',
      grade: 'Staff',
      gradeValue: '0',
      gradeBadgeColor: 'secondary-500',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4xjShh4ynJbrgYrW_aB4lhKSxeMzQ3cO_A&s'
    },
    {
      id: 6,
      name: 'Houda Mzari',
      email: 'houdamzari@youcode.ma',
      campus: 'Youssoufia',
      grade: 'A1',
      gradeValue: '1',
      gradeBadgeColor: 'primary-400',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRIN7vCVCE559ulSYLXPZUDYB8kp6QK4pcw&s'
    },
    {
      id: 7,
      name: 'Youssef Elazzouzi',
      email: 'youssefela@youcode.ma',
      campus: 'Safi',
      grade: 'A2',
      gradeValue: '2',
      gradeBadgeColor: 'secondary-500',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFEPgAIXA0-oJhhCnA8SLtiiggUpOOSPn_w&s'
    },
    {
      id: 8,
      name: 'Amina Tazi',
      email: 'aminatazi@youcode.ma',
      campus: 'Safi',
      grade: 'Mini SAS',
      gradeValue: '7',
      gradeBadgeColor: 'primary-400',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2DFkEQQFyU0vPOZoUP4mMyMGEjYycTfb3A&s'
    },
  ])
  
  // Filtering users based on search, grade, and campus
  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      const matchesSearch = searchQuery.value === '' || 
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        
      const matchesGrade = selectedGrade.value === '' || 
        user.gradeValue === selectedGrade.value
        
      const matchesCampus = selectedCampus.value === '' || 
        (selectedCampus.value === '1' && user.campus === 'Youssoufia') ||
        (selectedCampus.value === '2' && user.campus === 'Safi')
        
      return matchesSearch && matchesGrade && matchesCampus
    }).slice(0, itemsPerPage.value)
  })
  
  // Pagination helpers
  const displayedPages = computed(() => {
    const pages = []
    
    if (totalPages.value <= 7) {
      // If we have less than 7 pages, show all
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      // Always add first page
      pages.push(1)
      
      // Add dots if current page is > 3
      if (currentPage.value > 3) {
        pages.push('...')
      }
      
      // Add pages around current page
      const start = Math.max(2, currentPage.value - 1)
      const end = Math.min(totalPages.value - 1, currentPage.value + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add dots if current page is < totalPages - 2
      if (currentPage.value < totalPages.value - 2) {
        pages.push('...')
      }
      
      // Always add last page if we have more than 1 page
      if (totalPages.value > 1) {
        pages.push(totalPages.value)
      }
    }
    
    return pages
  })
  
  // Pagination methods
  const goToPage = (page) => {
    currentPage.value = page
  }
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  </script>