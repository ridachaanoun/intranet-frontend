<script setup>
import { useAppStore } from '../../stores/app'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()
</script>

<template>
  <div 
    :class="`fixed top-14 bottom-0 bg-surface shadow-lg transition-all duration-300 z-40 overflow-y-auto glass-effect ${
      appStore.sidebarOpen ? 'w-64' : 'w-20'
    }`"
  >
    <div class="p-4 flex items-center space-x-3 mb-4 border-b border-background-light pb-4">
      <img 
        src="https://ui-avatars.com/api/?name=Rida+Chaanoun&background=00f0c0&color=fff" 
        class="w-10 h-10 rounded-full border-2 border-accent-500"
        alt="User Profile"
      />
      <div v-if="appStore.sidebarOpen">
        <h3 class="font-medium text-text-primary">Rida Chaanoun</h3>
        <p class="text-xs text-text-muted">@{{ appStore.currentUser }}</p>
      </div>
    </div>
    
    <nav class="px-2">
      <router-link to="/" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors"
        :class="{ 'bg-background-element shadow-soft glow-on-hover': $route.path === '/' }">
        <i class="fas fa-home w-6 text-center text-lg" :class="$route.path === '/' ? 'text-primary-400' : 'group-hover:text-primary-400'"></i>
        <span v-if="appStore.sidebarOpen" class="ml-3">Home</span>
      </router-link>
      
      <router-link to="/network" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors"
        :class="{ 'bg-background-element shadow-soft glow-on-hover': $route.path === '/network' }">
        <i class="fas fa-users w-6 text-center text-lg" :class="$route.path === '/network' ? 'text-primary-400' : 'group-hover:text-primary-400'"></i>
        <span v-if="appStore.sidebarOpen" class="ml-3">Network</span>
      </router-link>
      
      <router-link to="/classrooms" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors"
        :class="{ 'bg-background-element shadow-soft glow-on-hover': $route.path === '/classrooms' }">
        <i class="fas fa-chalkboard w-6 text-center text-lg" :class="$route.path === '/classrooms' ? 'text-primary-400' : 'group-hover:text-primary-400'"></i>
        <span v-if="appStore.sidebarOpen" class="ml-3">Classrooms</span>
      </router-link>
      
      <router-link to="/transport" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors"
        :class="{ 'bg-background-element shadow-soft glow-on-hover': $route.path === '/transport' }">
        <i class="fas fa-bus w-6 text-center text-lg" :class="$route.path === '/transport' ? 'text-primary-400' : 'group-hover:text-primary-400'"></i>
        <span v-if="appStore.sidebarOpen" class="ml-3">Transport Booking</span>
      </router-link>
      
      <router-link to="/marketplace" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors relative"
        :class="{ 'bg-background-element shadow-soft glow-on-hover': $route.path === '/marketplace' }">
        <i class="fas fa-store w-6 text-center text-lg" :class="$route.path === '/marketplace' ? 'text-primary-400' : 'group-hover:text-primary-400'"></i>
        <template v-if="appStore.sidebarOpen">
          <span class="ml-3">Marketplace</span>
          <span class="ml-2 bg-secondary-500 text-xs px-2 py-0.5 rounded-full">
            New
          </span>
        </template>
      </router-link>
      
      <div v-if="appStore.sidebarOpen" class="mt-auto border-t border-background-light pt-4 mt-8">
        <h6 class="text-xs uppercase text-text-muted font-semibold px-3 mb-2">Settings</h6>
        <a href="#" class="flex items-center py-2 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors">
          <i class="fas fa-cog w-6 text-center text-lg group-hover:text-primary-400"></i>
          <span class="ml-3">Preferences</span>
        </a>
        <a href="#" class="flex items-center py-2 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors">
          <i class="fas fa-shield-alt w-6 text-center text-lg group-hover:text-primary-400"></i>
          <span class="ml-3">Security</span>
        </a>
      </div>
    </nav>
  </div>
</template>