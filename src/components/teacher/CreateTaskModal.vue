<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Header - Fixed -->
      <div class="bg-gradient-to-r from-accent-600 to-accent-700 px-6 py-4">
        <h3 class="text-lg font-semibold text-text-primary">Create New Task</h3>
      </div>
      
      <!-- Content - Scrollable -->
      <div class="p-6 overflow-y-auto flex-grow">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Task Title</label>
            <input 
              type="text" 
              v-model="title"
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-text-primary"
              placeholder="Enter task title"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <textarea 
              v-model="description"
              rows="4" 
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-text-primary resize-none"
              placeholder="Describe the task..."
            ></textarea>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Classroom</label>
              <select 
                v-model="classroomId" 
                class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-text-primary"
                @change="teacherStore.selectClassroom(classroomId)"
              >
                <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">
                  {{ classroom.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
              <input 
                type="date" 
                v-model="dueDate"
                class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-text-primary"
              />
            </div>
          </div>
          
          <!-- Assignment Type Selection -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Assign To</label>
            <div class="flex space-x-4 mb-2">
              <label class="inline-flex items-center">
                <input type="radio" v-model="assignmentType" value="class" class="form-radio text-accent-500" />
                <span class="ml-2 text-sm text-text-secondary">Entire Class</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="assignmentType" value="students" class="form-radio text-accent-500" />
                <span class="ml-2 text-sm text-text-secondary">Specific Students</span>
              </label>
            </div>
          </div>
          
          <!-- Student Selection (visible only when "Specific Students" is selected) -->
          <div v-if="assignmentType === 'students'" class="border border-background-element rounded-lg p-4 bg-background/50">
            <label class="block text-sm font-medium text-text-secondary mb-2">Select Students</label>
            
            <div v-if="teacherStore.studentsInSelectedClassroom.length > 0" class="max-h-40 overflow-y-auto space-y-2">
              <div v-for="student in teacherStore.studentsInSelectedClassroom" :key="student.id" 
                class="flex items-center p-2 hover:bg-background-element rounded-md">
                <input 
                  type="checkbox" 
                  :id="student.id" 
                  v-model="selectedStudentIds"
                  :value="student.id"
                  class="form-checkbox text-accent-500"
                />
                <label :for="student.id" class="ml-2 text-sm text-text-secondary cursor-pointer flex-grow">
                  {{ student.name }}
                </label>
                <span class="text-xs text-text-muted">{{ student.email }}</span>
              </div>
            </div>
            <div v-else class="text-center p-4 text-text-muted text-sm">
              <p>Please select a classroom first to see students</p>
            </div>
            
            <div class="mt-2 flex justify-between text-xs text-text-muted">
              <span>{{ selectedStudentIds.length }} students selected</span>
              <div>
                <button @click="selectAllStudents" class="text-primary-400 hover:text-primary-600">Select All</button>
                <span class="mx-2">|</span>
                <button @click="deselectAllStudents" class="text-primary-400 hover:text-primary-600">Deselect All</button>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Points Value</label>
              <input 
                type="number" 
                v-model="points"
                min="0"
                class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-text-primary"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">Task Type</label>
              <select 
                v-model="taskType" 
                class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-text-primary"
              >
                <option value="Assignment">Assignment</option>
                <option value="Quiz">Quiz</option>
                <option value="Project">Project</option>
                <option value="Research">Research</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer - Fixed -->
      <div class="px-6 py-4 bg-background-element flex justify-end space-x-3 border-t border-background-element">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 border border-background-element rounded-md hover:bg-surface-hover text-text-secondary transition-colors"
          :disabled="loading"        
          >
          Cancel
        </button>
        <button 
          @click="createTask" 
          :disabled="!isFormValid || loading"
          :class="{'opacity-50 cursor-not-allowed': !isFormValid || loading}"
          class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors flex items-center justify-center"
        >
          <span v-if="loading" class="loader mr-2"></span>
          <span v-if="!loading">Create Task</span>
          <span v-else>Loading...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, computed } from 'vue';
import { useTeacherStore } from '@/stores/teacherStore';
import api from '@/axios';
import Swal from 'sweetalert2';

const emit = defineEmits(['close', 'task-created']);

// Access teacherStore
const teacherStore = useTeacherStore();

// Form state
const title = ref('');
const description = ref('');
const classroomId = ref('');
const dueDate = ref('');
const points = ref(10);
const taskType = ref('Assignment');
const assignmentType = ref('class'); // 'class' or 'students'
const selectedStudentIds = ref([]);
const loading = ref(false); // Add loading state

const classrooms = computed(() => teacherStore.classrooms);
const selectedClassroom = computed(() => teacherStore.selectedClassroom);
const availableStudents = computed(() => teacherStore.studentsInSelectedClassroom);

if (selectedClassroom.value) {
  classroomId.value = selectedClassroom.value.id;
}

// Set default due date to 1 week from now
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
dueDate.value = oneWeekFromNow.toISOString().split('T')[0];

// Helper functions for student selection
function selectAllStudents() {
  selectedStudentIds.value = availableStudents.value.map(student => student.id);
}

function deselectAllStudents() {
  selectedStudentIds.value = [];
}

// Validation
const isFormValid = computed(() => {
  const basicValidation = title.value.trim() !== '' && 
                          description.value.trim() !== '' && 
                          classroomId.value && 
                          dueDate.value && 
                          points.value >= 0;
                          
  if (assignmentType.value === 'students') {
    return basicValidation && selectedStudentIds.value.length > 0;
  }
  
  return basicValidation;
});

// Submit the form and save task to the database
const createTask = async () => {
  if (!isFormValid.value) return;

  const payload = {
    title: title.value,
    description: description.value,
    classroom_id: classroomId.value,
    due_date: dueDate.value,
    points: points.value,
    task_type: taskType.value,
    assignment_type: assignmentType.value,
  };

  if (assignmentType.value === 'students') {
    payload.student_ids = selectedStudentIds.value;
  }

  try {
    loading.value = true; // Set loading to true when starting the request
    const response = await api.post('/teacher/assign-task', payload);

    if (response.data.task) {
      emit('task-created', response.data.task);
    }

    if (response.data.invalid_students?.length) {
      console.warn('Invalid students:', response.data.invalid_students);
    }

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Task Created',
      text: 'The task has been created successfully.',
    });
  } catch (error) {
    console.error('Error assigning task:', error);
    // Show error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was an error creating the task. Please try again.',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

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

