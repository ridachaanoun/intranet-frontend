import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State with updated information
  const sidebarOpen = ref(window.innerWidth > 768)
  const searchQuery = ref('')
  const isMobile = ref(window.innerWidth < 768)
  const currentUser = ref('ridachaanoun')
  const currentDateTime = ref('2025-03-08 12:47:57') // Updated date/time
  
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
    updateDateTime
  }
})