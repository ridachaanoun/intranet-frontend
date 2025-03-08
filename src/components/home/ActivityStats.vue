<script setup>
import { ref } from 'vue'

const stats = ref([
  { value: 42, label: "Posts" },
  { value: 187, label: "Points" },
  { value: 23, label: "Badges" }
])

const nextAchievement = ref({
  icon: "fa-star",
  title: "Content Creator",
  description: "Create 50 posts",
  progress: 84
})
</script>

<template>
  <section class="bg-surface rounded-lg shadow-card overflow-hidden card-hover">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
      <h4 class="text-lg font-semibold text-text-primary flex items-center">
        <i class="fas fa-chart-bar text-accent-400 mr-2"></i>
        Your Activity Stats
      </h4>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-3 gap-3">
        <div 
          v-for="(stat, index) in stats" 
          :key="index" 
          class="bg-surface-hover rounded-lg p-3 text-center"
        >
          <h3 class="text-xl font-bold text-accent-400">{{ stat.value }}</h3>
          <p class="text-xs text-text-secondary">{{ stat.label }}</p>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-background-light">
        <h5 class="text-sm font-medium text-text-primary mb-2">Next Achievement</h5>
        <div class="bg-surface-active rounded-lg p-3 flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-accent-700 flex items-center justify-center mr-3">
              <i class="fas" :class="nextAchievement.icon + ' text-accent-300'"></i>
            </div>
            <div>
              <h6 class="text-sm font-medium text-text-primary">{{ nextAchievement.title }}</h6>
              <p class="text-xs text-text-secondary">{{ nextAchievement.description }}</p>
            </div>
          </div>
          <div class="w-16">
            <div class="text-right text-xs text-text-primary mb-1">{{ nextAchievement.progress }}%</div>
            <div class="h-2 bg-surface-muted rounded-full">
              <div class="h-2 bg-accent-500 rounded-full" :style="{ width: `${nextAchievement.progress}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>