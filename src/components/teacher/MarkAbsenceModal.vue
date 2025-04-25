<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
      <!-- Header - Fixed -->
      <div class="bg-gradient-to-r from-secondary-600 to-secondary-700 px-6 py-4">
        <h3 class="text-lg font-semibold text-text-primary">Mark Student Absences</h3>
      </div>
      
      <!-- Content - Scrollable -->
      <div class="p-6 overflow-y-auto flex-grow">
        <div class="space-y-4">
          <!-- Date Selection -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Date</label>
            <input 
              type="date" 
              v-model="absenceDate"
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 text-text-primary"
            />
          </div>
          
          <!-- Classroom Selection -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Classroom</label>
            <select 
              v-model="classroomId" 
              @change="loadStudents"
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 text-text-primary"
            >
              <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">
                {{ classroom.name }}
              </option>
            </select>
          </div>
          
          <!-- Session Selection -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Session</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input type="radio" v-model="session" value="morning" class="form-radio text-secondary-500" />
                <span class="ml-2 text-sm text-text-secondary">Morning</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="session" value="afternoon" class="form-radio text-secondary-500" />
                <span class="ml-2 text-sm text-text-secondary">Afternoon</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" v-model="session" value="full-day" class="form-radio text-secondary-500" />
                <span class="ml-2 text-sm text-text-secondary">Full Day</span>
              </label>
            </div>
          </div>
          
          <!-- Students Selection -->
          <div class="border border-background-element rounded-lg p-4 bg-background/50">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-text-secondary">Select Absent Students</label>
              <div class="text-xs text-text-muted">
                <button @click="selectAllStudents" class="text-secondary-400 hover:text-secondary-600">Select All</button>
                <span class="mx-2">|</span>
                <button @click="deselectAllStudents" class="text-secondary-400 hover:text-secondary-600">Deselect All</button>
              </div>
            </div>
            
            <!-- Students List -->
            <div v-if="availableStudents.length > 0" class="max-h-60 overflow-y-auto mt-2 space-y-1">
              <div 
                v-for="student in availableStudents" 
                :key="student.id"
                class="flex items-center p-2 hover:bg-background-element rounded-md"
              >
                <input 
                  type="checkbox" 
                  :id="`absence-${student.id}`" 
                  v-model="selectedStudentIds"
                  :value="student.id"
                  class="form-checkbox text-secondary-500"
                />
                <div class="ml-3 flex-grow">
                  <label :for="`absence-${student.id}`" class="text-sm text-text-secondary cursor-pointer">
                    {{ student.name }}
                  </label>
                  <p class="text-xs text-text-muted">{{ student.email }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center p-4 text-text-muted text-sm">
              <p>Please select a classroom to see students</p>
            </div>
            
            <!-- Selection Summary -->
            <div class="mt-2 text-xs text-text-muted">
              {{ selectedStudentIds.length }} of {{ availableStudents.length }} students selected
            </div>
          </div>
          
          <!-- Optional Note -->
          <div>
            <label class="block text-sm font-medium text-text-secondary mb-1">Note (Optional)</label>
            <textarea 
              v-model="note"
              rows="2" 
              class="w-full px-4 py-2 bg-background border border-background-element rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 text-text-primary resize-none"
              placeholder="Add any additional details..."
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Footer - Fixed -->
      <div class="px-6 py-4 bg-background-element flex justify-end space-x-3 border-t border-background-element">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 border border-background-element rounded-md hover:bg-surface-hover text-text-secondary transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="saveAbsences" 
          :disabled="!isFormValid"
          :class="{'opacity-50 cursor-not-allowed': !isFormValid}"
          class="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white px-4 py-2 rounded-md hover:from-secondary-700 hover:to-secondary-800 transition-colors shadow-sm"
        >
          Save Absences
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, watch } from 'vue';

const props = defineProps({
  classrooms: {
    type: Array,
    required: true
  },
  preSelectedClassroomId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'absences-marked']);

// Form state
const absenceDate = ref(new Date().toISOString().split('T')[0]); // Today's date as default
const classroomId = ref(props.preSelectedClassroomId || '');
const session = ref('morning');
const selectedStudentIds = ref([]);
const availableStudents = ref([]);
const note = ref('');

// Initialize with the provided classroom or first classroom if available
if (!classroomId.value && props.classrooms.length > 0) {
  classroomId.value = props.classrooms[0].id;
}

if (classroomId.value) {
  loadStudents();
}

// Load students from the selected classroom
function loadStudents() {
  if (classroomId.value) {
    const selectedClassroom = props.classrooms.find(c => c.id === classroomId.value);
    if (selectedClassroom && selectedClassroom.students) {
      availableStudents.value = selectedClassroom.students;
      // Reset selected students when classroom changes
      selectedStudentIds.value = [];
    } else {
      availableStudents.value = [];
    }
  }
}

// Watch for classroom changes
watch(() => classroomId.value, loadStudents);

// Helper functions for student selection
function selectAllStudents() {
  selectedStudentIds.value = availableStudents.value.map(student => student.id);
}

function deselectAllStudents() {
  selectedStudentIds.value = [];
}

// Validation
const isFormValid = computed(() => {
  return absenceDate.value && 
         classroomId.value && 
         session.value && 
         selectedStudentIds.value.length > 0;
});


const saveAbsences = () => {
  if (!isFormValid.value) return;
  
  const selectedClassroom = props.classrooms.find(c => c.id === classroomId.value);
  
  // Create absence records for each selected student
  const absenceRecords = selectedStudentIds.value.map(studentId => {
    const student = availableStudents.value.find(s => s.id === studentId);
    return {
      date: absenceDate.value,
      classroom: selectedClassroom.name,
      classroom_id: classroomId.value,
      session: session.value,
      user_id: studentId,
      student_name: student?.name || 'Unknown Student',
      status: 'pending',
      note: note.value || null,
      created_at: new Date()
    };
  });
  
  // Emit event with absence records
  emit('absences-marked', absenceRecords);
};
</script>

<style scoped>
</style>
