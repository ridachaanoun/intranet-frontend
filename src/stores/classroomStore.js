import { defineStore } from 'pinia';
import api from '@/axios';

export const useClassroomStore = defineStore('classroom', {
  state: () => ({
    classroom: null,
    loading: false,
    error: null,
    isfitch: false,
  }),
  actions: {
    async fetchClassroom() {
      this.loading = true;
      this.error = null;
      if (this.isFetched) {
        // If data is already fetched, skip the API call
        return;
      }
      try {
        const response = await api.get('user/classroom');
        this.classroom = response.data;
        this.isFetched = true
      } catch (error) {
        console.error('Error fetching classroom data:', error);
        this.error = (error.response.data.message) || 'Error fetching classroom data';
      } finally {
        this.loading = false;
        console.log(this.classroom);
        
      }
    },
  },
});