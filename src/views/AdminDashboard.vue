<template>
  <div class="admin-dashboard min-h-screen bg-background">
    <!-- Admin Dashboard Layout -->
    <div class="flex">
      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Header Bar -->
        <AdminHeader :section-title="sectionTitle" />

        <!-- Navigation Tabs -->
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
          :recentActivities="recentActivities"
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
        <div class="mt-8 text-right text-xs text-text-secondary" v-if="currentUser">
          <p>Current Admin: @{{ currentUser }}</p>
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

<script setup>
import { ref, computed } from 'vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import DashboardOverview from '@/components/admin/DashboardOverview.vue';
import UsersManagement from '@/components/admin/UsersManagement.vue';
import ClassesManagement from '@/components/admin/ClassesManagement.vue';
import AddUserModal from '@/components/admin/AddUserModal.vue';
import AddClassModal from '@/components/admin/AddClassModal.vue';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/userStore';

const appStore = useAppStore();
const userStore = useUserStore(); 

const recentActivities = ref([])

// Active section state
const activeSection = ref('dashboard');

userStore.fetchUserData();

const showAddUserModal = ref(false);
const showAddClassModal = ref(false);

const currentUser = computed(() => userStore.user?.role);

// Computed properties
const sectionTitle = computed(() => {
  switch (activeSection.value) {
    case 'dashboard':
      return 'Admin Dashboard';
    case 'users':
      return 'User Management';
    case 'classes':
      return 'Class Management';
    default:
      return 'Admin Dashboard';
  }
});


const handleAddUser = (payload) => {
  const user = payload?.user || payload;
  console.log('User added:', user);
  showAddUserModal.value = false;

  recentActivities.value.unshift({
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    type: 'user-add',
    icon: 'fas fa-user-plus',
    iconBg: 'bg-primary-500/20',
    iconColor: 'text-primary-400',
    message: `New user <span class="font-medium">${user?.name || 'Unknown'}</span> added`,
    time: 'Just now'
  });
  saveActivities();
};

const handleAddClass = (classData) => {
  console.log('Class added:', classData);
  showAddClassModal.value = false;
};

const saveActivities = () => {
    localStorage.setItem('recentActivities', JSON.stringify(recentActivities.value));
  };

const loadActivities = () => {
  const storedActivities = localStorage.getItem('recentActivities');
  if (storedActivities) {
    recentActivities.value = JSON.parse(storedActivities);
  }
};

loadActivities();

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