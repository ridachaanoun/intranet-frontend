import { defineStore } from 'pinia';
import api from '@/axios';

export const useMarketplaceStore = defineStore('marketplace', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
    fetchedPages: new Set(), // Track fetched pages
    currentPage: 1,
    totalPages: 1,
  }),

  actions: {
    async fetchProducts(page = 1, perPage = 20) {
      // Check if the page has already been fetched
      if (this.fetchedPages.has(page)) {
        console.log(`Page ${page} has already been fetched. Skipping API call.`);
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const response = await api.get(`/products?page=${page}&per_page=${perPage}`);
        const { data, current_page, last_page } = response.data[0];

          this.products = [...this.products, ...data];

        this.currentPage = current_page;
        this.totalPages = last_page;

        this.fetchedPages.add(page);
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products. Please try again later.';
      } finally {
        this.isLoading = false;
      }
    },

    resetStore() {
      this.products = [];
      this.isLoading = false;
      this.error = null;
      this.fetchedPages.clear(); 
      this.currentPage = 1;
      this.totalPages = 1;
    },
  },
});