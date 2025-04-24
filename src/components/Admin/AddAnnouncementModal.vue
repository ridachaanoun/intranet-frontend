<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-surface rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-text-primary flex items-center">
          <i class="fas fa-bullhorn mr-2 text-accent-500"></i>
          Add Announcement
        </h2>
        <button @click="closeModal" class="text-text-secondary hover:text-accent-400 transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="saveAnnouncement">
        <div class="mb-4">
          <label for="title" class="block text-text-primary font-medium mb-2">Title</label>
          <input
            v-model="formData.title"
            type="text"
            id="title"
            placeholder="Enter announcement title"
            class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:ring-accent-400 focus:border-accent-400"
            required
          />
        </div>

        <div class="mb-4">
          <label for="content" class="block text-text-primary font-medium mb-2">Content</label>
          <textarea
            v-model="formData.content"
            id="content"
            placeholder="Enter announcement content"
            rows="6"
            class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:ring-accent-400 focus:border-accent-400"
            required
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-light transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-lg bg-accent-600 text-white hover:bg-accent-700 transition-colors"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin mr-2"></i>Saving...
            </span>
            <span v-else>
              <i class="fas fa-save mr-2"></i>Save Announcement
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/axios';
import Swal from 'sweetalert2';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['close', 'created']);

const formData = ref({
  title: '',
  content: ''
});

const isSubmitting = ref(false);

const saveAnnouncement = async () => {
  if (!formData.value.title.trim() || !formData.value.content.trim()) {
    await Swal.fire({
      icon: 'warning',
      title: 'Missing information',
      text: 'Please fill in all required fields',
    });
    return;
  }

  isSubmitting.value = true;
  try {
    const response = await api.post('/admin/announcements', {
      title: formData.value.title,
      content: formData.value.content
    });

    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: response.data.message || 'Announcement created successfully'
    });

    emits('created', response.data.announcement);
    closeModal();
  } catch (error) {
    console.error('Error creating announcement:', error);
    
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Failed to create announcement. Please try again.'
    });
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  formData.value = {
    title: '',
    content: ''
  };
  emits('close');
};
</script>