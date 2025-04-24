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
       
      if (this.isFetched) {
        // If data is already fetched, skip the API call
        return;
      }
      this.isLoading = true;
      this.error = null;
      try {
        const response = await api.get('/user/details');
        this.user = response.data.user;
        this.isFetched = true
      } catch (error) {
        this.error = error.message || 'Failed to fetch user data';
      } finally {
        this.isLoading = false;
      }
    },
  },
});