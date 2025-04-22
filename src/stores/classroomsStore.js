import { defineStore } from 'pinia';
import api from '@/axios';

export const useClassroomsStore = defineStore('classroomsStore', {
  state: () => ({
    classrooms: [],
    filters: {
      query: '',
      campus: '',
      level: '',
      per_page: 10,
      page: 1,
    },
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    },
    loading: false,
  }),
  actions: {
    async fetchClassrooms() {
      this.loading = true;
      try {
        const response = await api.get('/classrooms/search', { params: this.filters });
        this.classrooms = response.data.classrooms;
        this.pagination = {
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        };
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      } finally {
        this.loading = false;
      }
    },
    setFilter(key, value) {
      this.filters[key] = value;
      this.filters.page = 1;
      this.fetchClassrooms();
    },
    setPage(page) {
      this.filters.page = page;
      this.fetchClassrooms();
    },
  },
});