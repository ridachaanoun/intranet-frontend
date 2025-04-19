<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/70" @click="!loading && $emit('close')"></div>

    <!-- Modal Content -->
    <div class="relative bg-surface rounded-xl shadow-lg glass-effect w-full max-w-md mx-4 p-6 fade-in overflow-y-auto" style="max-height: 99vh;">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-text-primary">Add New Class</h3>
        <button @click="!loading && $emit('close')" class="text-text-secondary hover:text-accent-400 transition-colors" :disabled="loading">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="space-y-4">
          <!-- Class Name -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Class Name</label>
            <input 
              v-model="formData.name"
              type="text" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
          </div>

          <!-- Level -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Level</label>
            <select 
              v-model="formData.level"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="">Select a level</option>
              <option v-for="level in levels" :key="level.value" :value="level.value">
                {{ level.label }}
              </option>
            </select>
          </div>

          <!-- Teacher -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Teacher</label>
            <input 
              v-model="teacherSearch" 
              type="text" 
              placeholder="Search teacher..." 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400 mb-2"
            >
            <select 
              v-model="formData.teacher_id"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="" v-if="loadingTeachers">Loading teachers...</option>
              <option value="" v-else-if="filteredTeachers.length === 0">No teachers found</option>
              <option v-for="teacher in filteredTeachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.name }}
              </option>
            </select>
          </div>

          <!-- Campus -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Campus</label>
            <select 
              v-model="formData.campus"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="">Select a campus</option>
              <option v-for="campus in campuses" :key="campus.value" :value="campus.value">
                {{ campus.label }}
              </option>
            </select>
          </div>

          <!-- Promotion -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Promotion</label>
            <select 
              v-model="formData.promotion_id"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="" v-if="loadingPromotions">Loading promotions...</option>
              <option value="" v-else-if="promotions.length === 0">No promotions found</option>
              <option v-for="promotion in promotions" :key="promotion.id" :value="promotion.id">
                {{ promotion.year }}
              </option>
            </select>
          </div>

          <!-- Delegate -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Delegate</label>
            <input 
              v-model="delegateSearch" 
              type="text" 
              placeholder="Search delegate..." 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400 mb-2"
            >
            <select 
              v-model="formData.delegate_id"
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
              <option value="" v-if="loadingStudents">Loading delegates...</option>
              <option value="" v-else-if="filteredStudents.length === 0">No delegates found</option>
              <option v-for="student in filteredStudents" :key="student.id" :value="student.id">
                {{ student.name }}
              </option>
            </select>
          </div>

          <!-- Cover Image -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Cover Image</label>
            <input 
              type="file" 
              @change="handleFileUpload" 
              class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
              required
            >
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button 
            type="button"
            @click="!loading && $emit('close')" 
            class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-element transition-colors"
            :disabled="loading"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="loading" class="loader mr-2"></span>
            <span v-if="!loading">Add Class</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import Swal from 'sweetalert2';
import api from '@/axios';

const emit = defineEmits(['close', 'add-class']);

// State
const appStore = useAppStore();
const levels = appStore.levels;
const campuses = appStore.campuses;

const teachers = ref([]);
const students = ref([]);
const promotions = ref([]);

const teacherSearch = ref('');
const delegateSearch = ref('');
const selectedFile = ref(null);

const formData = ref({
  name: '',
  level: '',
  level_value: '',
  campus: '',
  promotion_id: '',
  teacher_id: '',
  delegate_id: ''
});

const loading = ref(false);
const loadingTeachers = ref(false);
const loadingStudents = ref(false);
const loadingPromotions = ref(false);

// Computed properties for filtering
const filteredTeachers = computed(() => {
  return teachers.value.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearch.value.toLowerCase())
  );
});

const filteredStudents = computed(() => {
  return students.value.filter(student =>
    student.name.toLowerCase().includes(delegateSearch.value.toLowerCase())
  );
});

// Handle file upload
const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

// Fetch data from APIs
const fetchData = async () => {
  try {
    loadingTeachers.value = true;
    loadingStudents.value = true;
    loadingPromotions.value = true;

    const [teachersResponse, studentsResponse, promotionsResponse] = await Promise.all([
      api.get('/teachers'),
      api.get('/students'),
      api.get('/promotions')
    ]);

    teachers.value = teachersResponse.data.teachers;
    students.value = studentsResponse.data.students;
    promotions.value = promotionsResponse.data.promotions;
  } catch (error) {
    console.error('Error fetching data:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch data. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  } finally {
    loadingTeachers.value = false;
    loadingStudents.value = false;
    loadingPromotions.value = false;
  }
};

// Submit form
const submitForm = async () => {
  loading.value = true;

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.value.name);
    formDataToSend.append('slug', formData.value.name);
    formDataToSend.append('level', formData.value.level);
    formDataToSend.append('level_value', formData.value.level_value);
    formDataToSend.append('campus', formData.value.campus);
    formDataToSend.append('promotion_id', formData.value.promotion_id);
    formDataToSend.append('teacher_id', formData.value.teacher_id);
    formDataToSend.append('delegate_id', formData.value.delegate_id);
    if (selectedFile.value) {
      formDataToSend.append('cover_image', selectedFile.value);
    }

    const response = await api.post('/admin/classes', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    await Swal.fire({
      icon: 'success',
      title: 'Classroom Added',
      text: 'The classroom has been added successfully!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    emit('add-class', response.data.classroom);
  } catch (error) {
    console.error('Error adding classroom:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add classroom. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  } finally {
    loading.value = false;
  }
};

// Fetch data on component mount
onMounted(fetchData);
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