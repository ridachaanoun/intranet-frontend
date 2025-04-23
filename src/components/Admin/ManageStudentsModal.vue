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

      <!-- Filter Toggle -->
      <div class="mb-4 flex justify-between items-center">
        <div>
        <button
            @click="setFilter('inClassroom')"
            :class="filter === 'inClassroom' ? 'bg-accent-600 text-white' : 'bg-background-element text-text-primary'"
            class="px-4 py-2 rounded-lg transition-colors"
        >
            In Classroom
        </button>
        <button
            @click="setFilter('notInClassroom')"
            :class="filter === 'notInClassroom' ? 'bg-accent-600 text-white' : 'bg-background-element text-text-primary'"
            class="px-4 py-2 rounded-lg transition-colors ml-2"
          >
            Not In Classroom
          </button>
        </div>
        <input
          v-model="searchQuery"
          @input="debouncedSearch"
          type="text"
          placeholder="Search students..."
          class="w-1/2 border border-background-light rounded-lg px-4 py-2 text-text-primary focus:ring-accent-400 bg-background-element"
        />
      </div>

      <!-- Students Selector -->
      <div class="overflow-y-auto border border-background-light rounded-lg" style="max-height: 400px;" @scroll="handleScroll">
        <ul>
          <li
            v-for="student in filteredStudents"
            :key="student.id"
            class="flex justify-between items-center py-2 px-4 border-b border-background-light"
          >
            <div class="flex items-center">
              <img :src="student.image_url" alt="Student" class="w-8 h-8 rounded-full mr-3" />
              <span>{{ student.name }}</span>
            </div>
            <button
            @click="toggleStudentSelection(student)"
            :class="isSelected(student) ? 'bg-accent-600 text-white' : 'bg-background-element text-text-primary'"
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
        <button @click="saveChanges" :disabled="isSaving" class="px-4 py-2 rounded-lg bg-accent-600 text-white">
        Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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
const isSaving = ref(false);
const hasMore = ref(true);
const debounceTimeout = ref(null);
const filter = ref('inClassroom'); // Filter toggle state

const initializeSelectedStudents = () => {
if (props.classroom?.students) {
    selectedStudents.value = new Set(props.classroom.students.map(s => s.id));
    students.value = [...props.classroom.students];
}
};

const fetchStudents = async () => {
if (isLoading.value || !hasMore.value || filter.value === 'inClassroom') return;
isLoading.value = true;
try {
    const res = await api.get('/users/search', {
    params: {
        query: searchQuery.value,
        role: 'student',
        page: page.value,
        per_page: 15,
    },
    });
    const fetched = res.data.users;
    if (fetched.length) {
    students.value.push(...fetched);
    page.value++;
    } else {
    hasMore.value = false;
    }
} catch (err) {
    console.error('Fetch error:', err);
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
}, 500);
};

const handleScroll = (e) => {
const { scrollTop, scrollHeight, clientHeight } = e.target;
if (filter.value === 'notInClassroom' && scrollTop + clientHeight >= scrollHeight - 10) {
    fetchStudents();
}
};

const toggleStudentSelection = (student) => {
selectedStudents.value.has(student.id)
    ? selectedStudents.value.delete(student.id)
    : selectedStudents.value.add(student.id);
};

const isSelected = (student) => selectedStudents.value.has(student.id);

const filteredStudents = computed(() => {
return filter.value === 'inClassroom'
    ? students.value.filter(s => selectedStudents.value.has(s.id))
    : students.value.filter(s => !selectedStudents.value.has(s.id));
});

const setFilter = (val) => {
filter.value = val;
if (val === 'notInClassroom') {
    students.value = [];
    page.value = 1;
    hasMore.value = true;
    fetchStudents();
} else if (val === 'inClassroom') {
    students.value = [...props.classroom.students];
}
};

const saveChanges = async () => {
  isSaving.value = true;
  try {
    const url = `/classrooms/${props.classroom.id}/students`;

    let res;
    if (filter.value === 'notInClassroom') {
      // Add students
      res = await api.post(url, {
        student_ids: Array.from(selectedStudents.value),
      });
      await Swal.fire({ icon: 'success', title: 'Success', text: res.data.message });
    } else {
      // Remove students
      res = await api.delete(url, {
        data: { student_ids: Array.from(selectedStudents.value) },
      });
      await Swal.fire({ icon: 'success', title: 'Success', text: res.data.message });
    }

    emits('updated', res.data.classroom || null);
    closeModal();
  } catch (err) {
    console.error('Save error:', err);
    await Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update students.' });
  } finally {
    isSaving.value = false;
  }
};


const closeModal = () => {
  emits('close');
};

initializeSelectedStudents();
fetchStudents();
</script>




