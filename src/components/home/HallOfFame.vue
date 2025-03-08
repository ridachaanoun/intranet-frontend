<script setup>
import { ref } from 'vue'

const users = ref([
  {
    name: "Fidèle Yonli",
    username: "fidèleyonli",
    location: "Youssoufia",
    points: "1068 YC"
  },
  {
    name: "Omar Dbaa",
    username: "omardbaa",
    location: "Youssoufia",
    points: "985 YC"
  },
  {
    name: "Ahmed Bari",
    username: "ahmedbari",
    location: "Safi",
    points: "876 YC"
  }
])
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden mb-8 card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-trophy text-primary-400 mr-2"></i>
        Hall of Fame
      </h4>
    </div>
    <div class="divide-y divide-background-light">
      <div 
        v-for="(user, index) in users" 
        :key="index" 
        class="p-4 flex items-center justify-between hover:bg-surface-hover transition-colors"
      >
        <div class="flex items-center space-x-4">
          <img 
            :src="`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=00f0c0&color=fff`" 
            :alt="user.name" 
            class="w-12 h-12 rounded-lg object-cover shadow-sm"
          />
          <div>
            <h4 class="text-base font-medium text-text-primary">{{ user.name }}</h4>
            <p class="text-sm text-text-secondary">@{{ user.username }}</p>
            <div class="text-sm text-text-muted flex items-center mt-1">
              <i class="fas fa-location-dot text-text-muted mr-1"></i>
              {{ user.location }}
            </div>
          </div>
        </div>
        <div class="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">{{ user.points }}</div>
      </div>
    </div>
    <div class="bg-surface-muted px-6 py-3 text-right">
      <a href="#" class="text-primary-400 hover:text-primary-300 font-medium text-sm flex items-center justify-end">
        View full rankings
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>