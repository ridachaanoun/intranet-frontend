<template>
  <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div class="bg-surface rounded-lg shadow-2xl p-0 w-full max-w-3xl transform transition-all">
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-accent-600 to-accent-700 px-6 py-4 rounded-t-lg">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-white">Assigned Students</h3>
          <button @click="closeModal" class="text-white hover:text-white/80">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <!-- Modal Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="student in students" 
            :key="student.id" 
            class="bg-background/40 rounded-lg overflow-hidden hover:shadow-md transition-all"
          >
            <router-link :to="`/profile/${student.id}`">
              <div class="relative">
                <img 
                  :src="student.image_url" 
                  :alt="student.name" 
                  class="w-full h-48 object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <span class="text-white text-xs px-3 py-1 m-2 bg-primary-500 rounded-full">
                    View Profile
                  </span>
                </div>
              </div>
            </router-link>
            <div class="p-4">
              <router-link :to="`/profile/${student.id}`">
                <h4 class="font-medium text-text-primary mb-2 hover:text-accent-600">{{ student.name }}</h4>
              </router-link>
              <div class="space-y-2">
                <div class="flex items-center text-xs text-text-secondary">
                  <i class="fas fa-envelope w-4 mr-2"></i>
                  <span>{{ student.email }}</span>
                </div>
                <div class="flex items-center text-xs text-text-secondary">
                  <i class="fas fa-graduation-cap w-4 mr-2"></i>
                  <span>{{ student.level || 'Not specified' }}</span>
                </div>
                <div class="flex items-center text-xs text-text-secondary">
                  <i class="fas fa-chalkboard w-4 mr-2"></i>
                  <span>{{ student.classroom || 'Not assigned' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="bg-background/40 px-6 py-4 rounded-b-lg flex justify-end">
        <button 
          @click="closeModal" 
          class="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  students: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>