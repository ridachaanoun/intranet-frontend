<template>
    <div class="bg-surface rounded-xl p-6 shadow-card glass-effect relative overflow-hidden group card-hover">
      <div 
        class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full" 
        :class="`bg-${color}-900/20 group-hover:bg-${color}-900/30`"
      ></div>
      <div class="relative">
        <div class="text-sm text-text-secondary mb-1">{{ title }}</div>
        <div class="text-3xl font-bold text-text-primary mb-2">{{ value }}</div>
        <div class="flex items-center text-sm text-accent-400">
          <i class="fas fa-arrow-up mr-1"></i>
          <span>{{ trend }}</span>
        </div>
      </div>
      <div 
        class="absolute bottom-6 right-6 w-12 h-12 rounded-lg flex items-center justify-center"
        :class="`bg-${color}-500/20 text-${color}-400`"
      >
        <i :class="[icon, 'text-xl']"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StatCard',
    props: {
      title: String,
      value: String,
      trend: String,
      icon: String,
      color: {
        type: String,
        default: 'primary'
      }
    }
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