<template>
    <div class="bg-surface rounded-xl shadow-card glass-effect overflow-hidden card-hover">
      <!-- Class Header -->
      <div 
        class="h-32 relative p-6"
        :class="`bg-gradient-to-r from-${classData.color}-700 to-${classData.color}-500`"
      >
        <h3 class="font-bold text-xl text-white mb-1">{{ classData.name }}</h3>
        <p :class="`text-${classData.color}-100`">{{ classData.level }}</p>
        <div class="absolute top-4 right-4 bg-white/20 rounded-full p-2">
          <i :class="[classData.icon, 'text-white']"></i>
        </div>
      </div>
      
      <!-- Class Details -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- Teacher -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-500/20 mr-3">
                <i class="fas fa-chalkboard-teacher text-primary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Teacher</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.teacher }}</span>
          </div>
          
          <!-- Students -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-accent-500/20 mr-3">
                <i class="fas fa-users text-accent-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Students</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.students }}</span>
          </div>
          
          <!-- Campus -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-500/20 mr-3">
                <i class="fas fa-building text-secondary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Campus</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.campus }}</span>
          </div>
  
          <!-- Promotion -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-500/20 mr-3">
                <i class="fas fa-calendar-day text-primary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Promotion</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.promotion }}</span>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="border-t border-background-light p-4 bg-background-element flex justify-between">
        <button 
          @click="$emit('edit', classData.id)" 
          class="text-accent-400 hover:text-accent-300 flex items-center text-sm"
        >
          <i class="fas fa-edit mr-1"></i>
          <span>Edit</span>
        </button>
        <button 
          @click="$emit('manage-students', classData.id)" 
          class="text-accent-400 hover:text-accent-300 flex items-center text-sm"
        >
          <i class="fas fa-users mr-1"></i>
          <span>Manage Students</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ClassCard',
    props: {
      classData: {
        type: Object,
        required: true
      }
    },
    emits: ['edit', 'manage-students']
  };
  </script>
  
  <style scoped>
  .card-hover {
    transition: all 0.3s ease;
  }
  
  .card-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5);
  }
  </style>