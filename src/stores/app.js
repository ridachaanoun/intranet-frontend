import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State with updated information
  const sidebarOpen = ref(window.innerWidth > 768)
  const searchQuery = ref('')
  const isMobile = ref(window.innerWidth < 768)
  const currentUser = ref('ridachaanoun')
  const currentDateTime = ref('2025-03-08 12:47:57') // Updated date/time
  const campuses = [
    { value: 'Youssoufia', label: 'Youssoufia' },
    { value: 'Safi', label: 'Safi' },
  ];
  
  const levels = [
    { value: '1ère Année', label: '1ère Année' },
    { value: '2ème Année', label: '2ème Année' },
    { value: 'SAS', label: 'SAS' },
  ];

  const roles = [
    {value: 'admin', label: 'Admin'},
    {value: 'student', label: 'Student'},
    {value: 'teacher', label: 'Teacher'}
  ]

  const grades = [
    { value: 'SAS', label: 'SAS' },
    { value: 'A1', label: '1ère Année' },
    { value: 'A2', label: '2ème Année' },
  ];
  // Actions
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  function updateSearchQuery(query) {
    searchQuery.value = query
  }
  
  function handleResize() {
    const width = window.innerWidth
    isMobile.value = width < 768
    if (width < 768) {
      sidebarOpen.value = false
    }
  }
  
  function updateDateTime() {
    const now = new Date()
    currentDateTime.value = now.getUTCFullYear() + '-' + 
                  String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
                  String(now.getUTCDate()).padStart(2, '0') + ' ' +
                  String(now.getUTCHours()).padStart(2, '0') + ':' +
                  String(now.getUTCMinutes()).padStart(2, '0') + ':' +
                  String(now.getUTCSeconds()).padStart(2, '0')
  }

  return { 
    sidebarOpen,
    searchQuery,
    isMobile, 
    currentUser,
    currentDateTime,
    toggleSidebar,
    updateSearchQuery,
    handleResize,
    updateDateTime,
    levels,
    campuses,
    roles,
    grades,
  }
})