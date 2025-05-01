<template>
    <div>
      <!-- Page Header with Points Display (only visible to students) -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="relative">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block">
            YouCode Store
          </h1>
          <div class="h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full w-3/4 mt-1"></div>
        </div>
        <div v-if="user.role === 'student'" class="flex items-center space-x-3 mt-4 md:mt-0">
          <div class="glass-effect rounded-full py-2 px-4 flex items-center shadow-glow">
            <i class="fas fa-coins text-yellow-500 mr-2"></i>
            <span class="text-text-secondary text-sm mr-2">Your Balance:</span>
            <span class="text-primary-400 font-medium text-lg">{{ userPoints }} YC</span>
          </div>
        </div>
      </div>

      <!-- Non-student message (only for admins and teachers) -->
      <div v-if="user.role !== 'student'" class="bg-surface-hover p-4 rounded-xl mb-8 text-center">
        <p class="text-text-secondary mb-2"><i class="fas fa-info-circle mr-2"></i> You are viewing the store as a {{ user.role }}.</p>
        <p class="text-text-muted text-sm">Only students can make purchases in the store.</p>
      </div>
      <div v-if="user.role === 'admin'" class="flex justify-end mb-6">
      <button 
        @click="addProductModal = true"
        class="px-5 py-2 bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors flex items-center space-x-2"
      >
        <i class="fas fa-plus mr-1"></i>
        <span>Add Product</span>
      </button>
    </div>

      <!-- Search Bar -->
      <div class="bg-surface rounded-xl shadow-card p-6 mb-8 glass-effect">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="bg-surface-hover w-full rounded-full px-5 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400 pr-12"
          >
          <button class="absolute right-4 top-3 text-primary-400 hover:text-primary-300 transition-colors">
            <i class="fas fa-search text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Product Grid -->
      <div v-if="isLoading && marketplaceStore.products.length === 0" class="flex justify-center items-center h-64">
        <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <!-- Product Card -->
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-surface rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- For students: clickable link to purchase -->
          <a v-if="user.role === 'student'" href="#" @click.prevent="showPurchaseModal(product)" class="block">
            <div class="relative">
              <!-- Product Image -->
              <div class="w-full aspect-square overflow-hidden">
                <img 
                  :src="product.image_url" 
                  :alt="product.name" 
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Product Name -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-dark/90 to-transparent p-3">
                <div class="text-white font-medium">{{ product.name }}</div>
              </div>
            </div>
            <!-- Price -->
            <div class="p-3 bg-surface-hover flex justify-center items-center">
              <div class="text-primary-500 font-bold">
                {{ product.price }} YC
              </div>
            </div>
          </a>

          <!-- For non-students: non-clickable display -->
          <div v-else class="block">
            <div class="relative">
              <!-- Product Image -->
              <div class="w-full aspect-square overflow-hidden">
                <img 
                  :src="product.image_url" 
                  :alt="product.name" 
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Product Name -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-dark/90 to-transparent p-3">
                <div class="text-white font-medium">{{ product.name }}</div>
              </div>
            </div>
            <!-- Price -->
            <div class="p-3 bg-surface-hover flex justify-center items-center">
              <div class="text-primary-500 font-bold">
                {{ product.price }} YC
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredProducts.length === 0 && !isLoading" 
          class="col-span-full py-16 flex flex-col items-center justify-center text-text-secondary"
        >
          <i class="fas fa-search text-4xl mb-4 text-text-muted"></i>
          <p>No products found matching your search.</p>
          <button 
            @click="searchQuery = ''" 
            class="mt-4 px-4 py-2 text-sm bg-primary-500/10 text-primary-400 rounded-full hover:bg-primary-500/20 transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="marketplaceStore.currentPage < marketplaceStore.totalPages" class="flex justify-center mt-8">
        <button 
          @click="loadMoreProducts"
          :disabled="isLoadingMore" 
          class="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
          :class="{'opacity-75 cursor-wait': isLoadingMore}"
        >
          <svg v-if="isLoadingMore" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{{ isLoadingMore ? 'Loading...' : 'Load More' }}</span>
        </button>
      </div>
      
      <!-- Purchase Confirmation Modal (only visible to students) -->
      <div 
        v-if="isPurchaseModalVisible && user.role === 'student'" 
        class="fixed inset-0 flex items-center justify-center z-50 bg-background-dark/80 backdrop-blur-sm"
      >
        <div 
          class="bg-surface p-6 rounded-2xl shadow-card max-w-md w-full mx-4 transform transition-all duration-300"
          :class="{'scale-100 opacity-100': isPurchaseModalVisible, 'scale-95 opacity-0': !isPurchaseModalVisible}"
        >
          <div class="text-center mb-5">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
              <i class="fas fa-shopping-cart text-3xl text-primary-500"></i>
            </div>
            <h3 class="text-xl font-bold text-text-primary">Confirm Purchase</h3>
            <p class="text-text-secondary mt-2">
              Are you sure you want to purchase {{ selectedProduct?.name }} for {{ selectedProduct?.price }} YC?
            </p>
          </div>
          
          <div class="flex justify-between items-center bg-surface-hover p-3 rounded-xl mb-5">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  :src="selectedProduct?.image_url" 
                  :alt="selectedProduct?.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <p class="font-medium text-text-primary">{{ selectedProduct?.name }}</p>
                <p class="text-xs text-text-secondary">{{ selectedProduct?.description }}</p>
              </div>
            </div>
            <div class="text-primary-500 font-bold">
              {{ selectedProduct?.price }} YC
            </div>
          </div>
          
          <div class="flex items-center justify-between mb-5">
            <div class="text-text-secondary">
              <p>Current Balance:</p>
              <p>Cost:</p>
              <p class="font-medium text-text-primary">Remaining Balance:</p>
            </div>
            <div class="text-right">
              <p>{{ userPoints }} YC</p>
              <p>-{{ selectedProduct?.price }} YC</p>
              <p class="font-medium" :class="{'text-red-500': userPoints < (selectedProduct?.price || 0), 'text-primary-500': userPoints >= (selectedProduct?.price || 0)}">
                {{ userPoints - (selectedProduct?.price || 0) }} YC
              </p>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="closePurchaseModal" 
              class="flex-1 py-3 px-4 rounded-xl text-text-secondary bg-surface-hover hover:bg-surface-active transition-colors"
              :disabled="isPurchaseLoading"
              :class="{ 'opacity-50 cursor-not-allowed': isPurchaseLoading }"
            >
              Cancel
            </button>
            <button 
              @click="confirmPurchase" 
              class="flex-1 py-3 px-4 rounded-xl text-white bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center"
              :disabled="userPoints < (selectedProduct?.price || 0) || isPurchaseLoading"
              :class="{
                'opacity-50 cursor-not-allowed': userPoints < (selectedProduct?.price || 0) || isPurchaseLoading
              }"
            >
              <svg v-if="isPurchaseLoading" class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{{ isPurchaseLoading ? 'Processing...' : 'Confirm Purchase' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <AddProductModal v-if="addProductModal"
      @close="addProductModal = false" 
      @product-added="handleProductAdded"
    />
  </template>

  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useMarketplaceStore } from '@/stores/marketplaceStore';
  import Swal from 'sweetalert2';
  import { useUserStore } from '@/stores/userStore';
  import api from '@/axios';
  import AddProductModal from '@/components/teacher/AddProductModal.vue';

  const marketplaceStore = useMarketplaceStore();
  const userStore = useUserStore();
  const user = computed(()=>userStore.user);
  const isPurchaseLoading = ref(false);

  // Reactive data
  const userPoints = ref(user.value.role === 'student' ? (user.value.Total_points || 0) : 0);
  const searchQuery = ref('');
  const selectedProduct = ref(null);
  const isPurchaseModalVisible = ref(false);
  const isLoadingMore = ref(false);
  const addProductModal = ref(false);

  // Computed properties
  const isLoading = computed(() => marketplaceStore.isLoading);
  const filteredProducts = computed(() => {
    if (!searchQuery.value) {
      return marketplaceStore.products
    }

    const query = searchQuery.value.toLowerCase();
    return marketplaceStore.products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    )
  })

  // Methods
  function showPurchaseModal(product) {
    // Only allow students to purchase
    if (user.value.role !== 'student') {
      Swal.fire({
        icon: 'info',
        title: 'Access Restricted',
        text: 'Only students can make purchases in the store.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#1e293b',
        color: '#e2e8f0'
      });
      return;
    }
    
    selectedProduct.value = product;
    isPurchaseModalVisible.value = true;
  }

  function closePurchaseModal() {
    isPurchaseModalVisible.value = false
      selectedProduct.value = null
  }

  async function confirmPurchase() {
    // Only allow students to purchase
    if (user.value.role !== 'student') {
      closePurchaseModal();
      return;
    }

    if (userPoints.value >= selectedProduct.value.price) {
  try {
    isPurchaseLoading.value = true;
    // Make API call to save the purchase
    const response = await api.post(`/products/${selectedProduct.value.id}/buy`);

    // Check if the purchase was successful
    if (response.data.message === 'Product purchased successfully') {
      user.value.Total_points -= selectedProduct.value.price;
      userPoints.value -= selectedProduct.value.price; 
      
      // Styled success message
      Swal.fire({
        icon: 'success',
        title: 'Purchase Successful',
        text: `You purchased ${selectedProduct.value.name} for ${selectedProduct.value.price} YC points!`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        iconColor: '#10b981',
        customClass: {
          popup: 'colored-toast',
          title: 'toast-title',
          timerProgressBar: 'timer-progress'
        },
        background: '#1e293b',
        color: '#e2e8f0'
      });

      closePurchaseModal();
    }
  } catch (error) {
    // Handle API error
    Swal.fire({
      icon: 'error',
      title: 'Purchase Failed',
      text: 'An error occurred while processing your purchase. Please try again later.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      iconColor: '#ef4444',
      customClass: {
        popup: 'colored-toast',
        title: 'toast-title',
        timerProgressBar: 'timer-progress'
      },
      background: '#1e293b',
      color: '#e2e8f0'
    });
  }
    } else {
      // Styled error message for insufficient points
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Points',
        text: `You don't have enough YC points to purchase this item.`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        iconColor: '#ef4444',
        customClass: {
          popup: 'colored-toast',
          title: 'toast-title',
          timerProgressBar: 'timer-progress'
        },
        background: '#1e293b',
        color: '#e2e8f0'
      });
    }
  }

  async function loadMoreProducts() {
    if (marketplaceStore.currentPage < marketplaceStore.totalPages && !isLoadingMore.value) {
      isLoadingMore.value = true;
      
      try {
        await marketplaceStore.fetchProducts(marketplaceStore.currentPage + 1);
      } catch (error) {
        // Styled error message
        Swal.fire({
          icon: 'error',
          title: 'Error Loading Products',
          text: 'Failed to load more products. Please try again.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          iconColor: '#ef4444', // Red color
          customClass: {
            popup: 'colored-toast',
            title: 'toast-title',
            timerProgressBar: 'timer-progress'
          },
          background: '#1e293b', // Dark background
          color: '#e2e8f0' // Light text
        });
      } finally {
        isLoadingMore.value = false;
      }
    }
  }

  // Fetch products on mount
  onMounted(() => {
    marketplaceStore.fetchProducts();
  });

  function handleProductAdded(newProduct) {
  marketplaceStore.products.unshift(newProduct);
  addProductModal.value = false;
}
  </script>

  <style>
  /* Custom styles for SweetAlert2 toasts */
  .colored-toast {
    border-radius: 1rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    border-left: 4px solid;
    padding: 1rem !important;
  }

  .colored-toast.swal2-icon-success {
    border-color: #10b981 !important;
  }

  .colored-toast.swal2-icon-error {
    border-color: #ef4444 !important;
  }

  .colored-toast.swal2-icon-info {
    border-color: #3b82f6 !important;
  }

  .toast-title {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    margin-bottom: 0.25rem !important;
  }

  .timer-progress {
    background: rgba(255, 255, 255, 0.2) !important;
  }
  </style>