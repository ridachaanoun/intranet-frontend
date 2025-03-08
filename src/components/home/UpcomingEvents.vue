<script setup>
import { ref } from 'vue'

const events = ref([
  { 
    date: { day: 10, month: "MAR" }, 
    title: "JavaScript Workshop", 
    time: "10:00 AM - Room 204",
    color: "bg-accent-500" 
  },
  { 
    date: { day: 15, month: "MAR" }, 
    title: "Career Fair", 
    time: "9:00 AM - Main Hall",
    color: "bg-secondary-500" 
  },
  { 
    date: { day: 22, month: "MAR" }, 
    title: "Hackathon", 
    time: "All Day - Lab 3",
    color: "bg-primary-500" 
  }
])

const currentMonth = ref("March 2025")
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-calendar text-primary-400 mr-2"></i>
        Upcoming Events
      </h4>
    </div>
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-sm font-medium text-text-primary">{{ currentMonth }}</h5>
        <div class="flex space-x-2">
          <button class="p-1 rounded hover:bg-surface-hover">
            <i class="fas fa-chevron-left text-text-muted"></i>
          </button>
          <button class="p-1 rounded hover:bg-surface-hover">
            <i class="fas fa-chevron-right text-text-muted"></i>
          </button>
        </div>
      </div>
      
      <!-- Event List -->
      <div class="space-y-3">
        <div 
          v-for="(event, index) in events"
          :key="index"
          class="p-3 rounded-lg bg-surface-hover flex items-center"
        >
          <div :class="`mr-3 w-10 h-10 rounded-lg ${event.color} flex flex-col items-center justify-center`">
            <span class="text-xs font-bold text-white">{{ event.date.day }}</span>
            <span class="text-xs text-white">{{ event.date.month }}</span>
          </div>
          <div>
            <h6 class="font-medium text-sm text-text-primary">{{ event.title }}</h6>
            <p class="text-xs text-text-muted">{{ event.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="px-6 py-4 border-t border-background-light text-center bg-surface-muted">
      <a href="#" class="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium flex items-center justify-center">
        View Full Calendar
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>