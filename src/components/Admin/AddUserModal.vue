<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-black/70" 
      @click="!loading && $emit('close')" 
    ></div>

    <!-- Modal Content -->
    <div class="relative bg-surface rounded-xl shadow-lg glass-effect w-full max-w-md mx-4 p-6 fade-in">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-text-primary">Add New User</h3>
        <button 
          @click="!loading && $emit('close')" 
          class="text-text-secondary hover:text-accent-400 transition-colors" 
          :disabled="loading"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Name</label>
            <input 
              v-model="formData.name"
              type="text" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
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

          <!-- Role -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Role</label>
            <select 
              v-model="formData.role"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="">Select a role</option>
              <option 
                v-for="role in roles" 
                :key="role.value" 
                :value="role.value"
              >
                {{ role.label }}
              </option>
            </select>
          </div>

          <!-- Campus -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Campus</label>
            <select 
              v-model="formData.campus"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="">Select a campus</option>
              <option 
                v-for="campus in campuses" 
                :key="campus.value" 
                :value="campus.value"
              >
                {{ campus.label }}
              </option>
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
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button 
            type="button"
            @click="!loading && $emit('close')" 
            class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-element transition-colors"
            :disabled="loading"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="loading" class="loader mr-2"></span>
            <span v-if="!loading">Add User</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app'; 
import Swal from 'sweetalert2'; 
import api from '@/axios';

const emit = defineEmits(['close', 'add-user']); 

// Access data from the app store
const appStore = useAppStore();
const campuses = appStore.campuses;
const roles = appStore.roles;

const formData = ref({
  name: '',
  email: '',
  role: '',
  campus: '',
  password: '',
  confirmPassword: ''
});
const passwordError = ref('');
const loading = ref(false); 

const submitForm = async () => {
  // Validate passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    passwordError.value = 'Passwords do not match';
    return;
  }

  passwordError.value = '';
  loading.value = true; 

  try {
    // API call to register the user
    const response = await api.post('http://localhost:8000/api/register', {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      role: formData.value.role,
      campus: formData.value.campus
    });

    // Show success message 
    await Swal.fire({
      icon: 'success',
      title: 'User Added',
      text: 'The user has been added successfully!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    // Emit success event and close modal
    emit('add-user', response.data);
  } catch (error) {
    console.error('Error adding user:', error.response?.data || error.message);

    // Show error message using SweetAlert2
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add user. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  } finally {
    loading.value = false; 
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

.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>