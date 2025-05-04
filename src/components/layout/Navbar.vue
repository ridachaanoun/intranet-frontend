<script setup>
import { ref, onMounted } from 'vue'
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
const notifications = ref([]);
const unreadNotificationCount = ref(0);
const isLoadingNotifications = ref(false);

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

async function fetchNotifications() {
  if (userStore.user?.role !== 'admin') return;
  
  try {
    isLoadingNotifications.value = true;
    const response = await api.get('/admin/purchase-notifications');
    notifications.value = response.data.notifications || [];
    unreadNotificationCount.value = notifications.value.length;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    notifications.value = [];
  } finally {
    isLoadingNotifications.value = false;
  }
}

function handleNotificationClick() {
  notificationOpen.value = !notificationOpen.value;
  if (notificationOpen.value) {
    // Mark notifications as read when opening the dropdown
    unreadNotificationCount.value = 0;
  }
}

// Fetch notifications on component mount
onMounted(() => {
  if (userStore.user?.role === 'admin') {
    fetchNotifications();
  }
});
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
      <div v-if="userStore.user?.role === 'admin'" class="relative">
        <button 
          @click="handleNotificationClick"
          class="relative text-text-primary hover:text-primary-400 transition-colors p-2"
          aria-label="Notifications"
        >
          <i class="fas fa-bell text-lg"></i>
          <span v-if="unreadNotificationCount > 0" class="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
            {{ unreadNotificationCount > 99 ? '99+' : unreadNotificationCount }}
          </span>
        </button>
        
        <div v-if="notificationOpen" class="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-card overflow-hidden z-50 glass-effect">
          <div class="px-4 py-3 border-b border-background-light bg-surface-muted flex justify-between items-center">
            <h3 class="text-sm font-medium text-text-primary">Purchase Notifications</h3>
            <button 
              @click="fetchNotifications" 
              class="text-primary-400 hover:text-primary-500 transition-colors"
              title="Refresh notifications"
            >
              <i class="fas fa-sync-alt" :class="{ 'animate-spin': isLoadingNotifications }"></i>
            </button>
          </div>
          
          <div v-if="isLoadingNotifications" class="flex justify-center items-center h-32">
            <svg class="animate-spin h-6 w-6 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          
          <div v-else class="max-h-96 overflow-y-auto divide-y divide-background-light">
            <div v-if="notifications.length === 0" class="flex items-center justify-center h-32 text-text-muted text-sm">
              No notifications yet
            </div>
            
            <div 
              v-for="(notification, index) in notifications" 
              :key="index" 
              class="p-4 hover:bg-surface-hover transition-colors"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0 mr-3">
                  <div class="h-8 w-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                    <i class="fas fa-shopping-cart text-accent-500"></i>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-text-primary">{{ notification.message }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="notifications.length > 0" class="px-4 py-2 border-t border-background-light bg-surface-muted text-center">
            <button class="text-sm text-primary-400 hover:text-primary-300 font-medium">
              Mark all as read
            </button>
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

<style scoped>
.min-w-5 {
  min-width: 1.25rem;
}
</style>