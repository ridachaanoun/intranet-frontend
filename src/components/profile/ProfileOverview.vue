<template>
  <div class="profile-overview">
    <!-- Header Card with Bio and Social Links -->
    <div class="overview-card header-card">
      <div class="profile-intro">
        <div class="profile-intro-content">
          <h2 class="profile-name">{{ userData.firstName }} {{ userData.lastName }}</h2>
          <p class="profile-username">@{{ userData.username }}</p>
          
          <!-- Social Links Section -->
          <div class="social-links-section" v-if="hasSocialLinks">
            <h3 class="social-links-title">Connect with me</h3>
            <div class="social-links-grid">
              <!-- LinkedIn -->
              <a v-if="links.linkedin && links.linkedin !== 'null'" 
                :href="links.linkedin" 
                target="_blank"
                class="social-link linkedin">
                <span>LinkedIn</span>
              </a>

              <!-- GitHub -->
              <a v-if="links.github && links.github !== 'null'" 
                :href="links.github" 
                target="_blank"
                class="social-link github">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>

              <!-- Website -->
              <a v-if="links.website && links.website !== 'null'" 
                :href="links.website" 
                target="_blank"
                class="social-link website">
                <span>Website</span>
              </a>

              <!-- Codingame -->
              <a v-if="links.codingame && links.codingame !== 'null'" 
                :href="links.codingame" 
                target="_blank"
                class="social-link codingame">
                <span>Codingame</span>
              </a>

              <!-- HackerRank -->
              <a v-if="links.hackerrank && links.hackerrank !== 'null'" 
                :href="links.hackerrank" 
                target="_blank"
                class="social-link hackerrank">
                <span>HackerRank</span>
              </a>

              <!-- Codeforces -->
              <a v-if="links.codeforces && links.codeforces !== 'null'" 
                :href="links.codeforces" 
                target="_blank"
                class="social-link codeforces">
                <span>Codeforces</span>
              </a>

              <!-- Twitter -->
              <a v-if="links.twitter && links.twitter !== 'null'" 
                :href="links.twitter" 
                target="_blank"
                class="social-link twitter">
                <span>Twitter</span>
              </a>

              <!-- Instagram -->
              <a v-if="links.instagram && links.instagram !== 'null'" 
                :href="links.instagram" 
                target="_blank"
                class="social-link instagram">
                <span>Instagram</span>
              </a>

              <!-- Facebook -->
              <a v-if="links.facebook && links.facebook !== 'null'" 
                :href="links.facebook" 
                target="_blank"
                class="social-link facebook">
                <span>Facebook</span>
              </a>
            </div>
          </div>
          <div class="no-links-message" v-else>
            <p>No social links added yet</p>
          </div>
          <button class="add-links-btn" @click="openModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="add-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Social Links
          </button>
        </div>
      </div>
    </div>

    <!-- Personal Information Card -->
    <div class="overview-card info-card">
      <div class="card-header">
        <h3>Personal Information</h3>
        <span class="card-badge">Basic</span>
      </div>
      
      <div class="info-grid">
        <div class="info-item" v-for="(value, label) in personalInfo" :key="label">
          <div class="info-label">{{ label }}</div>
          <div class="info-value">{{ value }}</div>
        </div>
      </div>
    </div>
    
    <!-- Academic Information Card -->
    <div class="overview-card info-card">
      <div class="card-header">
        <h3>Academic Information</h3>
        <span class="card-badge academy">YouCode</span>
      </div>
      
      <div class="info-grid">
        <div class="info-item" v-for="(value, label) in academicInfo" :key="label">
          <div class="info-label">{{ label }}</div>
          <div class="info-value">{{ value }}</div>
        </div>
      </div>
    </div>

<!-- Modal for Adding Social Links -->
<div class="fixed inset-0 z-50 flex items-start justify-center bg-background-dark bg-opacity-70 overflow-y-auto" v-if="isModalOpen">
  <div class="bg-background-card rounded-lg shadow-card max-w-md w-full p-6 mt-10 mb-10 mx-4">
    <!-- Modal Header -->
    <div class="border-b border-surface-muted pb-4 mb-4">
      <h3 class="text-xl font-semibold text-text-primary">Add Social Links</h3>
    </div>

    <!-- Modal Body -->
    <form @submit.prevent="saveSocialLinks" class="space-y-4">
      <div class="space-y-2" v-for="(url, key) in socialLinks" :key="key">
        <label :for="key" class="block text-sm font-medium text-text-secondary capitalize">{{ key }}</label>
        <input
          type="url"
          :id="key"
          v-model="socialLinks[key]"
          placeholder="Enter your {{ key }} URL"
          class="block w-full px-4 py-2 text-sm border border-surface-hover rounded-lg bg-background-light text-text-primary placeholder-text-muted focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <!-- Modal Actions -->
      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-text-primary bg-surface-muted rounded-lg hover:bg-surface-hover"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
        >
          Save Links
        </button>
      </div>
    </form>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import api from '@/axios';
