<template>
  <div class="bg-surface rounded-xl shadow-card mt-6">
    <div class="flex overflow-x-auto hide-scrollbar">
      <button 
        v-for="tab in filteredTabs" 
        :key="tab.id"
        @click="$emit('change-tab', tab.id)"
        :class="[ 
          'px-6 py-3 text-sm font-bold whitespace-nowrap transition-all border-b-2',
          activeTab === tab.id 
            ? 'border-primary-500 text-primary-500' 
            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
        ]"
      >
        <i :class="tab.icon + ' mr-2'"></i>
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Destructure props explicitly to access them in the script context
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

defineEmits(['change-tab']);

// Use props.role explicitly in the computed property
const filteredTabs = computed(() => {
  if (props.role === 'student') {
    return props.tabs; // Return all tabs for students
  }
  return props.tabs.filter(tab => tab.id === 'overview'); // only "overview" 
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>