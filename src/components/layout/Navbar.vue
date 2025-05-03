<script setup>
import { ref } from 'vue'
import { useAppStore } from '../../stores/app'
import { useUserStore } from '@/stores/userStore'
import api from '@/axios';
import { useRouter } from 'vue-router';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

const appStore = useAppStore()
const notificationOpen = ref(false)
const profileOpen = ref(false)
const userStore = useUserStore();
const isLoggingOut = ref(false);

import logo from '@/assets/img/level/logo-white.png';

const router = useRouter();

async function handleLogout() {
  try {
    isLoggingOut.value = true;
    
    await api.post('/logout');
    
      document.cookie = 'token=; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;';
      router.push('/login');
    
  } catch (error) {
    console.error('Logout failed:', error);
    isLoggingOut.value = false;
  }
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 bg-surface-active shadow-lg z-50 px-4 sm:px-6 py-3 flex justify-between items-center glass-effect">
    <div class="flex items-center space-x-4">
      <button 
        @click="appStore.toggleSidebar()" 
        class="text-text-primary hover:text-primary-400 transition-colors p-1"
        aria-label="Toggle sidebar"
      >
        <i class="fas fa-bars text-lg"></i>
      </button>
      <router-link to="/"  class="flex items-center space-x-2">
        <img :src="logo" class="max-w-[100px]" alt="YouCode Logo" />
      </router-link>
    </div>
    
    <div class="flex items-center space-x-2 sm:space-x-4">
      <!-- Search -->
      <div class="relative">
        <input 
          v-model="appStore.searchQuery"
          type="text" 
          placeholder="Search..." 
          class="bg-surface rounded-full px-3.5 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400 w-40 sm:w-auto"
        />
        <button class="absolute right-3.5 top-2 text-text-secondary hover:text-primary-400 transition-colors" aria-label="Search">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Date Display -->
      <div class="hidden md:flex items-center text-sm text-text-secondary">
        <i class="far fa-calendar-alt mr-2"></i>
        <span>{{ appStore.currentDateTime }}</span>
      </div>

      <!-- Notifications -->
      <div class="relative">
        <button 
          @click="notificationOpen = !notificationOpen"
          @blur="() => setTimeout(() => notificationOpen = false, 200)"
          class="relative text-text-primary hover:text-primary-400 transition-colors p-2"
          aria-label="Notifications"
        >
          <i class="fas fa-bell text-lg"></i>
          <span class="absolute -top-1 -right-1 bg-secondary-500 text-text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </button>
        
        <div v-if="notificationOpen" class="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-card overflow-hidden z-50 glass-effect">
          <div class="px-4 py-3 border-b border-background-light bg-surface-muted">
            <h3 class="text-sm font-medium text-text-primary">Notifications</h3>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div class="flex items-center justify-center h-32 text-text-muted text-sm">
              No notifications yet
            </div>
          </div>
          <div class="px-4 py-2 border-t border-background-light bg-surface-muted text-center">
            <a href="#" class="text-sm text-primary-400 hover:text-primary-300 font-medium">
              View all notifications
            </a>
          </div>
        </div>
      </div>

      <!-- Profile -->
      <div class="relative">
        <button 
          @click="profileOpen = !profileOpen"
          @blur="() => setTimeout(() => profileOpen = false, 200)"
          class="flex items-center space-x-2 text-text-primary hover:text-primary-400 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-accent-900"
          aria-label="User menu"
        >
          <img 
            :src="userStore.user?.image_url" 
            class="w-8 h-8 rounded-full border-2"
            alt="Rida Chaanoun profile picture"
          />
          <span class="font-medium hidden sm:inline-block">{{ userStore.user?.name }}</span>
          <i class="fas fa-chevron-down text-xs hidden sm:inline-block"></i>
        </button>
        
        <div v-if="profileOpen" class="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-card overflow-hidden z-50 glass-effect">
          <div class="py-1">
            <router-link to="/profile" class="block px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
              <i class="fas fa-user mr-2 text-primary-400"></i> Your Profile
            </router-link>
            <a href="#" class="block px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
              <i class="fas fa-cog mr-2 text-primary-400"></i> Settings
            </a>
            <a href="#" class="block px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
              <i class="fas fa-question-circle mr-2 text-primary-400"></i> Help Center
            </a>
            <div class="border-t border-background-light"></div>
            <a @click="handleLogout" href="#" class="block px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
              <i class="fas fa-sign-out-alt mr-2 text-secondary-400"></i> Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Loading Overlay during logout -->
  <LoadingOverlay :show="isLoggingOut" />
</template>