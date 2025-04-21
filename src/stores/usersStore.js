import { defineStore } from 'pinia';
import api from '@/axios';

export const useUsersStore = defineStore('userStore', {
  state: () => ({
    users: [],
    filters: {
      query: '',
      role: '',
      campus: '',
      level: '',
      per_page: 10,
      page: 1
    },
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0
    },
    loading: false
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await api.get('/users/search', { params: this.filters });
        this.users = response.data.users;
        this.pagination = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total
        };
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },
    setFilter(key, value) {
      this.filters[key] = value;
      this.filters.page = 1; 
      this.fetchUsers();
    },
    setPage(page) {
      this.filters.page = page;
      this.fetchUsers();
    }
  }
});