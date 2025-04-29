import { defineStore } from 'pinia';
import api from '@/axios';

export const useAbsenceStore = defineStore('absence', {
  state: () => ({
    absences: {},
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAbsences(classroomId) {
      if (this.absences[classroomId]) {
        // If absences for this classroom are already fetched, return them
        console.log('Absences already fetched for classroom:', classroomId);
        return this.absences[classroomId];
      }

      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.get(`/classroom/absence/${classroomId}`);
        console.log('Response from API:', response.data);

        if (response.data.absences) {
          // Store only the absences array by classroom ID
          this.absences[classroomId] = response.data.absences;
          console.log('Fetched absences:', this.absences[classroomId]); // Log the stored absences
        } else {
          this.error = 'No absences found in the response';
        }
      } catch (error) {
        console.error('Error fetching absences:', error);
        this.error = error.response?.data?.message || 'Network error while fetching absences';
      } finally {
        this.isLoading = false;
      }
    },
  },
});