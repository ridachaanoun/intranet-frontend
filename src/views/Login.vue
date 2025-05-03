<template>
  <div class="min-h-screen flex bg-gradient-to-br from-background-dark to-background">
    <!-- Left Side - Illustration/Brand -->
    <div class="hidden lg:flex lg:flex-1 items-center justify-center bg-gradient-to-br from-accent-800 to-primary-800 p-8 relative overflow-hidden">
      <!-- Logo and taglines on the left -->
      <div class="relative z-10 text-white max-w-lg">
        <div class="mb-12">
          <img src="@/assets/img/level/logo-white.png" alt="YouCode Logo" class="h-16 mb-8" />
          <h1 class="text-4xl font-bold mb-4">Welcome to YouCode Intranet</h1>
          <p class="text-lg opacity-80">Your centralized platform for courses, resources, and community interaction.</p>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-2/5 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-text-primary mb-1">Sign in to YouCode Intranet</h2>
          <p class="text-text-secondary">Enter your credentials to continue</p>
        </div>

        <!-- Login Form -->
        <div class="bg-surface rounded-xl shadow-card p-8">
          <form @submit.prevent="handleLogin">
            <!-- Display error messages -->
            <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">
              {{ errorMessage }}
            </div>

            <!-- Email field -->
            <div class="mb-5">
              <label class="block text-text-secondary text-sm font-medium mb-2" for="email">
                Email
              </label>
              <div class="relative">
                <input 
                  id="email" 
                  v-model="email" 
                  type="email" 
                  class="w-full py-3 px-4 bg-background-element border border-background-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400" 
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <!-- Password field -->
            <div class="mb-6">
              <label class="text-text-secondary text-sm font-medium" for="password">
                Password
              </label>
              <div class="relative">
                <input 
                  id="password" 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  class="w-full py-3 px-4 bg-background-element border border-background-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400" 
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-secondary"
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- Submit button -->
            <button 
              type="submit" 
              class="w-full py-3 px-4 bg-accent-600 hover:bg-accent-500 text-white rounded-lg font-medium transition-colors"
              :class="{ 'opacity-75 cursor-not-allowed': isLoading }"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/axios'
import router from '@/router'

// Form data
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''; // Clear previous error messages

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password.';
    return;
  }

  isLoading.value = true;

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    const { token } = response.data;

    // Save token in cookies
    document.cookie = `token=${token}; path=/`;

    // Redirect to home page
    router.push('/');
  } catch (error) {
    // Show error above inputs
    errorMessage.value = 'Invalid credentials or an error occurred.';
  }
};
</script>

<style scoped>
.shadow-card {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>