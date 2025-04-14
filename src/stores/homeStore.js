import { defineStore } from 'pinia';
import api from '@/axios';

export const usehomeStore = defineStore('home', {
  state: () => ({
    hallOfFame: null,
    announcements: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.get('/hall-of-fame');
        this.hallOfFame = response.data.data;
        const announcements = await api.get('/announcements');
        this.announcements = announcements.data.announcements;
      } catch (error) {
        this.error = 'Failed to fetch data';
      } finally {
        this.isLoading = false;
        
      }
    },
  },
});