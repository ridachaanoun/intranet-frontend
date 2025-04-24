<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useAppStore } from './stores/app'
import { useUserStore } from './stores/userStore'
import { useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import Footer from './components/layout/Footer.vue'
import LoadingOverlay from './components/common/LoadingOverlay.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()

// Determine if we're on the login page
const isLoginPage = computed(() => route.path === '/login')

// Setup event listeners
onMounted(() => {
  window.addEventListener('resize', appStore.handleResize)
  
  // Uncomment to enable live clock - for now using the fixed time as specified
  appStore.updateDateTime()
  const interval = setInterval(appStore.updateDateTime, 1000)
  onUnmounted(() => clearInterval(interval))
})

onUnmounted(() => {
  window.removeEventListener('resize', appStore.handleResize)
})
</script>

<template>
  <!-- For login page, just show the router view without layout components -->
  <router-view v-if="isLoginPage" />
  

  
  <!-- For other pages, show the full layout -->
  <div v-else class="text-text-primary min-h-screen">
    <Navbar />
    <Sidebar />
    
    <main 
      :class="`pt-16 px-4 sm:px-6 lg:px-8 pb-8 transition-all duration-300 mt-12 ${
        appStore.sidebarOpen ? 'ml-64' : 'ml-20'
      }`"
    >
      <router-view />
      <Footer />
    </main>
    <!-- Loading overlay that shows when user data is loading -->
    <LoadingOverlay :show="userStore.isLoading" />
  </div>

</template>