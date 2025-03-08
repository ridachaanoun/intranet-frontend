<script setup>
import HallOfFame from '../components/home/HallOfFame.vue'
import ClassroomDelegates from '../components/home/ClassroomDelegates.vue'
import Announcements from '../components/home/Announcements.vue'
import ActivityStats from '../components/home/ActivityStats.vue'
import BdeMembers from '../components/home/BdeMembers.vue'
import UpcomingEvents from '../components/home/UpcomingEvents.vue'
import QuickLinks from '../components/home/QuickLinks.vue'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()
</script>

<template>
  <!-- Welcome Message -->
  <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block pb-4">
    👋 Welcome back Rida!
  </h1>
  
  <!-- Home Grid - 1 column on mobile, 2 on tablet, 4 on desktop -->
  <div class="grid grid-cols-1 md:grid-cols-2  gap-6">
    <!-- Column 1 -->
    <div>
      <HallOfFame />
      <ClassroomDelegates />
    </div>
    
    <!-- Column 2 -->
    <div>
      <Announcements />
      <ActivityStats />
    </div>
    
    <!-- Column 3 -->
    <div>
      <BdeMembers />
      <UpcomingEvents />
    </div>
    
    <!-- Column 4 -->
    <div>
      <QuickLinks />
    </div>
  </div>
</template>