<script setup>
import { ref } from 'vue'

const announcements = ref([
  {
    title: "Campus Updates",
    time: "2 hours ago",
    content: "The computer lab will be closed for maintenance on Friday from 2-5 PM."
  },
  {
    title: "Upcoming Workshop",
    time: "Yesterday",
    content: "Don't miss the \"Web Accessibility\" workshop on Thursday at 4 PM in Room 204."
  },
  {
    title: "Community Event",
    time: "3 days ago",
    content: "Join us for the monthly community meetup this Sunday at the central hall."
  }
])
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden mb-8 card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex justify-between items-center">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-bullhorn text-primary-400 mr-2"></i>
        Latest Announcements
      </h4>
      <span class="px-3 py-1 bg-secondary-500 text-text-primary text-xs font-medium rounded-full">New</span>
    </div>
    <div class="divide-y divide-background-light">
      <div 
        v-for="(announcement, index) in announcements" 
        :key="index" 
        class="p-4 hover:bg-surface-hover transition-colors"
      >
        <div class="flex justify-between mb-2">
          <h5 class="font-medium text-text-primary">{{ announcement.title }}</h5>
          <span class="text-xs text-text-muted">{{ announcement.time }}</span>
        </div>
        <p class="text-sm text-text-secondary mb-2">
          {{ announcement.content }}
        </p>
        <div class="flex justify-end">
          <a href="#" class="text-xs text-primary-400 hover:text-primary-300">Read more</a>
        </div>
      </div>
    </div>
    <div class="bg-surface-muted px-6 py-3 text-center">
      <a href="#" class="text-primary-400 hover:text-primary-300 font-medium text-sm flex items-center justify-center">
        View all announcements
        <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>