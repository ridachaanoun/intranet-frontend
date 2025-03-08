<script setup>
import { ref } from 'vue'

const members = ref([
  { name: "Imadeddine Saghir", location: "Safi" },
  { name: "Otman Kharbouch", location: "Youssoufia" },
  { name: "Zaid Moumni", location: "Youssoufia" },
  { name: "Jane Doe", location: "New York" },
  { name: "John Doe", location: "Los Angeles" },
  { name: "Sam Smith", location: "London" }
])
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden mb-8 card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-user-friends text-primary-400 mr-2"></i>
        BDE Members
      </h4>
      <span class="px-3 py-1 bg-yellow-400 text-primary-800 text-sm font-medium rounded-full">17</span>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-3 gap-4">
        <div 
          v-for="(member, index) in members" 
          :key="index" 
          class="flex flex-col items-center group"
        >
          <a href="#" class="relative block mb-2">
            <img 
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00f0c0&color=fff`" 
              :alt="member.name" 
              class="w-14 h-14 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-accent-400 transition-all"
            />
          </a>
          <h4 class="text-xs font-medium text-text-primary text-center truncate w-full">{{ member.name.split(' ')[0] }}</h4>
          <p class="text-xs text-text-muted text-center">{{ member.location }}</p>
        </div>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-background-light text-center bg-surface-muted">
      <a href="#" class="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium flex items-center justify-center">
        View All Members
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>