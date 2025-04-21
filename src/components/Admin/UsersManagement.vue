<template>
  <div>
    <!-- Action Bar -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-2">
        <button 
          @click="$emit('add-user')" 
          class="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <i class="fas fa-plus mr-2"></i>
          <span>Add User</span>
        </button>
        <select 
          v-model="selectedRole"
          @change="setFilter('role', selectedRole)"
          class="bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
        >
          <option value="">All Roles</option>
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
        <select 
          v-model="selectedCampus"
          @change="setFilter('campus', selectedCampus)"
          class="bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
        >
          <option value="">All Campuses</option>
          <option v-for="campus in campuses" :key="campus" :value="campus.value">
            {{ campus.label }}
          </option>
        </select>
        <select 
          v-model="selectedLevel"
          @change="setFilter('level', selectedLevel)"
          class="bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
        >
          <option value="">All Levels</option>
          <option v-for="level in levels" :key="level.value" :value="level.value">
            {{ level.label }}
          </option>
        </select>
      </div>
      <div class="relative">
        <input 
          v-model="searchQuery"
          @input="debouncedSearch"
          type="text" 
          placeholder="Search users..." 
          class="bg-surface border border-background-light rounded-lg px-4 py-2 pl-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400 w-64"
        >
        <i class="fas fa-search absolute left-3 top-3 text-text-muted"></i>
      </div>
    </div>

    <!-- Users Table -->
    <UserTable 
      :users="users" 
      :loading="loading"
      @edit-user="editUser" 
      @delete-user="deleteUser" 
    />

    <!-- Add EditUserModal -->
    <EditUserModal
      v-if="editingUser"
      :user="editingUser"
      @close="editingUser = null"
    />

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button 
        @click="setPage(pagination.current_page - 1)" 
        :disabled="pagination.current_page === 1"
        class="px-4 py-2 bg-background-element hover:bg-surface-hover text-text-primary rounded-lg"
      >
        Previous
      </button>
      <p class="text-sm text-text-secondary">
        Page {{ pagination.current_page }} of {{ pagination.last_page }}
      </p>
      <button 
        @click="setPage(pagination.current_page + 1)" 
        :disabled="pagination.current_page === pagination.last_page"
        class="px-4 py-2 bg-background-element hover:bg-surface-hover text-text-primary rounded-lg"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import { useAppStore } from '@/stores/app';
import UserTable from './UserTable.vue';
import EditUserModal from './EditUserModal.vue'; // Import the EditUserModal

defineEmits(['add-user']);

const usersStore = useUsersStore();
const appStore = useAppStore();

const searchQuery = ref('');

const users = computed(() => usersStore.users);
const loading = computed(() => usersStore.loading);
const pagination = computed(() => usersStore.pagination);
const filters = usersStore.filters
const roles = appStore.roles;
const campuses = appStore.campuses;
const levels = appStore.grades;

const selectedRole = filters.role
const selectedCampus = filters.campus;
const selectedLevel = filters.level;

const editingUser = ref(null);

const editUser = (userId) => {
  // Find the user by ID
  const userToEdit = users.value.find(user => user.id === userId);
  if (userToEdit) {
    editingUser.value = userToEdit;    
  }
};

let debounceTimeout;
const debouncedSearch = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    setFilter('query', searchQuery.value);
  }, 2000);
};

const setFilter = (key, value) => {
  usersStore.setFilter(key, value);
};

const setPage = (page) => {
  usersStore.setPage(page);
};

const deleteUser = (userId) => {
  console.log('Delete user with ID:', userId);

};

usersStore.fetchUsers();
</script>