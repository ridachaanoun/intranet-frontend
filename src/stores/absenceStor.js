import { defineStore } from 'pinia';
import api from '@/axios';

export const useAbsencesStore = defineStore('absences', {
  state: () => ({
    absences: null,
    loaded: false,
    error: null,
    isfitch: true,
  }),
  actions: {
    async fetchAbsence(id) {
      this.error = null;
      if (this.isFetched) {
        // If data is already fetched, skip the API call
        return;
      }
      try {
        const response = await api.get(`/user/absences/${id}`);
        this.absences = response.data;
        this.isFetched = true
      } catch (error) {
        console.error('Error fetching classroom data:', error);
        this.error = (error.response.data.message) || 'Error fetching absences data';
      } finally {
        this.loaded = true;
        console.log(this.absences);
        
      }
    },
  },
});