import Swal from 'sweetalert2';

// Initialize the UserStore
const userStore = useUserStore();

// State for modal and social links
const isModalOpen = ref(false);
const socialLinks = ref({
  linkedin: '',
  github: '',
  website: '',
  codingame: '',
  hackerrank: '',
  codeforces: '',
  twitter: '',
  instagram: '',
  facebook: ''
});

// Map user data from userStore
const userData = computed(() => ({
  firstName: userStore.user?.personal_info?.first_name || 'N/A',
  lastName: userStore.user?.personal_info?.last_name || 'N/A',
  username: userStore.user?.account_info?.username || 'N/A',
  phoneNumber: userStore.user?.personal_info?.phone || 'N/A',
  youcodeEmail: userStore.user?.account_info?.email_login || 'N/A',
  personalEmail: userStore.user?.personal_info?.email || 'N/A',
  city: userStore.user?.personal_info?.city || 'N/A',
  level: userStore.user?.level || 'N/A',
  classroom: userStore.user?.classroom || 'N/A',
  referentCoach: userStore.user?.referent_coach || 'N/A',
  registrationDate: userStore.user?.created_at || 'N/A',
  campus: userStore.user?.account_info?.campus || 'N/A',
  promotion: userStore.user?.account_info?.promotion?.year || 'N/A',
  links: userStore.user?.profiles || {}
}));

// Extract personal and academic information
const personalInfo = computed(() => ({
  'First Name': userData.value.firstName,
  'Last Name': userData.value.lastName,
  'Phone': userData.value.phoneNumber,
  'YouCode Email': userData.value.youcodeEmail,
  'Personal Email': userData.value.personalEmail,
  'Username': `@${userData.value.username}`,
  'City': userData.value.city
}));

const academicInfo = computed(() => ({
  'Level': userData.value.level,
  'Classroom': userData.value.classroom,
  'Referent Coach': userData.value.referentCoach,
  'Registration Date': formatDate(userData.value.registrationDate),
  'Campus': userData.value.campus,
  'Promotion': userData.value.promotion
}));

// Extract links
const links = computed(() => userData.value.links);
console.log(links);
console.log(1);

// Check if any social links are available
const hasSocialLinks = computed(() =>
  Object.values(links.value).some(link => link && link !== 'null')
);

// Open the modal
const openModal = () => {
  isModalOpen.value = true;
  // Pre-fill the form with existing links
  Object.keys(socialLinks.value).forEach(key => {
    socialLinks.value[key] = userData.value.links[key] || '';
  });
};

// Close the modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Save social links
const saveSocialLinks = async () => {
  try {
    const userId = userStore.user?.id; // Replace with actual user ID
    const response = await api.put(`/user/${userId}/profile`, socialLinks.value);
    console.log(response.data.message);

    // Update the user data in the store
    userStore.user.profiles = response.data.profile;

    // Show success popup
    Swal.fire({
      icon: 'success',
      title: 'Links Updated!',
      text: 'Your social links have been successfully updated.',
      background: '#13113a', 
      color: '#f5f3ff', 
      confirmButtonColor: '#6224ff' 
    });

    closeModal();
  } catch (error) {
    console.error('Failed to save social links:', error);

    // Show error popup
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'There was an error saving your social links. Please try again.',
      background: '#1e1a54', // Custom background color (from Tailwind theme)
      color: '#f5f3ff', // Custom text color (from Tailwind theme)
      confirmButtonColor: '#ff3c00' // Custom button color
    });
  }
};

