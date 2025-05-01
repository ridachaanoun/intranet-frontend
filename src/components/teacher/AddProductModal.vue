<template>
  <div 
    class="fixed inset-0 flex items-center justify-center z-50 bg-background-dark/80 backdrop-blur-sm"
  >
    <div 
      class="bg-surface p-6 rounded-2xl shadow-card max-w-md w-full mx-4 transform transition-all duration-300 scale-100 opacity-100"
    >
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-xl font-bold text-text-primary">Add New Product</h3>
        <button 
          @click="emit('close')" 
          class="text-text-secondary hover:text-text-primary transition-colors"
          :disabled="isSubmitting"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Product Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-text-secondary mb-1">Product Name</label>
          <input 
            id="name" 
            v-model="formData.name" 
            type="text" 
            class="bg-surface-hover w-full rounded-xl px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Enter product name"
            required
          />
        </div>

        <!-- Product Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-text-secondary mb-1">Price (YC)</label>
          <input 
            id="price" 
            v-model="formData.price" 
            type="number" 
            min="1"
            class="bg-surface-hover w-full rounded-xl px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Enter price in YC points"
            required
          />
        </div>

        <!-- Product Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-text-secondary mb-1">Description</label>
          <textarea 
            id="description" 
            v-model="formData.description" 
            rows="3"
            class="bg-surface-hover w-full rounded-xl px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <!-- Product Image -->
        <div>
          <label for="image" class="block text-sm font-medium text-text-secondary mb-1">Product Image</label>
          <div class="flex items-center space-x-3">
            <div 
              class="bg-surface-hover rounded-xl border-2 border-dashed border-text-muted p-4 flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors"
              @click="triggerFileInput"
              :class="{'border-primary-400': imagePreview}"
            >
              <input 
                id="image" 
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageChange"
              />
              <div v-if="!imagePreview" class="text-center">
                <i class="fas fa-cloud-upload-alt text-3xl text-text-muted mb-2"></i>
                <p class="text-xs text-text-muted">Click to upload</p>
              </div>
              <img v-else :src="imagePreview" class="h-20 w-20 object-cover rounded-md" />
            </div>
            <div v-if="imagePreview" class="flex-1">
              <p class="text-sm text-text-primary truncate">{{ formData.image.name }}</p>
              <button 
                type="button" 
                @click="clearImage" 
                class="text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                Remove image
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end pt-2">
          <button 
            type="submit"
            class="px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors flex items-center space-x-2"
            :disabled="isSubmitting"
            :class="{'opacity-75 cursor-wait': isSubmitting}"
          >
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{{ isSubmitting ? 'Saving...' : 'Add Product' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import Swal from 'sweetalert2';
import api from '@/axios';


const emit = defineEmits(['close', 'product-added']);

const fileInput = ref(null);
const imagePreview = ref(null);
const isSubmitting = ref(false);

const formData = reactive({
  name: '',
  price: '',
  description: '',
  image: null
});

function triggerFileInput() {
  fileInput.value.click();
}

function handleImageChange(e) {
  URL.revokeObjectURL(imagePreview.value);
  formData.image = e.target.files[0];
  imagePreview.value = URL.createObjectURL(e.target.files[0]);
}

function clearImage() {
  URL.revokeObjectURL(imagePreview.value);
  formData.image = null;
  imagePreview.value = null;
  fileInput.value.value = null;
}

onBeforeUnmount(() => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview);
  }
})

async function submitForm() {
  if (!formData.image) {
    Swal.fire({
      icon: 'error',
      title: 'Image Required',
      text: 'Please upload a product image',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      iconColor: '#ef4444',
      background: '#1e293b',
      color: '#e2e8f0'
    });
    return;
  }

  isSubmitting.value = true;
  
  try {
    // Create FormData object to send multipart/form-data
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name);
    apiFormData.append('price', formData.price);
    apiFormData.append('description', formData.description);
    apiFormData.append('image', formData.image);
    
    // Make API call to create new product
    const response = await api.post('/products', apiFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Display success message
    Swal.fire({
      icon: 'success',
      title: 'Product Added',
      text: `${formData.name} has been added to the store!`,
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
    
    // Emit event to parent component to refresh products
    emit('product-added', response.data);
    
    // Close modal and reset form
    emit('close');
  } catch (error) {
    console.error('Error adding product:', error);
    
    // Display error message
    Swal.fire({
      icon: 'error',
      title: 'Failed to Add Product',
      text: error.response?.data?.message || 'An unexpected error occurred',
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
  } finally {
    isSubmitting.value = false;
  }
}
</script>