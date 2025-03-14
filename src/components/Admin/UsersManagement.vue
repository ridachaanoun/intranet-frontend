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
          <button class="bg-background-element hover:bg-surface-hover text-text-primary px-4 py-2 rounded-lg flex items-center transition-colors">
            <i class="fas fa-filter mr-2"></i>
            <span>Filter</span>
          </button>
        </div>
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search users..." 
            class="bg-surface border border-background-light rounded-lg px-4 py-2 pl-10 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400 w-64"
          >
          <i class="fas fa-search absolute left-3 top-3 text-text-muted"></i>
        </div>
      </div>
  
      <!-- Users Table -->
      <UserTable :users="filteredUsers" @edit-user="editUser" @delete-user="deleteUser" />
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import UserTable from './UserTable.vue';
  
  export default {
    name: 'UsersManagement',
    components: {
      UserTable
    },
    emits: ['add-user'],
    setup() {
      const searchQuery = ref('');
      
      const users = ref([
        {
          id: 1,
          name: 'Rida Chaanoun',
          username: 'ridachaanoun',
          email: 'ridachaanoun@youcode.ma',
          role: 'student',
          class: 'Aliens',
          status: 'active',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          id: 2,
          name: 'Said Aabilla',
          username: 'saidaabilla',
          email: 'saidaabilla@youcode.ma',
          role: 'teacher',
          class: 'Aliens, Web Warriors',
          status: 'active',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
          id: 3,
          name: 'Fatima Zahra',
          username: 'fatimazahra',
          email: 'fatimazahra@youcode.ma',
          role: 'student',
          class: 'Aliens',
          status: 'active',
          avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
        }
      ]);
      
      const filteredUsers = computed(() => {
        if (!searchQuery.value) return users.value;
        
        const query = searchQuery.value.toLowerCase();
        return users.value.filter(user => 
          user.name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query) ||
          user.class.toLowerCase().includes(query)
        );
      });
      
      const editUser = (userId) => {
        console.log('Edit user with ID:', userId);
        // Implementation would go here
      };
      
      const deleteUser = (userId) => {
        console.log('Delete user with ID:', userId);
        // Implementation would go here
      };
      
      return {
        searchQuery,
        filteredUsers,
        editUser,
        deleteUser
      };
    }
  };
  </script>