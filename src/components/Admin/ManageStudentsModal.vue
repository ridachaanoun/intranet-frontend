<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-surface rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-text-primary">Manage Students</h3>
        <button @click="closeModal" class="text-text-secondary hover:text-accent-400 transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Students List -->
      <div class="overflow-y-auto" style="max-height: 400px;">
        <ul>
          <li
            v-for="student in classroom.students"
            :key="student.id"
            class="flex justify-between items-center py-2 border-b border-background-light"
          >
            <div class="flex items-center">
              <img :src="student.image_url" alt="Student" class="w-8 h-8 rounded-full mr-3" />
              <span>{{ student.name }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex justify-end space-x-3">
        <button @click="closeModal" class="px-4 py-2 rounded-lg border border-background-light text-text-primary">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  classroom: Object,
});

const emits = defineEmits(['close']);

const closeModal = () => {
  emits('close');
};
</script>


