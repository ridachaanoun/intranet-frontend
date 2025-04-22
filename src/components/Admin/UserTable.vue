<template>
  <div class="bg-surface rounded-xl shadow-card glass-effect overflow-hidden" v-if="!loading || users.length > 0">
    <div class="px-6 py-4 border-b border-background-light">
      <div class="flex items-center">
        <h3 class="font-semibold text-text-primary">All Users</h3>
        <svg v-if="loading" class="ml-2 animate-spin h-4 w-4 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-background-light">
        <thead class="bg-background-element">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Classroom
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Campus
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Level
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-background-light">
          <tr 
            v-for="user in users" 
            :key="user.id" 
            class="hover:bg-background-element transition-colors cursor-pointer"
            @click="navigateToProfile(user.id)"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full overflow-hidden mr-3 relative group">
                  <img 
                    :src="user.image_url || defaultAvatar" 
                    :alt="`${user.name} avatar`" 
                    class="h-full w-full object-cover"
                    @click.stop
                  >
                  <label 
                    class="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    title="Change Image"
                    @click.stop
                  >
                    <i class="fas fa-camera"></i>
                    <input 
                      type="file" 
                      class="hidden" 
                      accept="image/*" 
                      @change="(e) => changeUserImage(user, e.target.files[0])"
                      @click.stop
                    >
                  </label>
                </div>
                <div>
                  <div class="text-sm font-medium text-text-primary">{{ user.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-text-primary">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 py-1 text-xs rounded-full font-medium" 
                :class="getRoleBadgeClass(user.role)"
              >
                {{ formatRole(user.role) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
              {{ user.classroom || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
              {{ user.campus || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
              {{ user.level || (user.role === 'student' ? 'std' : 's') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm" @click.stop>
              <!-- Role change dropdown -->
              <div class="inline-block mr-3 relative">
                <button
                  @click="openRoleDropdown(user)"
                  class="text-primary-400 hover:text-primary-300 mr-1"
                  :disabled="isChangingRole === user.id"
                >
                  <i class="fas fa-user-tag" v-if="isChangingRole !== user.id"></i>
                  <i class="fas fa-circle-notch fa-spin" v-else></i>
                </button>
                <div v-if="activeRoleDropdown === user.id" 
                     class="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg overflow-hidden z-10">
                  <div class="py-1">
                    <div class="px-4 py-2 text-xs font-medium text-text-secondary left-0 text-left">Change role to:</div>
                    <button v-for="role in appStore.roles" :key="role.value"
                      @click="changeUserRole(user, role.value)"
                      class="block w-full text-left px-4 py-2 text-sm hover:bg-background-element transition-colors"
                      :class="user.role === role.value ? 'text-accent-400' : 'text-text-primary'"
                      :disabled="user.role === role.value || isChangingRole"
                    >
                      {{ role.label }}
                      <i class="fas fa-check ml-2" v-if="user.role === role.value"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Edit button (only for students) -->
              <button 
                @click="$emit('edit-user', user.id)" 
                class="text-accent-400 hover:text-accent-300 mr-3"
                v-if="user.role === 'student'"
              >
                <i class="fas fa-edit"></i>
              </button>
              
              <!-- Delete button -->
              <button 
                @click="confirmDeleteUser(user)"
                class="text-secondary-400 hover:text-secondary-300"
                :class="{'opacity-50 cursor-not-allowed': isDeleting === user.id}"
                :disabled="isDeleting === user.id"
              >
                <i class="fas fa-trash-alt" v-if="isDeleting !== user.id"></i>
                <i class="fas fa-circle-notch fa-spin" v-else></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Empty state -->
    <div v-if="users.length === 0" class="flex items-center justify-center py-12">
      <div class="text-center text-text-secondary">
        <i class="fas fa-user-slash text-3xl mb-2"></i>
        <p>No users found</p>
      </div>
    </div>
  </div>
  <div v-else class="loading flex items-center justify-center pt-6">
    <svg class="animate-spin h-8 w-8 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  {{ console.log(appStore.roles)
   }}
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import Swal from 'sweetalert2';
import api from '@/axios';

// Get router instance
const router = useRouter();
const appStore = useAppStore();

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['edit-user', 'user-deleted', 'role-changed']);

import defaultAvatar from '@/assets/user.png';
const isDeleting = ref(null); // Track which user is being deleted
const isChangingRole = ref(null); 
const activeRoleDropdown = ref(null); 

const closeDropdowns = () => {
  activeRoleDropdown.value = null;
};

onMounted(() => {
  document.addEventListener('click', closeDropdowns);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns);
});

const openRoleDropdown = (user) => {

  activeRoleDropdown.value = activeRoleDropdown.value === user.id ? null : user.id;
};

// Change user role
const changeUserRole = async (user, newRole) => {
  // Don't do anything if role is the same
  if (user.role === newRole) return;
  
  isChangingRole.value = user.id;
  activeRoleDropdown.value = null;
  
  try {
    await api.put(`/admin/user/${user.id}/role`, { role: newRole });
    
    // Update the user's role locally after successful API call
    const userToUpdate = props.users.find((u) => u.id === user.id);
    if (userToUpdate) {
      userToUpdate.role = newRole;
    }
    
    // Show success message
    await Swal.fire({
      icon: 'success',
      title: 'Role Updated',
      text: `User role has been changed to ${formatRole(newRole)}.`,
      confirmButtonColor: '#3085d6'
    });
    
    // Emit event to parent to refresh the user list
    emit('role-changed', { user: user, newRole });
    
  } catch (error) {
    console.error('Error changing user role:', error);
    
    let errorMessage = 'Failed to update user role. Please try again.';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#d33'
    });
  } finally {
    isChangingRole.value = null;
  }
};

const changeUserImage = async (user, file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post(`/admin/user/${user.id}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Update the user's image_url locally after a successful API call
    const userToUpdate = props.users.find((u) => u.id === user.id);
    if (userToUpdate) {
      userToUpdate.image_url = response.data.image_url;
    }

    await Swal.fire({
      icon: 'success',
      title: 'Image Updated',
      text: 'User image has been updated successfully.',
      confirmButtonColor: '#3085d6',
    });
  } catch (error) {
    console.error('Error uploading user image:', error);

    let errorMessage = 'Failed to upload user image. Please try again.';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#d33',
    });
  }
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin': return 'bg-secondary-500/20 text-secondary-400';
    case 'teacher': return 'bg-primary-500/20 text-primary-400';
    case 'student': return 'bg-accent-500/20 text-accent-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const formatRole = (role) => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

// Navigate to user profile
const navigateToProfile = (userId) => {
  router.push({ name: 'user-profile', params: { id: userId } });
};

// Confirm and handle user deletion
const confirmDeleteUser = async (user) => {
  const result = await Swal.fire({
    title: 'Delete User',
    html: `Are you sure you want to delete <strong>${user.name}</strong>?<br>This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete user',
    cancelButtonText: 'Cancel'
  });

  if (result.isConfirmed) {
    await deleteUser(user.id);
  }
};

const deleteUser = async (userId) => {
  isDeleting.value = userId;
  
  try {
    await api.delete(`/admin/users/${userId}`);
    
    // Show success message
    await Swal.fire({
      icon: 'success',
      title: 'User Deleted',
      text: 'The user has been successfully deleted.',
      confirmButtonColor: '#3085d6'
    });
    
    // Emit event to parent to refresh the user list
    emit('user-deleted', userId);
    
  } catch (error) {
    console.error('Error deleting user:', error);
    
    let errorMessage = 'Failed to delete user. Please try again.';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#d33'
    });
  } finally {
    isDeleting.value = null;
  }
};
</script>

<style scoped>
/* Optional: Add a subtle effect to indicate the row is clickable */
tr.cursor-pointer:hover {
  box-shadow: 0 0 0 1px rgba(var(--color-accent-400), 0.3);
}

/* Add new styles for role dropdown */
.role-dropdown {
  position: absolute;
  right: 0;
  z-index: 10;
  transition: all 0.2s ease;
}
</style>