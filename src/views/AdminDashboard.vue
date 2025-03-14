<template>
  <div class="admin-dashboard min-h-screen bg-background">
    <!-- Admin Dashboard Layout -->
    <div class="flex">
      <!-- Main Content - Removed ml-64 class since sidebar is gone -->
      <div class="flex-1 p-8">
        <!-- Header Bar -->
        <AdminHeader :section-title="sectionTitle" />

        <!-- Navigation Tabs - Added to replace sidebar navigation -->
        <div class="mb-8 mt-4">
          <div class="flex overflow-x-auto space-x-1 bg-surface rounded-xl p-1 glass-effect">
            <button 
              @click="activeSection = 'dashboard'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'dashboard', 'text-text-secondary': activeSection !== 'dashboard'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span>DASHBOARD</span>
            </button>
            <button 
              @click="activeSection = 'users'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'users', 'text-text-secondary': activeSection !== 'users'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-users"></i>
              <span>USERS</span>
            </button>
            <button 
              @click="activeSection = 'classes'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'classes', 'text-text-secondary': activeSection !== 'classes'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-chalkboard"></i>
              <span>CLASSES</span>
            </button>
          </div>
        </div>

        <!-- Dynamic Content Based on Active Section -->
        <DashboardOverview 
          v-if="activeSection === 'dashboard'" 
          class="fade-in"
          @add-user="showAddUserModal = true"
          @add-class="showAddClassModal = true"
        />
        <UsersManagement 
          v-if="activeSection === 'users'" 
          class="fade-in" 
          @add-user="showAddUserModal = true" 
        />
        <ClassesManagement 
          v-if="activeSection === 'classes'" 
          class="fade-in" 
          @add-class="showAddClassModal = true" 
        />

        <!-- Current user and time info -->
        <div class="mt-8 text-right text-xs text-text-secondary">
          <p>Current User: @{{ currentUser }}</p>
          <p>Last updated: {{ currentDateTime }}</p>
        </div>
      </div>
    </div>
    
    <!-- Modals -->
    <AddUserModal 
      v-if="showAddUserModal" 
      @close="showAddUserModal = false" 
      @add-user="handleAddUser"
    />
    
    <AddClassModal 
      v-if="showAddClassModal" 
      @close="showAddClassModal = false" 
      @add-class="handleAddClass"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import DashboardOverview from '@/components/admin/DashboardOverview.vue';
import UsersManagement from '@/components/admin/UsersManagement.vue';
import ClassesManagement from '@/components/admin/ClassesManagement.vue';
import AddUserModal from '@/components/admin/AddUserModal.vue';
import AddClassModal from '@/components/admin/AddClassModal.vue';
import { useAppStore } from '@/stores/app';

export default {
  name: 'AdminDashboard',
  components: {
    AdminHeader,
    DashboardOverview,
    UsersManagement,
    ClassesManagement,
    AddUserModal,
    AddClassModal
  },
  setup() {
    // Get store reference
    const appStore = useAppStore();
    
    // Set the current date/time
    appStore.currentDateTime ;
    appStore.currentUser ;
    
    // Active section state
    const activeSection = ref('dashboard');
    
    // Modal states
    const showAddUserModal = ref(false);
    const showAddClassModal = ref(false);
    
    // Current user and date/time from store
    const currentUser = computed(() => appStore.currentUser);
    const currentDateTime = computed(() => appStore.currentDateTime);
    
    // Computed properties
    const sectionTitle = computed(() => {
      switch(activeSection.value) {
        case 'dashboard': return 'Admin Dashboard';
        case 'users': return 'User Management';
        case 'classes': return 'Class Management';
        default: return 'Admin Dashboard';
      }
    });
    
    // Methods
    const handleAddUser = (userData) => {
      console.log('Adding new user:', userData);
      // API call would go here
      showAddUserModal.value = false;
      alert('User added successfully!');
    };
    
    const handleAddClass = (classData) => {
      console.log('Adding new class:', classData);
      // API call would go here
      showAddClassModal.value = false;
      alert('Class added successfully!');
    };
    
    return {
      activeSection,
      showAddUserModal,
      showAddClassModal,
      sectionTitle,
      currentUser,
      currentDateTime,
      handleAddUser,
      handleAddClass
    };
  }
};
</script>

<style scoped>
/* Fade in animation */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Add some additional styling for the navigation tabs */
.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}
</style>