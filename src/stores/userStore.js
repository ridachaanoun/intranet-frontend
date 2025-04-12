import { defineStore } from 'pinia';
import api from '@/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
    isfitch: false,
  }),
  actions: {
    async fetchUserData() {
      this.isLoading = true;
      this.error = null;
      if (this.isFetched) {
        // If data is already fetched, skip the API call
        return;
      }
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