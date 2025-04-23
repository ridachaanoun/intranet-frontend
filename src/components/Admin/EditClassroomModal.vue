<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/70" @click="!isLoading && closeModal()"></div>

    <!-- Modal Content -->
    <div class="relative bg-surface rounded-xl shadow-lg glass-effect w-full max-w-md mx-4 p-6 fade-in overflow-y-auto" style="max-height: 99vh;">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-text-primary">Edit Classroom</h3>
        <button @click="!isLoading && closeModal()" class="text-text-secondary hover:text-accent-400 transition-colors" :disabled="isLoading">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-text-secondary mb-1">Class Name</label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
          </div>

          <!-- Slug -->
          <div>
            <label for="slug" class="block text-sm font-medium text-text-secondary mb-1">Slug</label>
            <input 
              id="slug" 
              v-model="form.slug" 
              type="text" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
          </div>

          <!-- Level -->
          <div>
            <label for="level" class="block text-sm font-medium text-text-secondary mb-1">Level</label>
            <select 
              id="level" 
              v-model="form.level" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <option value="">Select a level</option>
              <option v-for="level in levels" :key="level.value" :value="level.value">
                {{ level.label }}
              </option>
            </select>
          </div>

          <!-- Campus -->
          <div>
            <label for="campus" class="block text-sm font-medium text-text-secondary mb-1">Campus</label>
            <select 
              id="campus" 
              v-model="form.campus" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <option value="">Select a campus</option>
              <option v-for="campus in campuses" :key="campus.value" :value="campus.value">
                {{ campus.label }}
              </option>
            </select>
          </div>

          <!-- Promotion -->
          <div>
            <label for="promotion" class="block text-sm font-medium text-text-secondary mb-1">Promotion</label>
            <select 
              id="promotion" 
              v-model="form.promotion_id" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <option value="">Select Promotion</option>
              <option v-for="promotion in promotions" :key="promotion.id" :value="promotion.id">
                {{ promotion.year }}
              </option>
            </select>
          </div>

          <!-- Teacher -->
          <div>
            <label for="teacher" class="block text-sm font-medium text-text-secondary mb-1">Teacher</label>
            <select 
              id="teacher" 
              v-model="form.teacher_id" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <option value="">Select Teacher</option>
              <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.name }}
              </option>
            </select>
          </div>

          <!-- Delegate -->
          <div>
            <label for="delegate" class="block text-sm font-medium text-text-secondary mb-1">Delegate</label>
            <select 
              id="delegate" 
              v-model="form.delegate_id" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <option value="">Select Delegate</option>
              <option v-for="delegate in delegates" :key="delegate.id" :value="delegate.id">
                {{ delegate.name }}
              </option>
            </select>
          </div>

          <!-- Cover Image -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Cover Image</label>
            <div class="relative border-2 border-dashed border-background-light rounded-lg p-4 transition-colors hover:border-accent-400">
              <input 
                type="file" 
                id="coverImage"
                @change="handleFileChange" 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept="image/*"
              >
              <div class="flex flex-col items-center justify-center space-y-2">
                <div v-if="previewUrl" class="w-full">
                  <img 
                    :src="previewUrl" 
                    class="h-32 object-cover mx-auto rounded-md" 
                    alt="Selected preview"
                  />
                  <p class="text-sm text-text-secondary text-center mt-2 truncate">
                    {{ form.cover_image?.name || 'Current image' }}
                  </p>
                </div>
                <div v-else-if="classroom?.cover_image_url" class="w-full">
                  <img 
                    :src="classroom.cover_image_url" 
                    class="h-32 object-cover mx-auto rounded-md" 
                    alt="Current cover image"
                  />
                  <p class="text-sm text-text-secondary text-center mt-2 truncate">
                    Current image
                  </p>
                </div>
                <div v-else>
                  <i class="fas fa-cloud-upload-alt text-2xl text-text-secondary"></i>
                  <p class="text-sm text-text-secondary mt-2">Click or drag image to upload</p>
                  <p class="text-xs text-text-secondary opacity-75">PNG, JPG or JPEG</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button 
            type="button"
            @click="!isLoading && closeModal()" 
            class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-element transition-colors"
            :disabled="isLoading"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors flex items-center justify-center"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loader mr-2"></span>
            <span v-if="!isLoading">Update Classroom</span>
            <span v-else>Updating...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import api from '@/axios';
import Swal from 'sweetalert2';
import { useAppStore } from '@/stores/app';

const props = defineProps({
  visible: Boolean,
  classroom: Object,
});

const emits = defineEmits(['close', 'updated']);

const appStore = useAppStore();
const levels = ref(appStore.levels);
const campuses = ref(appStore.campuses);

const promotions = ref([]);
const teachers = ref([]);
const delegates = ref([]);

const isLoading = ref(false);

const form = reactive({
  slug: '',
  name: '',
  level: '',
  campus: '',
  promotion_id: '',
  teacher_id: '',
  delegate_id: '',
  cover_image: null,
});

// For image preview
const selectedFile = ref(null);
const previewUrl = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value);
  }
  return '';
});

// Fetch only promotions, teachers, delegates (students)
const fetchSelectData = async () => {
  try {
    const [promotionsRes, teachersRes, delegatesRes] = await Promise.all([
      api.get('/promotions'),
      api.get('/teachers'),
      api.get('/students'),
    ]);
    promotions.value = promotionsRes.data.promotions || [];
    teachers.value = teachersRes.data.teachers || [];
    delegates.value = delegatesRes.data.students || [];
  } catch (e) {
    console.log(e);
  }
};


  if (props.classroom) {
   const classroom = props.classroom
    Object.assign(form, {
      slug: classroom.slug || '',
      name: classroom.name || '',
      level: classroom.level || '',
      campus: classroom.campus || '',
      promotion_id: classroom.promotion_id || '',
      teacher_id: classroom.teacher_id || '',
      delegate_id: classroom.delegate_id || '',
      cover_image: null,
    });
    selectedFile.value = null;
  }
// Fetch select data when modal opens
if (props.visible) fetchSelectData();

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.cover_image = file;
    selectedFile.value = file;
  }
};

const submitForm = async () => {
  isLoading.value = true;
  const formData = new FormData();
  for (const key in form) {
    if (form[key] !== null && form[key] !== '') {
      formData.append(key, form[key]);
    }
  }

  try {
    const response = await api.post(`/admin/classroom/${props.classroom.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await Swal.fire({
      icon: 'success',
      title: 'Classroom Updated',
      text: 'The classroom has been updated successfully!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    emits('updated', response.data.classroom);
    closeModal();
  } catch (error) {
    console.error('Error updating classroom:', error);
    let message = 'Failed to update classroom. Please try again.';
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        message = error.response.data.message;
      }
      // Show first validation error if available
      if (error.response.data.errors) {
        const firstField = Object.keys(error.response.data.errors)[0];
        if (firstField) {
          message = error.response.data.errors[firstField][0];
        }
      }
    }
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  emits('close');
};
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>