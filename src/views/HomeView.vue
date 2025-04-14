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
const announcements = computed(() => homeStore.announcements);

</script>

<template>
  <!-- Home Grid - 1 column on mobile, 2 on tablet, 4 on desktop -->
  <div class="grid grid-cols-1 md:grid-cols-2  gap-6">
    <!-- Column 1 -->
    <div>
      <HallOfFame :users="hallOfFame" />
      <ClassroomDelegates />
    </div>
    
    <!-- Column 2 -->
    <div>
      <Announcements :announcements="announcements" />
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