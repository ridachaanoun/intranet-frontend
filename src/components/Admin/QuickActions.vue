<template>
    <div class="bg-surface rounded-xl shadow-card glass-effect overflow-hidden">
      <div class="px-6 py-4 border-b border-background-light">
        <h3 class="font-semibold text-text-primary">Quick Actions</h3>
      </div>
      <div class="p-6 space-y-4">
        <button 
          @click="$emit('add-user')"
          class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-user-plus mr-2"></i>
          <span>Add New User</span>
        </button>
        <button 
          @click="$emit('add-class')"
          class="w-full py-3 px-4 bg-accent-600 hover:bg-accent-700 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-plus-circle mr-2"></i>
          <span>Create Class</span>
        </button>
        <button 
          @click="$emit('assign-students')"
          class="w-full py-3 px-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg flex items-center justify-center transition-colors"
        >
          <i class="fas fa-user-graduate mr-2"></i>
          <span>Assign Students</span>
        </button>
        <button class="w-full py-3 px-4 bg-background-element hover:bg-surface-hover text-text-primary rounded-lg flex items-center justify-center transition-colors">
          <i class="fas fa-file-export mr-2"></i>
          <span>Export Reports</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuickActions',
    emits: ['add-user', 'add-class', 'assign-students']
  };
  </script>