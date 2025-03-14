<template>
    <div class="bg-surface rounded-xl shadow-card glass-effect overflow-hidden">
      <div class="px-6 py-4 border-b border-background-light">
        <h3 class="font-semibold text-text-primary">All Users</h3>
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
                Class
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
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
                    <img :src="user.avatar" :alt="`${user.name} avatar`">
                  </div>
                  <div>
                    <div class="text-sm font-medium text-text-primary">{{ user.name }}</div>
                    <div class="text-xs text-text-secondary">@{{ user.username }}</div>
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
                {{ user.class }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs rounded-full font-medium" 
                  :class="getStatusBadgeClass(user.status)"
                >
                  {{ formatStatus(user.status) }}
                </span>
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
      
      <!-- Pagination -->
      <div class="px-6 py-3 flex items-center justify-between border-t border-background-light">
        <div class="text-sm text-text-secondary">
          Showing <span class="font-medium">1</span> to <span class="font-medium">{{ users.length }}</span> of <span class="font-medium">248</span> results
        </div>
        <div class="flex space-x-1">
          <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
            Previous
          </button>
          <button class="px-3 py-1 rounded-md bg-accent-600 text-white">
            1
          </button>
          <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
            2
          </button>
          <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
          3
        </button>
        <button class="px-3 py-1 rounded-md bg-background-element text-text-secondary hover:bg-surface-hover transition-colors">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  emits: ['edit-user', 'delete-user'],
  setup() {
    const getRoleBadgeClass = (role) => {
      switch(role) {
        case 'admin': return 'bg-secondary-500/20 text-secondary-400';
        case 'teacher': return 'bg-primary-500/20 text-primary-400';
        case 'student': return 'bg-accent-500/20 text-accent-400';
        default: return 'bg-gray-500/20 text-gray-400';
      }
    };
    
    const getStatusBadgeClass = (status) => {
      switch(status) {
        case 'active': return 'bg-green-500/20 text-green-500';
        case 'inactive': return 'bg-gray-500/20 text-gray-400';
        case 'suspended': return 'bg-red-500/20 text-red-500';
        default: return 'bg-gray-500/20 text-gray-400';
      }
    };
    
    const formatRole = (role) => {
      return role.charAt(0).toUpperCase() + role.slice(1);
    };
    
    const formatStatus = (status) => {
      return status.charAt(0).toUpperCase() + status.slice(1);
    };
    
    return {
      getRoleBadgeClass,
      getStatusBadgeClass,
      formatRole,
      formatStatus
    };
  }
};
</script>