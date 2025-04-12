import { defineStore } from 'pinia';
import api from '@/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUserData() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.get('/user/details');
        this.user = response.data.user;
      } catch (error) {
        this.error = error.message || 'Failed to fetch user data';
      } finally {
        this.isLoading = false;
      }
    },
  },
});