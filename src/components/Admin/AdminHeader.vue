<template>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-text-primary">{{ sectionTitle }}</h1>
        <p class="text-text-secondary">{{ currentDateTime }}</p>
      </div>
      <div class="flex space-x-4">
        <button class="bg-background-element p-2 rounded-lg text-text-secondary hover:text-accent-400 transition-colors">
          <i class="fas fa-bell"></i>
        </button>
        <button class="bg-background-element p-2 rounded-lg text-text-secondary hover:text-accent-400 transition-colors">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/stores/app';
  
  // Props
  defineProps({
    sectionTitle: {
      type: String,
      required: true
    }
  });
  
  // State from App Store
  const appStore = useAppStore();
  const currentDateTime = computed(() => appStore.currentDateTime);
  </script>