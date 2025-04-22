<template>
    <div 
      class="bg-surface rounded-xl shadow-card glass-effect overflow-hidden card-hover cursor-pointer"
      @click="navigateToClassroom"
    >
      <!-- Class Header -->
      <div 
        class="h-32 relative p-6"
        :style="{ backgroundImage: `url(${classData.cover_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
      >
        <h3 class="font-bold text-xl text-white mb-1">{{ classData.name }}</h3>
        <p class="text-white">{{ classData.level }}</p>
        <div class="absolute top-4 right-4 bg-white/20 rounded-full p-2">
          <i class="fas fa-chalkboard text-white"></i>
        </div>
      </div>
      
      <!-- Class Details -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- Teacher -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-500/20 mr-3">
                <i class="fas fa-chalkboard-teacher text-primary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Teacher</span>
            </div>
            <span 
              class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors"
              @click.stop="goToProfile(classData.teacher?.id)"
            >
              {{ classData.teacher?.name || 'N/A' }}
            </span>
          </div>
          
          <!-- Students -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-accent-500/20 mr-3">
                <i class="fas fa-users text-accent-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Students</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.students?.length || 0 }}</span>
          </div>
          
          <!-- Campus -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-500/20 mr-3">
                <i class="fas fa-building text-secondary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Campus</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.campus || 'N/A' }}</span>
          </div>

          <!-- Level -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-500/20 mr-3">
                <i class="fas fa-arrow-trend-up text-primary-400 text-xs"></i>
              </div>
              <span class="text-text-secondary text-sm">Level</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.level || 'N/A' }}</span>
          </div>

          <!-- Promotion -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-500/20 mr-3">
                <i class="fas fa-calendar-day text-primary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Promotion</span>
            </div>
            <span class="font-medium text-text-primary">{{ classData.promotion?.year || 'N/A' }}</span>
          </div>

          <!-- Delegate -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-surface-hover mr-3">
                <i class="fas fa-user-shield text-primary-400 text-sm"></i>
              </div>
              <span class="text-text-secondary text-sm">Delegate</span>
            </div>
            <span 
              class="font-medium text-text-primary cursor-pointer hover:text-primary-400 transition-colors"
              @click.stop="goToProfile(classData.delegate?.id)"
            >
              {{ classData.delegate?.name || 'N/A' }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="border-t border-background-light p-4 bg-background-element flex justify-between">
        <button 
          @click.stop="$emit('edit', classData)" 
          class="text-accent-400 hover:text-accent-300 flex items-center text-sm"
        >
          <i class="fas fa-edit mr-1"></i>
          <span>Edit</span>
        </button>
        <button 
          @click.stop="$emit('manage-students', classData.id)" 
          class="text-accent-400 hover:text-accent-300 flex items-center text-sm"
        >
          <i class="fas fa-users mr-1"></i>
          <span>Manage Students</span>
        </button>
      </div>
    </div>
</template>

  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';

  defineProps({
    classData: {
      type: Object,
      required: true
    }
  });

  defineEmits(['edit', 'manage-students']);

  const router = useRouter();

  function navigateToClassroom() {
    router.push(`/classroom/${classData.id}`);
  }

  function goToProfile(userId) {
    if (userId) {
      router.push(`/profile/${userId}`);
    }
  }
  </script>

  <style scoped>
  .card-hover {
    transition: all 0.3s ease;
  }

  .card-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5);
  }
  </style>