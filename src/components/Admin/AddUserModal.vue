<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/70" @click="$emit('close')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-surface rounded-xl shadow-lg glass-effect w-full max-w-md mx-4 p-6 fade-in">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-text-primary">Add New User</h3>
          <button @click="$emit('close')" class="text-text-secondary hover:text-accent-400 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitForm">
          <div class="space-y-4">
            <!-- First Name & Last Name -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">First Name</label>
                <input 
                  v-model="formData.firstName"
                  type="text" 
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                  required
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Last Name</label>
                <input 
                  v-model="formData.lastName"
                  type="text" 
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                  required
                >
              </div>
            </div>
            
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input 
                v-model="formData.email"
                type="email" 
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
            </div>
            
            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Username</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-text-muted">@</span>
                <input 
                  v-model="formData.username"
                  type="text" 
                  class="w-full bg-background-element border border-background-light rounded-lg pl-8 pr-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                  required
                >
              </div>
            </div>
            
            <!-- Role -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Role</label>
              <select 
                v-model="formData.role"
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
                <option value="">Select a role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <!-- Class (if student) -->
            <div v-if="formData.role === 'student'">
              <label class="block text-sm font-medium text-text-secondary mb-1">Class</label>
              <select 
                v-model="formData.class"
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
                <option value="">Select a class</option>
                <option value="Aliens">Aliens</option>
                <option value="Web Warriors">Web Warriors</option>
                <option value="Data Masters">Data Masters</option>
              </select>
            </div>
            
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Password</label>
              <input 
                v-model="formData.password"
                type="password" 
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
            </div>
            
            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Confirm Password</label>
              <input 
                v-model="formData.confirmPassword"
                type="password" 
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
              <div v-if="passwordError" class="mt-1 text-red-500 text-xs">
                {{ passwordError }}
              </div>
            </div>
  
            <!-- Timestamp -->
            <div class="text-xs text-text-muted text-right">
              {{ currentDateTime }}
            </div>
          </div>
          
          <div class="mt-6 flex justify-end space-x-3">
            <button 
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-element transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAppStore } from '@/stores/app';
  
  export default {
    name: 'AddUserModal',
    emits: ['close', 'add-user'],
    setup(props, { emit }) {
      const appStore = useAppStore();
      const currentDateTime = ref('2025-03-13 14:12:04'); // Using the provided static time
  
      const formData = ref({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        role: '',
        class: '',
        password: '',
        confirmPassword: ''
      });
      
      const passwordError = ref('');
      
      const submitForm = () => {
        // Validate passwords match
        if (formData.value.password !== formData.value.confirmPassword) {
          passwordError.value = 'Passwords do not match';
          return;
        }
        
        passwordError.value = '';
        
        // Emit event with form data
        emit('add-user', { 
          ...formData.value, 
          timestamp: currentDateTime.value,
          createdBy: 'ridachaanoun' // Using the provided username
        });
      };
      
      return {
        formData,
        passwordError,
        currentDateTime,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>