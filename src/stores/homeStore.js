import { defineStore } from 'pinia';
import api from '@/axios';

export const usehomeStore = defineStore('home', {
  state: () => ({
    hallOfFame: null,
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
      } catch (error) {
        this.error = error.message || 'Failed to fetch data';
      } finally {
        this.isLoading = false;
        console.log(this.hallOfFame);
        
      }
    },
  },
});