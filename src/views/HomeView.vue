<script setup>
import HallOfFame from '../components/home/HallOfFame.vue'
import ClassroomDelegates from '../components/home/ClassroomDelegates.vue'
import Announcements from '../components/home/Announcements.vue'
import ActivityStats from '../components/home/ActivityStats.vue'
import BdeMembers from '../components/home/BdeMembers.vue'
import UpcomingEvents from '../components/home/UpcomingEvents.vue'
import QuickLinks from '../components/home/QuickLinks.vue'

import { usehomeStore } from '@/stores/homeStore'
import { computed, onMounted } from 'vue'


const homeStore = usehomeStore();

onMounted(() => {
  homeStore.fetchData();
});

const hallOfFame = computed(() => homeStore.hallOfFame);

</script>

<template>
  
<div v-if="hallOfFame">

  {{ hallOfFame }}

</div>
<div v-else>
  nooo
</div>
  Welcome Message
  <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block pb-4">
    👋 Welcome back Rida!
  </h1>
  
  <!-- Home Grid - 1 column on mobile, 2 on tablet, 4 on desktop -->
  <div class="grid grid-cols-1 md:grid-cols-2  gap-6">
    <!-- Column 1 -->
    <div>
      <HallOfFame :users="hallOfFame" />
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

  {{ hallOfFame }}
</template>