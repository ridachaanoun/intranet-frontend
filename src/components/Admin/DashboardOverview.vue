<template>
    <div>
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value="248" 
          trend="12% increase" 
          icon="fas fa-users"
          color="primary"
        />
        <StatCard 
          title="Total Classes" 
          value="12" 
          trend="3 new classes" 
          icon="fas fa-chalkboard"
          color="secondary" 
        />
        <StatCard 
          title="Teachers" 
          value="24" 
          trend="2 new" 
          icon="fas fa-chalkboard-teacher"
          color="accent" 
        />
        <StatCard 
          title="Students" 
          value="224" 
          trend="10% increase" 
          icon="fas fa-user-graduate"
          color="primary" 
        />
      </div>
  
      <!-- Recent Activity & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 bg-surface rounded-xl shadow-card glass-effect overflow-hidden">
          <div class="px-6 py-4 border-b border-background-light flex justify-between items-center">
            <h3 class="font-semibold text-text-primary">Recent Activity</h3>
            <button class="text-text-secondary hover:text-accent-400 transition-colors">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <ActivityList :activities="recentActivities" />
          <div class="px-6 py-3 bg-background-element">
            <a href="#" class="text-accent-400 hover:text-accent-300 text-sm font-medium">View all activity</a>
          </div>
        </div>
  
        <!-- Quick Actions -->
        <QuickActions 
          @add-user="$emit('add-user')" 
          @add-class="$emit('add-class')" 
          @assign-students="$emit('assign-students')" 
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import StatCard from './StatCard.vue';
  import ActivityList from './ActivityList.vue';
  import QuickActions from './QuickActions.vue';
  
const props = defineProps({
  recentActivities: {
    type: Array,
    default: () => []
  }
})

  
  </script>