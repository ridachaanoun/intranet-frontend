<template>
  <div class="fixed top-14 bottom-0 bg-surface shadow-lg z-40 overflow-y-auto glass-effect">
    <!-- Admin Info -->
    <div class="p-4 flex items-center space-x-3 mb-4 border-b border-background-light pb-4">
      <img 
        src="https://ui-avatars.com/api/?name=Admin&background=ff5c2b&color=fff" 
        class="w-10 h-10 rounded-full border-2 border-secondary-500"
        alt="Admin Profile"
      >
      <div v-show="sidebarOpen" class="transition-all duration-200">
        <h3 class="font-medium text-text-primary">Admin Panel</h3>
        <p class="text-xs text-text-muted">@{{ currentUser }}</p>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="px-4">
      <div class="mb-6">
        <h6 v-show="sidebarOpen" class="text-xs uppercase text-text-muted font-semibold px-3 mb-2 transition-all duration-200">Management</h6>
        
        <router-link to="/admindashboard" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors" exact-active-class="bg-background-element shadow-soft glow-on-hover">
          <i class="fas fa-tachometer-alt w-6 text-center text-lg group-hover:text-accent-400"></i>
          <span v-show="sidebarOpen" class="ml-3 transition-all duration-200">Dashboard</span>
        </router-link>
        
        <router-link to="/admindashboard/users" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors" active-class="bg-background-element shadow-soft glow-on-hover">
          <i class="fas fa-users w-6 text-center text-lg group-hover:text-accent-400"></i>
          <span v-show="sidebarOpen" class="ml-3 transition-all duration-200">Users</span>
        </router-link>
        
        <router-link to="/admindashboard/classes" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors" active-class="bg-background-element shadow-soft glow-on-hover">
          <i class="fas fa-chalkboard w-6 text-center text-lg group-hover:text-accent-400"></i>
          <span v-show="sidebarOpen" class="ml-3 transition-all duration-200">Classes</span>
        </router-link>
      </div>
      
      <div class="mb-6">
        <h6 v-show="sidebarOpen" class="text-xs uppercase text-text-muted font-semibold px-3 mb-2 transition-all duration-200">System</h6>
        
        <router-link to="/admindashboard/settings" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors" active-class="bg-background-element shadow-soft glow-on-hover">
          <i class="fas fa-cog w-6 text-center text-lg group-hover:text-accent-400"></i>
          <span v-show="sidebarOpen" class="ml-3 transition-all duration-200">Settings</span>
        </router-link>

        <!-- Back to User Area -->
        <router-link to="/" class="flex items-center py-3 px-3 mb-1 rounded-lg text-text-primary hover:bg-surface-hover group transition-colors mt-8">
          <i class="fas fa-arrow-left w-6 text-center text-lg group-hover:text-accent-400"></i>
          <span v-show="sidebarOpen" class="ml-3 transition-all duration-200">Back to Site</span>
        </router-link>
      </div>
    </nav>
    
    <!-- Current Time at bottom of sidebar -->
    <div v-show="sidebarOpen" class="absolute bottom-4 left-0 right-0 text-center text-xs text-text-muted transition-all duration-200">
      {{ currentDateTime }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'AdminSidebar',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const appStore = useAppStore();
    
    const currentUser = computed(() => appStore.currentUser);
    const currentDateTime = computed(() => appStore.currentDateTime);
    
    return {
      currentUser,
      currentDateTime
    };
  }
};
</script>