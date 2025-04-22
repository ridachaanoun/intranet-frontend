<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="!loadingPersonal && !loadingAccount && $emit('close')"></div>
    <div class="relative bg-surface rounded-xl shadow-lg glass-effect w-full max-w-2xl mx-4 p-6 fade-in overflow-y-auto" style="max-height: 90vh;">
      <div class="flex justify-between items-center mb-6 border-b border-background-light pb-4">
        <h3 class="text-xl font-semibold text-text-primary">Edit User: {{ user?.name }}</h3>
        <button 
          @click="$emit('close')" 
          class="text-text-secondary hover:text-text-primary transition-colors"
          :disabled="loadingPersonal || loadingAccount"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="fetchingData" class="py-16 flex flex-col items-center justify-center">
        <div class="loader-large mb-4"></div>
        <p class="text-text-secondary">Loading user data...</p>
      </div>

      <div v-else>
        <!-- Tabs -->
        <div class="flex mb-6">
          <button 
            @click="activeTab = 'personal'" 
            class="flex-1 pb-2 border-b-2 transition-colors" 
            :class="activeTab === 'personal' ? 'border-accent-400 text-accent-400' : 'border-transparent text-text-secondary'"
          >
            Personal Information
          </button>
          <button 
            @click="activeTab = 'account'" 
            class="flex-1 pb-2 border-b-2 transition-colors" 
            :class="activeTab === 'account' ? 'border-accent-400 text-accent-400' : 'border-transparent text-text-secondary'"
          >
            Account Information
          </button>
        </div>

        <!-- Personal Info Form -->
        <div v-if="activeTab === 'personal'" class="space-y-4 fade-in">
          <form @submit.prevent="submitPersonalInfo">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">First Name</label>
                <input 
                  v-model="personalInfo.first_name" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Last Name</label>
                <input 
                  v-model="personalInfo.last_name" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">ID Card/CNIE</label>
                <input 
                  v-model="personalInfo.id_card_cnie" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Birthdate</label>
                <input 
                  v-model="personalInfo.birthdate" 
                  type="date"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">City</label>
                <input 
                  v-model="personalInfo.city" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Phone</label>
                <input 
                  v-model="personalInfo.phone" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input 
                  v-model="personalInfo.email" 
                  type="email"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                type="button" 
                @click="$emit('close')" 
                class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-element transition-colors"
                :disabled="loadingPersonal"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors flex items-center justify-center"
                :disabled="loadingPersonal"
              >
                <span v-if="loadingPersonal" class="loader mr-2"></span>
                <span v-if="!loadingPersonal">Save Changes</span>
                <span v-else>Saving...</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Account Info Form -->
        <div v-if="activeTab === 'account'" class="space-y-4 fade-in">
          <form @submit.prevent="submitAccountInfo">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Campus</label>
                <select 
                  v-model="accountInfo.campus" 
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                >
                  <option v-for="campus in campuses" :key="campus.value" :value="campus.value">
                    {{ campus.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Registration Date</label>
                <input 
                  v-model="accountInfo.registration_date" 
                  type="date"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Promotion</label>
                <select 
                  v-model="accountInfo.promotion_id" 
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                >
                  <option v-for="promotion in promotions" :key="promotion.id" :value="promotion.id">
                    {{ promotion.year }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Email Login</label>
                <input 
                  v-model="accountInfo.email_login" 
                  type="email"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Username</label>
                <input 
                  v-model="accountInfo.username" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">Discord Username</label>
                <input 
                  v-model="accountInfo.discord_username" 
                  type="text"
                  class="w-full bg-background-element border border-background-light rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-400"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                type="button" 
                @click="$emit('close')" 
                class="px-4 py-2 rounded-lg border border-background-light text-text-primary hover:bg-background-element transition-colors"
                :disabled="loadingAccount"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors flex items-center justify-center"
                :disabled="loadingAccount"
              >
                <span v-if="loadingAccount" class="loader mr-2"></span>
                <span v-if="!loadingAccount">Save Changes</span>
                <span v-else>Saving...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import api from '@/axios';
import Swal from 'sweetalert2';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close','handleUpdateUser']);

const appStore = useAppStore();
const activeTab = ref('personal');
const loadingPersonal = ref(false);
const loadingAccount = ref(false);
const fetchingData = ref(false);

// Form data
const personalInfo = ref({
  first_name: '',
  last_name: '',
  id_card_cnie: '',
  birthdate: '',
  city: '',
  phone: '',
  email: ''
});

const accountInfo = ref({
  campus: '',
  registration_date: '',
  promotion_id: '',
  email_login: '',
  username: '',
  discord_username: ''
});

// Lists
const campuses = appStore.campuses; 
const promotions = ref([]);

// Fetch user data
const fetchUserData = async () => {
  fetchingData.value = true;
  try {
    const userDetailsResponse = await api.get(`/user-details/${props.user.id}`);
    if (userDetailsResponse.data && userDetailsResponse.data.user) {
      // Personal Info
      if (userDetailsResponse.data.user.personal_info) {
        personalInfo.value = { ...userDetailsResponse.data.user.personal_info };
      }
      // Account Info
      if (userDetailsResponse.data.user.account_info) {
        accountInfo.value = { ...userDetailsResponse.data.user.account_info };
      }
    }
    // Fetch promotions
    const promotionsResponse = await api.get('/promotions');
      promotions.value = await promotionsResponse.data.promotions;

  } catch (error) {
    console.error('Error fetching user data:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load user data. Please try again.',
      confirmButtonColor: '#d33'
    });
  } finally {
    fetchingData.value = false;
  }
};

// Submit personal info form
const submitPersonalInfo = async () => {
  loadingPersonal.value = true;
  try {
    await api.put(`/user/${props.user.id}/personal-info`, personalInfo.value);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Personal information updated successfully!',
      confirmButtonColor: '#3085d6'
    });
    emit('close');
    emit('handleUpdateUser', props.user, 'personal information was updated');
  } catch (error) {
    console.error('Error updating personal info:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update personal information. Please try again.',
      confirmButtonColor: '#d33'
    });
  } finally {
    loadingPersonal.value = false;
  }
};

// Submit account info form
const submitAccountInfo = async () => {
  loadingAccount.value = true;
  try {
    await api.put(`/user/${props.user.id}/account-info`, accountInfo.value);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Account information updated successfully!',
      confirmButtonColor: '#3085d6'
    });
    emit('close');
    emit('handleUpdateUser', props.user, 'account information was updated');
  } catch (error) {
    console.error('Error updating account info:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update account information. Please try again.',
      confirmButtonColor: '#d33'
    });
  } finally {
    loadingAccount.value = false;
  }
};

onMounted(fetchUserData);
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.loader {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

.loader-large {
  border: 3px solid rgba(var(--accent-400, 100 116 228), 0.3);
  border-top: 3px solid rgb(var(--accent-400, 100 116 228));
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>