// Format date for better display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
};
</script>

  
  <style scoped>
  .profile-overview {
    display: grid;
    gap: 1.5rem;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .overview-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .overview-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  .header-card {
    background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
    position: relative;
    overflow: hidden;
  }
  
  .header-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  }
  
  .profile-intro {
    padding: 2rem;
    position: relative;
  }
  
  .profile-intro-content {
    position: relative;
    z-index: 2;
  }
  
  .profile-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }
  
  .profile-username {
    font-size: 1rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  
  .social-links-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
  
  .social-links-title {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
  
  .social-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.75rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    padding: 0.625rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: #4b5563;
    background-color: #f9fafb;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .social-link:hover {
    transform: translateY(-2px);
  }
  
  .social-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
  
  /* Social link specific colors */
  .social-link.linkedin:hover {
    background-color: rgba(10, 102, 194, 0.08);
    border-color: rgba(10, 102, 194, 0.3);
    color: #0a66c2;
  }
  
  .social-link.github:hover {
    background-color: rgba(36, 41, 47, 0.08);
    border-color: rgba(36, 41, 47, 0.3);
    color: #24292f;
  }
  
  .social-link.website:hover {
    background-color: rgba(79, 70, 229, 0.08);
    border-color: rgba(79, 70, 229, 0.3);
    color: #4f46e5;
  }
  
  .social-link.twitter:hover {
    background-color: rgba(29, 161, 242, 0.08);
    border-color: rgba(29, 161, 242, 0.3);
    color: #1da1f2;
  }
  
  .social-link.instagram:hover {
    background-color: rgba(225, 48, 108, 0.08);
    border-color: rgba(225, 48, 108, 0.3);
    color: #e1306c;
  }
  
  .social-link.facebook:hover {
    background-color: rgba(24, 119, 242, 0.08);
    border-color: rgba(24, 119, 242, 0.3);
    color: #1877f2;
  }
  
  .social-link.codingame:hover {
    background-color: rgba(247, 181, 0, 0.08);
    border-color: rgba(247, 181, 0, 0.3);
    color: #f7b500;
  }
  
  .social-link.hackerrank:hover {
    background-color: rgba(0, 175, 65, 0.08);
    border-color: rgba(0, 175, 65, 0.3);
    color: #00af41;
  }
  
  .no-links-message {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background-color: #f9fafb;
    border-radius: 8px;
    text-align: center;
    color: #6b7280;
  }
  
  .add-links-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 6px;
    color: #4b5563;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .add-links-btn:hover {
    background-color: #e5e7eb;
    color: #374151;
  }
  
  .add-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.375rem;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
  
  .card-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .card-badge {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    background-color: #f3f4f6;
    padding: 0.25rem 0.625rem;
    border-radius: 9999px;
  }
  
  .card-badge.academy {
    color: #047857;
    background-color: #ecfdf5;
  }
  
  .info-card {
    padding-bottom: 1.5rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem 2rem;
    padding: 1.5rem;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.info-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.info-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.375rem;
}

.info-value {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .profile-intro {
    padding: 1.5rem;
  }
  
  .social-links-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  
  .card-header {
    padding: 1.25rem 1.25rem 0.75rem 1.25rem;
  }
  
  .info-grid {
    padding: 1.25rem;
    grid-template-columns: 1fr;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Theme customization - darker mode support */
@media (prefers-color-scheme: dark) {
  .overview-card {
    background: #1f2937;
  }
  
  .header-card {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  }
  
  .profile-name {
    color: #f9fafb;
  }
  
  .profile-username {
    color: #9ca3af;
  }
  
  .social-links-title {
    color: #e5e7eb;
  }
  
  .social-link {
    background-color: #374151;
    color: #d1d5db;
  }
  
  .no-links-message {
    background-color: #374151;
    color: #9ca3af;
  }
  
  .add-links-btn {
    background-color: #4b5563;
    color: #e5e7eb;
  }
  
  .add-links-btn:hover {
    background-color: #6b7280;
  }
  
  .card-header h3 {
    color: #f9fafb;
  }
  
  .card-badge {
    background-color: #374151;
    color: #9ca3af;
  }
  
  .card-badge.academy {
    color: #10b981;
    background-color: rgba(16, 185, 129, 0.1);
  }
  
  .info-label {
    color: #9ca3af;
  }
  
  .info-value {
    color: #e5e7eb;
  }
  
  .info-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .social-links-section {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}

/* Special hover effects for the cards */
.info-card {
  position: relative;
  overflow: hidden;
}

.info-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.info-card:hover::after {
  transform: translateX(100%);
}
</style>