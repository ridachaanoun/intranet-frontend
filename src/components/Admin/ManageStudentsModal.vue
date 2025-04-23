<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-surface rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-text-primary flex items-center">
          <i class="fas fa-users-cog mr-2 text-accent-500"></i>
          Manage Students
          <span class="ml-2 px-3 py-1 bg-accent-100 text-accent-700 rounded-md text-sm font-bold">{{ classroom.slug }}</span>
        </h2>
        <button @click="closeModal" class="text-text-secondary hover:text-accent-400 transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Search Input -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          @input="debouncedSearch"
          type="text"
          placeholder="Search students..."
          class="w-full border border-background-light rounded-lg px-4 py-2 text-text-primary focus:ring-accent-400 bg-background-element"
        />
      </div>

      <!-- Students Selector -->
      <div class="overflow-y-auto border border-background-light rounded-lg" style="max-height: 400px;" @scroll="handleScroll">
        <ul>
          <li
            v-for="student in students"
            :key="student.id"
            class="flex justify-between items-center py-2 px-4 border-b border-background-light"
          >
            <div class="flex items-center">
              <img :src="student.image_url" alt="Student" class="w-8 h-8 rounded-full mr-3" />
              <span>{{ student.name }}</span>
            </div>
            <button
              @click="toggleStudentSelection(student)"
              :class="{
                'bg-accent-600 text-white': isSelected(student),
                'bg-background-element text-text-primary': !isSelected(student),
              }"
              class="px-3 py-1 rounded-lg transition-colors"
            >
              {{ isSelected(student) ? 'Remove' : 'Add' }}
            </button>
          </li>
        </ul>
        <div v-if="isLoading" class="text-center py-2 text-text-secondary">Loading...</div>
        <div v-if="!hasMore && students.length > 0" class="text-center py-2 text-text-secondary">No more students</div>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex justify-end space-x-3">
        <button @click="closeModal" class="px-4 py-2 rounded-lg border border-background-light text-text-primary">
          Cancel
        </button>
        <button @click="saveChanges" class="px-4 py-2 rounded-lg bg-accent-600 text-white">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/axios';
import Swal from 'sweetalert2';

const props = defineProps({
  visible: Boolean,
  classroom: Object,
});

const emits = defineEmits(['close', 'updated']);

const searchQuery = ref('');
const students = ref([]);
const selectedStudents = ref(new Set());
const page = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);
const debounceTimeout = ref(null);

// Initialize selected students from the classroom
const initializeSelectedStudents = () => {
  if (props.classroom && props.classroom.students) {
    selectedStudents.value = new Set(props.classroom.students.map((student) => student.id));
  }
};

// Fetch students from the API
const fetchStudents = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  try {
    const response = await api.get('/users/search', {
      params: {
        query: searchQuery.value,
        role: 'student',
        page: page.value,
        limit: 15,
      },
    });

    if (response.data.users.length > 0) {
      students.value.push(...response.data.users);
      page.value += 1;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Error fetching students:', error);
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = () => {
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    students.value = [];
    page.value = 1;
    hasMore.value = true;
    fetchStudents();
  }, 2000);
};

// Handle infinite scrolling
const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    fetchStudents();
  }
};

// Toggle student selection
const toggleStudentSelection = (student) => {
  if (selectedStudents.value.has(student.id)) {
    selectedStudents.value.delete(student.id);
  } else {
    selectedStudents.value.add(student.id);
  }
};

// Check if a student is selected
const isSelected = (student) => selectedStudents.value.has(student.id);

const saveChanges = async () => {
  try {
    const response = await api.post(`/admin/classroom/${props.classroom.id}/students`, {
      student_ids: Array.from(selectedStudents.value),
    });

    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });

    emits('updated', response.data.classroom);
    closeModal();
  } catch (error) {
    console.error('Error saving changes:', error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update students. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
    });
  }
};

const closeModal = () => {
  emits('close');
};

initializeSelectedStudents();
fetchStudents();
</script>




