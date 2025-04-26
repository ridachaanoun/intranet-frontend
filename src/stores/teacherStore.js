import { defineStore } from 'pinia';
import api from '@/axios';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    classrooms: [],
    selectedClassroom: null,
    isLoading: false,
    error: null,
    dataFetched: false, // Flag to track if data has been fetched
  }),

  getters: {
    // Get all students from all classrooms
    allStudents(state) {
      let students = [];
      state.classrooms.forEach(classroom => {
        if (classroom.students) {
          students = [...students, ...classroom.students];
        }
      });
      return students;
    },

    // Get total number of students
    totalStudents(state) {
      return state.classrooms.reduce((total, classroom) => 
        total + (classroom.students ? classroom.students.length : 0), 0);
    },

    // Get total number of tasks
    totalTasks(state) {
      let count = 0;
      state.classrooms.forEach(classroom => {
        if (classroom.students) {
          classroom.students.forEach(student => {
            count += student.tasks_assigned_to ? student.tasks_assigned_to.length : 0;
          });
        }
      });
      return count;
    },

    // Get students for a specific classroom
    studentsByClassroom: (state) => (classroomId) => {
      const classroom = state.classrooms.find(c => c.id === classroomId);
      return classroom ? classroom.students || [] : [];
    },
  },

  actions: {
    // Fetch all classrooms with students and tasks (only once)
    async fetchClassrooms() {
      if (this.dataFetched) {
        return;
      }
      
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.get('/teacher/classrooms');
        
        if (response.data.success) {
          this.classrooms = response.data.data;
          this.dataFetched = true; 
        } else {
          this.error = 'Failed to fetch classrooms';
        }
      } catch (error) {
        console.error('Error fetching classrooms:', error);
        this.error = error.response?.data?.message || 'Network error while fetching classrooms';
      } finally {
        this.isLoading = false;
      }
    },

    // Force refresh classroom data
    async refreshClassrooms() {
      this.dataFetched = false; // Reset the flag to force a refresh
      await this.fetchClassrooms(); // Call the fetch method again
    },

    // Select a classroom
    selectClassroom(classroomId) {
      this.selectedClassroom = this.classrooms.find(c => c.id === classroomId) || null;
    },
  }
});