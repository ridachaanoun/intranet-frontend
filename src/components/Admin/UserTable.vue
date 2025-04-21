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
          <tr v-for="user in users" :key="user.id" class="hover:bg-background-element transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img :src="user.image_url || defaultAvatar" :alt="`${user.name} avatar`">
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
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <button 
                @click="$emit('edit-user', user.id)" 
                class="text-accent-400 hover:text-accent-300 mr-3"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button 
                @click="$emit('delete-user', user.id)" 
                class="text-secondary-400 hover:text-secondary-300"
              >
                <i class="fas fa-trash-alt"></i>
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
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  users: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
});

defineEmits(['edit-user', 'delete-user']);

const defaultAvatar = 'https://via.placeholder.com/150';

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
</script>