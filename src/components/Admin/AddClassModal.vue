<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/70" @click="$emit('close')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-surface rounded-xl shadow-lg glass-effect w-full max-w-md mx-4 p-6 fade-in">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-text-primary">Add New Class</h3>
          <button @click="$emit('close')" class="text-text-secondary hover:text-accent-400 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="submitForm">
          <div class="space-y-4">
            <!-- Class Name -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Class Name</label>
              <input 
                v-model="formData.name"
                type="text" 
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
            </div>
            
            <!-- Level -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Level</label>
              <select 
                v-model="formData.level"
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
                <option value="">Select a level</option>
                <option value="1ère Année">1ère Année</option>
                <option value="2ème Année">2ème Année</option>
              </select>
            </div>
            
            <!-- Icon and Color -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Icon</label>
                <select 
                  v-model="formData.icon"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                  required
                >
                  <option value="fas fa-laptop-code">💻 Laptop</option>
                  <option value="fas fa-code">⌨️ Code</option>
                  <option value="fas fa-database">🗄️ Database</option>
                  <option value="fas fa-mobile-alt">📱 Mobile</option>
                  <option value="fas fa-cloud">☁️ Cloud</option>
                  <option value="fas fa-brain">🧠 AI</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Color Theme</label>
                <select 
                  v-model="formData.color"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                  required
                >
                  <option value="primary">Blue</option>
                  <option value="accent">Teal</option>
                  <option value="secondary">Orange</option>
                </select>
              </div>
            </div>
            
            <!-- Teacher -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Teacher</label>
              <select 
                v-model="formData.teacher"
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
                <option value="">Select a teacher</option>
                <option value="Said Aabilla">Said Aabilla</option>
                <option value="Sarah Moukrim">Sarah Moukrim</option>
                <option value="Abdelhafid Belfqir">Abdelhafid Belfqir</option>
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
                <option value="Youssoufia">Youssoufia</option>
                <option value="Safi">Safi</option>
              </select>
            </div>
            
            <!-- Promotion -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Promotion</label>
              <input 
                v-model="formData.promotion"
                type="text" 
                placeholder="e.g. 2024-2025"
                class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              >
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
              Add Class
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
    name: 'AddClassModal',
    emits: ['close', 'add-class'],
    setup(props, { emit }) {
      const appStore = useAppStore();
      const currentDateTime = ref('2025-03-13 14:12:04'); // Using the provided static time
      
      const formData = ref({
        name: '',
        level: '',
        teacher: '',
        campus: '',
        promotion: '',
        icon: 'fas fa-laptop-code',
        color: 'primary',
        students: 0
      });
      
      const submitForm = () => {
        // Emit event with form data
        emit('add-class', { 
          ...formData.value, 
          timestamp: currentDateTime.value,
          createdBy: 'ridachaanoun' // Using the provided username
        });
      };
      
      return {
        formData,
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