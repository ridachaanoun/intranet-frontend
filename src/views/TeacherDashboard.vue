<template>
  <div v-if="!teacherStore.isLoading" class="teacher-dashboard min-h-screen bg-background">
    <!-- Teacher Dashboard Layout -->
    <div class="flex">
      <!-- Main Content -->
      <div class="flex-1 p-8">
        <!-- Header Bar -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-text-primary">{{ sectionTitle }}</h1>
          <div class="flex items-center space-x-4">
            <button class="btn-primary" 
              @click="showCreateTaskModal = true"
            >
              <i class="fas fa-plus mr-2"></i> New Task
            </button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="mb-8 mt-4">
          <div class="flex overflow-x-auto space-x-1 bg-surface rounded-xl p-1 glass-effect">
            <button 
              @click="activeSection = 'overview'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'overview', 'text-text-secondary': activeSection !== 'overview'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-chalkboard-teacher"></i>
              <span>OVERVIEW</span>
            </button>
            <button 
              @click="activeSection = 'students'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'students', 'text-text-secondary': activeSection !== 'students'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-user-graduate"></i>
              <span>STUDENTS</span>
            </button>
            <button 
              @click="activeSection = 'tasks'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'tasks', 'text-text-secondary': activeSection !== 'tasks'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-tasks"></i>
              <span>TASKS</span>
            </button>
            <button 
              @click="activeSection = 'absences'" 
              :class="{'bg-background-element shadow-soft text-text-primary': activeSection === 'absences', 'text-text-secondary': activeSection !== 'absences'}" 
              class="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <i class="fas fa-calendar-times"></i>
              <span>ABSENCES</span>
            </button>
          </div>
        </div>

        <!-- Dynamic Content Based on Active Section -->
        <TeacherOverview 
          v-if="activeSection === 'overview'" 
          :recentActivities="recentActivities"
          class="fade-in"
          @create-task="showCreateTaskModal = true" 
        />
        <ClassroomStudents 
          v-if="activeSection === 'students'" 
          @assign-points="openAssignPointsModal"
          @mark-absence="openMarkAbsenceModal"
          class="fade-in" 
        />
        <ClassroomTasks 
          v-if="activeSection === 'tasks'" 
          @create-task="showCreateTaskModal = true" 
          class="fade-in" 
        />
        <ClassroomAbsences 
          v-if="activeSection === 'absences'" 
          @mark-absence="openMarkAbsenceModal"
          class="fade-in" 
        />

        <!-- Current user and time info -->
        <div class="mt-8 text-right text-xs text-text-secondary" v-if="currentUser">
          <p>Teacher: {{ currentUser.name }}</p>
        </div>
      </div>
    </div>
    
    <!-- Modals -->
    <AssignPointsModal 
      v-if="showAssignPointsModal" 
      :student="selectedStudent"
      @close="closeAssignPointsModal" 
      @points-assigned="handlePointsAssigned"
    />
    
    <CreateTaskModal 
      v-if="showCreateTaskModal" 
      @close="showCreateTaskModal = false" 
      @task-created="handleTaskCreated"
    />
    
    <MarkAbsenceModal 
      v-if="showMarkAbsenceModal" 
      :classrooms="classrooms"
      :preSelectedClassroomId="selectedClassroomForAbsence"
      @close="showMarkAbsenceModal = false" 
      @absences-marked="handleAbsencesMarked"
    />
  </div>
  <div v-else class="h-[32rem] flex justify-center items-center">
        <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTeacherStore } from '@/stores/teacherStore';
import { useUserStore } from '@/stores/userStore'; // Assuming you have this
import { useAbsenceStore } from '@/stores/absenceStore'; // Import the absence store

// Import components
import TeacherOverview from '@/components/teacher/TeacherOverview.vue';
import ClassroomStudents from '@/components/teacher/ClassroomStudents.vue';
import ClassroomTasks from '@/components/teacher/ClassroomTasks.vue';
import AssignPointsModal from '@/components/teacher/AssignPointsModal.vue';
import CreateTaskModal from '@/components/teacher/CreateTaskModal.vue';
import MarkAbsenceModal from '@/components/teacher/MarkAbsenceModal.vue';
import ClassroomAbsences from '@/components/teacher/ClassroomAbsences.vue';

// Initialize stores
const teacherStore = useTeacherStore();
const userStore = useUserStore();
const absenceStore = useAbsenceStore(); // Initialize the absence store

