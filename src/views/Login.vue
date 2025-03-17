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
          
          <!-- Features list -->
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <i class="fas fa-graduation-cap text-white"></i>
              </div>
              <div>
                <h3 class="font-medium">Learning Resources</h3>
                <p class="text-sm opacity-70">Access all your classes, assignments, and study materials</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <i class="fas fa-users text-white"></i>
              </div>
              <div>
                <h3 class="font-medium">Collaborative Community</h3>
                <p class="text-sm opacity-70">Engage with peers and instructors in community forums</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <i class="fas fa-shield-alt text-white"></i>
              </div>
              <div>
                <h3 class="font-medium">Secure Platform</h3>
                <p class="text-sm opacity-70">Enterprise-grade security for all your academic data</p>
              </div>
            </div>
          </div>
          
          <div class="mt-12 text-sm opacity-70">
            <p>© 2025 YouCode. All rights reserved.</p>
          </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-full h-full opacity-20">
          <div class="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div class="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-white/10"></div>
          <div class="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-white/10"></div>
        </div>
      </div>
      
      <!-- Right Side - Login Form -->
      <div class="w-full lg:w-2/5 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <!-- Mobile Logo (visible only on mobile) -->
          <div class="flex lg:hidden justify-center mb-8">
            <img src="@/assets/img/level/logo-white.png" alt="YouCode Logo" class="h-12" />
          </div>
          
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-text-primary mb-1">Sign in to YouCode Intranet</h2>
            <p class="text-text-secondary">Enter your credentials to continue</p>
          </div>
          
          <!-- Login Form -->
          <div class="bg-surface rounded-xl shadow-card p-8">
            <form @submit.prevent="handleLogin">
              <!-- Username field -->
              <div class="mb-5">
                <label class="block text-text-secondary text-sm font-medium mb-2" for="username">
                  Username or Email
                </label>
                <div class="relative">
                  <input 
                    id="username" 
                    v-model="username" 
                    type="text" 
                    class="w-full py-3 px-4 bg-background-element border border-background-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-400" 
                    placeholder="Enter your username"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i class="fas fa-user text-text-muted"></i>
                  </div>
                </div>
              </div>
              
              <!-- Password field -->
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label class="text-text-secondary text-sm font-medium" for="password">
                    Password
                  </label>
                  <a href="#" class="text-sm text-accent-400 hover:text-accent-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
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
              
              <!-- Remember me checkbox -->
              <div class="flex items-center mb-6">
                <input 
                  id="remember-me" 
                  v-model="rememberMe" 
                  type="checkbox" 
                  class="h-4 w-4 rounded border-background-light text-accent-500 focus:ring-accent-400" 
                />
                <label for="remember-me" class="ml-2 text-sm text-text-secondary">
                  Remember me for 30 days
                </label>
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
            
            <div class="mt-6 pt-6 border-t border-background-light text-center text-sm text-text-secondary">
              <p>
                Need help? <a href="#" class="text-accent-400 hover:text-accent-300 transition-colors">Contact support</a>
              </p>
            </div>
          </div>
          
          <!-- Footer info -->
          <div class="mt-8 text-center text-xs text-text-muted">
            <p>YouCode Intranet • Version 4.2.1</p>
            <p class="mt-1">{{ appStore.currentDateTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '../stores/app'
  
  const router = useRouter()
  const appStore = useAppStore()
  
  // Update store with the specified date/time
  appStore.currentDateTime = '2025-03-17 14:11:53'
  appStore.currentUser = 'ridachaanouni'
  
  // Form data
  const username = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const showPassword = ref(false)
  const isLoading = ref(false)
  
  // Handle login form submission
  const handleLogin = () => {
    if (!username.value || !password.value) {
      alert('Please enter both username and password')
      return
    }
    
    isLoading.value = true
    
    // Simulate authentication delay
    setTimeout(() => {
      if (username.value === 'ridachaanouni' || username.value === 'ridachaanouni@youcode.ma') {
        // Update store with current user
        appStore.currentUser = 'ridachaanouni'
        
        // Store in localStorage for persistence
        localStorage.setItem('currentUser', 'ridachaanouni')
        localStorage.setItem('isAuthenticated', 'true')
        
        // Redirect to home page
        router.push('/')
      } else {
        alert('Invalid credentials')
        isLoading.value = false
      }
    }, 1500)
  }
  
  onMounted(() => {
    // Check if already logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (isAuthenticated) {
      router.push('/')
    }
  })
  </script>
  
  <style scoped>
  /* Shadow effects for depth */
  .shadow-card {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  </style>