<script setup>

const quickLinks = [
  { label: 'Home', icon: 'fas fa-home', path: '/' },
  { label: 'Network', icon: 'fas fa-network-wired', path: '/network' },
  { label: 'Classrooms', icon: 'fas fa-chalkboard', path: '/classrooms' },
  { label: 'Marketplace', icon: 'fas fa-store', path: '/marketplace' },
  { label: 'Profile', icon: 'fas fa-user', path: '/profile' },
];
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden mb-8 card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-link text-primary-400 mr-2"></i>
        Quick Links
      </h4>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-3">
        <a 
          v-for="(link, index) in quickLinks"
          :key="index"
          href="#" 
          class="p-3 bg-surface-hover rounded-lg hover:bg-surface-active transition-colors flex flex-col items-center justify-center text-center"
        >
          <i class="fas text-2xl mb-2 text-primary-400" :class="link.icon"></i>
          <span class="text-sm text-text-primary">{{ link.label }}</span>
        </a>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-background-light text-center bg-surface-muted">
      <a href="#" class="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium flex items-center justify-center">
        All Resources
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>