// Active section state
const activeSection = ref('overview');
const recentActivities = ref([]);

// Modal states
const showAssignPointsModal = ref(false);
const showCreateTaskModal = ref(false);
const showMarkAbsenceModal = ref(false);
const selectedStudent = ref(null);
const selectedClassroomForAbsence = ref('');

// Computed properties
const sectionTitle = computed(() => {
  switch (activeSection.value) {
    case 'overview':
      return 'Teacher Dashboard';
    case 'students':
      return 'Manage Students';
    case 'tasks':
      return 'Classroom Tasks';
    case 'absences':
      return 'Student Absences';
    default:
      return 'Teacher Dashboard';
  }
});

// Use computed to get classrooms from the store
const classrooms = computed(() => teacherStore.classrooms);

// Get current user from user store
const currentUser = computed(() => userStore.user);

// Initialize with data when component is mounted
onMounted(async () => {
  // Fetch classrooms data from API
  await teacherStore.fetchClassrooms();
  
  // Load activities from localStorage
  loadActivities();
  
});

const openAssignPointsModal = (student) => {
  selectedStudent.value = student;
  showAssignPointsModal.value = true;
};

const closeAssignPointsModal = () => {
  showAssignPointsModal.value = false;
  selectedStudent.value = null;
};

const handlePointsAssigned = (data) => {
  // Update the student's total points in the teacherStore
  const classroom = teacherStore.classrooms.find(classroom =>
    classroom.students.some(student => student.id === data.student_id)
  );

  if (classroom) {
    const student = classroom.students.find(student => student.id === data.student_id);
    if (student) {
      student.total_points = (student.total_points || 0) + parseInt(data.points, 10);
    }
  }
  recentActivities.value.unshift({
    id: Date.now(),
    type: 'points',
    icon: 'fas fa-star',
    iconBg: 'bg-accent-500/20',
    iconColor: 'text-accent-400',
    message: `Assigned ${data.points} points to <span class="font-medium">${data.name}</span>`,
  });

  // Save the updated activities to localStorage
  saveActivities();

  // Close the modal
  closeAssignPointsModal();
};

const handleTaskCreated = async (task) => {
try {
  console.log(task);
  
  teacherStore.classrooms.forEach((classroom) => {
    if (classroom.id === task.classroom_id) {
      classroom.tasks.push(task);
    }
  });
  
  recentActivities.value.unshift({
    id: Date.now(),
    type: 'task',
    icon: 'fas fa-clipboard-list',
    iconBg: 'bg-primary-500/20',
    iconColor: 'text-primary-400',
    message: `Created task <span class="font-medium">${task.title}</span>`,
  });
  saveActivities();
  showCreateTaskModal.value = false;
} catch (error) {
  console.error('Error creating task:', error);
}
};

const openMarkAbsenceModal = (classroomId) => {
  selectedClassroomForAbsence.value = classroomId;
  showMarkAbsenceModal.value = true;
};

const handleAbsencesMarked = (addedAbsences) => {
  // Save new absences to the absence store
  addedAbsences.forEach(absence => {
    if (!absenceStore.absences[absence.classroom_id]) {
      absenceStore.absences[absence.classroom_id] = [];
    }
    absenceStore.absences[absence.classroom_id].unshift(absence);
  });

  // Add to activity feed
  const studentNames = addedAbsences.map(absence => absence.user.name).slice(0, 2);
  const otherCount = addedAbsences.length > 2 ? addedAbsences.length - 2 : 0;

  let message = `Marked absence for <span class="font-medium">${studentNames.join(', ')}</span>`;
  if (otherCount > 0) {
    message += ` and ${otherCount} other${otherCount > 1 ? 's' : ''}`;
  }

  recentActivities.value.unshift({
    id: Date.now(),
    type: 'absence',
    icon: 'fas fa-calendar-minus',
    iconBg: 'bg-secondary-500/20',
    iconColor: 'text-secondary-400',
    message: message
  });

  saveActivities(); // Save activities to localStorage
  showMarkAbsenceModal.value = false; // Close the modal
};
const saveActivities = () => {
  localStorage.setItem('teacherRecentActivities', JSON.stringify(recentActivities.value));
};

const loadActivities = () => {
  const storedActivities = localStorage.getItem('teacherRecentActivities');
  if (storedActivities) {
    recentActivities.value = JSON.parse(storedActivities);
  }
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

.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  @apply bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-md hover:from-primary-700 hover:to-primary-800 transition-colors shadow-sm;
}
</style>
