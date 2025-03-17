<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useAppStore } from './stores/app'
import { useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import Footer from './components/layout/Footer.vue'

const appStore = useAppStore()
const route = useRoute()

// Determine if we're on the login page
const isLoginPage = computed(() => route.path === '/login')

// Setup event listeners
onMounted(() => {
  window.addEventListener('resize', appStore.handleResize)
  
  
  // Uncomment to enable live clock - for now using the fixed time as specified
  // const interval = setInterval(appStore.updateDateTime, 1000)
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
  </div>
</template>