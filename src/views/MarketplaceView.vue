<template>
    <div>
      <!-- Page Header with Points Display -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="relative">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent inline-block">
            YouCode Store
          </h1>
          <div class="h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full w-3/4 mt-1"></div>
        </div>
        <div class="flex items-center space-x-3 mt-4 md:mt-0">
          <div class="glass-effect rounded-full py-2 px-4 flex items-center shadow-glow">
            <i class="fas fa-coins text-yellow-500 mr-2"></i>
            <span class="text-text-secondary text-sm mr-2">Your Balance:</span>
            <span class="text-primary-400 font-medium text-lg">{{ userPoints }} YC</span>
          </div>
        </div>
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
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <!-- Product Card -->
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-surface rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
        >
          <a href="#" @click.prevent="showPurchaseModal(product)" class="block">
            <div class="relative">
              <!-- Product Image -->
              <div class="w-full aspect-square overflow-hidden">
                <img 
                  :src="product.image" 
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
        </div>
  
        <!-- Empty State -->
        <div 
          v-if="filteredProducts.length === 0" 
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
      
      <!-- Purchase Confirmation Modal -->
      <div 
        v-if="isPurchaseModalVisible" 
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
                  :src="selectedProduct?.image" 
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
            >
              Cancel
            </button>
            <button 
              @click="confirmPurchase" 
              class="flex-1 py-3 px-4 rounded-xl text-white bg-primary-500 hover:bg-primary-600 transition-colors"
              :disabled="userPoints < (selectedProduct?.price || 0)"
              :class="{'opacity-50 cursor-not-allowed': userPoints < (selectedProduct?.price || 0)}"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
      
      <!-- Toast Notification -->
      <div class="fixed top-4 right-4 z-50 space-y-2">
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          class="bg-surface rounded-lg shadow-card p-4 w-80 transform transition-all duration-300 flex"
          :class="{
            'border-l-4 border-green-500': toast.type === 'success',
            'border-l-4 border-red-500': toast.type === 'error'
          }"
        >
          <div class="mr-3">
            <i 
              class="fas fa-2x" 
              :class="{
                'fa-check-circle text-green-500': toast.type === 'success',
                'fa-exclamation-circle text-red-500': toast.type === 'error'
              }"
            ></i>
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-text-primary">{{ toast.title }}</h4>
            <p class="text-sm text-text-secondary">{{ toast.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Reactive data
  const searchQuery = ref('')
  const userPoints = ref(2500)
  const isPurchaseModalVisible = ref(false)
  const selectedProduct = ref(null)
  const toasts = ref([])
  let toastId = 0
  
  // Products data
  const products = ref([
    {
      id: 1,
      name: 'Souris',
      price: 1100,
      image: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg',
      description: 'Souris sans fil ergonomique'
    },
    {
      id: 2,
      name: 'Clavier',
      price: 1500,
      image: 'https://m.media-amazon.com/images/I/81yJGRUE2-L._AC_SL1500_.jpg',
      description: 'Clavier mécanique RGB'
    },
    {
      id: 3,
      name: 'Casque',
      price: 1800,
      image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1000_.jpg',
      description: 'Casque audio avec réduction de bruit'
    },
    {
      id: 4,
      name: 'Clé USB 64GB',
      price: 900,
      image: 'https://m.media-amazon.com/images/I/71nz3cIcFOL._AC_SL1500_.jpg',
      description: 'Clé USB 3.0 avec 64GB de stockage'
    },
    {
      id: 5,
      name: 'Sac à dos',
      price: 1700,
      image: 'https://m.media-amazon.com/images/I/81oKhu+bENL._AC_SL1500_.jpg',
      description: 'Sac à dos pour ordinateur portable'
    },
    {
      id: 6,
      name: 'Chargeur sans fil',
      price: 1200,
      image: 'https://m.media-amazon.com/images/I/61ERwd8NgfL._AC_SL1010_.jpg',
      description: 'Chargeur sans fil rapide 15W'
    },
    {
      id: 7,
      name: 'Batterie externe',
      price: 1600,
      image: 'https://m.media-amazon.com/images/I/71r1iRFx3-L._AC_SL1500_.jpg',
      description: 'Batterie externe 20000mAh'
    },
    {
      id: 8,
      name: 'Support téléphone',
      price: 800,
      image: 'https://m.media-amazon.com/images/I/51KvlJOOmDL._AC_SL1200_.jpg',
      description: 'Support téléphone ajustable pour bureau'
    },
    {
      id: 9,
      name: 'T-shirt YouCode',
      price: 1000,
      image: 'https://m.media-amazon.com/images/I/61yhBkU3uRL._AC_SL1100_.jpg',
      description: 'T-shirt à l\'effigie de YouCode'
    },
    {
      id: 10,
      name: 'Carnet de notes',
      price: 600,
      image: 'https://m.media-amazon.com/images/I/712aj2SrPVL._AC_SL1500_.jpg',
      description: 'Carnet de notes premium'
    }
  ])
  
  // Computed properties
  const filteredProducts = computed(() => {
    if (!searchQuery.value) {
      return products.value
    }
    
    const query = searchQuery.value.toLowerCase()
    return products.value.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    )
  })
  
  // Methods
  function showPurchaseModal(product) {
    selectedProduct.value = product
    isPurchaseModalVisible.value = true
  }
  
  function closePurchaseModal() {
    isPurchaseModalVisible.value = false
    setTimeout(() => {
      selectedProduct.value = null
    }, 300)
  }
  
  function confirmPurchase() {
    if (userPoints.value >= selectedProduct.value.price) {
      userPoints.value -= selectedProduct.value.price
      showToast({
        title: 'Purchase Successful',
        message: `You purchased ${selectedProduct.value.name} for ${selectedProduct.value.price} YC points!`,
        type: 'success'
      })
      closePurchaseModal()
    } else {
      showToast({
        title: 'Insufficient Points',
        message: `You don't have enough YC points to purchase this item.`,
        type: 'error'
      })
    }
  }
  
  function showToast({ title, message, type = 'info', duration = 3000 }) {
    const id = toastId++
    
    toasts.value.push({
      id,
      title,
      message,
      type
    })
    
    setTimeout(() => {
      toasts.value = toasts.value.filter(toast => toast.id !== id)
    }, duration)
  }
  </script>