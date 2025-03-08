<script setup>
import { ref } from 'vue'

const delegates = ref([
  {
    name: "Abdeljalil El Filaly",
    location: "Youssoufia",
    group: "A2",
    badgeClass: "bg-accent-400"
  },
  {
    name: "Amine Naboulsi",
    location: "Youssoufia",
    group: "A1",
    badgeClass: "bg-secondary-500"
  },
  {
    name: "Maria Khan",
    location: "Safi",
    group: "B1",
    badgeClass: "bg-accent-400"
  },
  {
    name: "Hassan Ouardi",
    location: "Youssoufia",
    group: "B2",
    badgeClass: "bg-secondary-500"
  }
])
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-user-tie text-primary-400 mr-2"></i>
        Classroom Delegates
      </h4>
      <span class="px-3 py-1 bg-yellow-400 text-primary-800 text-sm font-medium rounded-full">19</span>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-2 gap-5">
        <div 
          v-for="(delegate, index) in delegates" 
          :key="index"
          class="flex flex-col items-center group"
        >
          <a href="#" class="relative block mb-3">
            <img 
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(delegate.name)}&background=00f0c0&color=fff`" 
              :alt="delegate.name" 
              class="w-16 h-16 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-accent-400 transition-all"
            />
            <div :class="`absolute -top-1 -right-1 ${delegate.badgeClass} text-text-primary text-xs px-2 py-0.5 rounded-full`">
              {{ delegate.group }}
            </div>
          </a>
          <h4 class="text-sm font-medium text-text-primary text-center truncate w-full max-w-[120px]">{{ delegate.name }}</h4>
          <div class="text-xs text-text-muted flex items-center mt-1">
            <i class="fa fa-location-dot mr-1"></i>
            {{ delegate.location }}
          </div>
        </div>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-background-light text-center bg-surface-muted">
      <a href="#" class="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium flex items-center justify-center">
        View All Classrooms 
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>