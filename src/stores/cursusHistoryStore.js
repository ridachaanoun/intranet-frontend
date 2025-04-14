import { defineStore } from 'pinia';
import api from '@/axios';

export const usecursusHistory = defineStore('cursusHistory', {
  state: () => ({
    cursusHistory: null,
    loaded: false,
    error: null,
    isfitch: true,
  }),
  actions: {
    async fetchCursusHistory() {
      this.error = null;
      if (this.isFetched) {
        // If data is already fetched, skip the API call
        return;
      }
      try {
        const response = await api.get(`user/cursus-history`);
        this.cursusHistory = response.data.cursus_history;
        this.isFetched = true
      } catch (error) {
        console.error('Error fetching cursus-history data:', error);
        this.error = (error.response.data.message) || 'Error fetching absences data';
      } finally {
        this.loaded = true;
        console.log(this.cursusHistory);
        
      }
    },
  },
});