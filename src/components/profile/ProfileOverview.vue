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
                <a v-if="links.linkedin_url && links.linkedin_url !== 'null'" 
                  :href="links.linkedin_url" 
                  target="_blank"
                  class="social-link linkedin">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                
                <!-- GitHub -->
                <a v-if="links.github_url && links.github_url !== 'null'" 
                  :href="links.github_url" 
                  target="_blank"
                  class="social-link github">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                
                <!-- Personal Website -->
                <a v-if="links.website_url && links.website_url !== 'null'" 
                  :href="links.website_url" 
                  target="_blank"
                  class="social-link website">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                  </svg>
                  <span>Website</span>
                </a>
                
                <!-- Twitter/X -->
                <a v-if="links.twitter_url && links.twitter_url !== 'null'" 
                  :href="links.twitter_url" 
                  target="_blank"
                  class="social-link twitter">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Twitter)</span>
                </a>
                
                <!-- Instagram -->
                <a v-if="links.instagram_url && links.instagram_url !== 'null'" 
                  :href="links.instagram_url" 
                  target="_blank"
                  class="social-link instagram">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                
                <!-- Facebook -->
                <a v-if="links.facebook_url && links.facebook_url !== 'null'" 
                  :href="links.facebook_url" 
                  target="_blank"
                  class="social-link facebook">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                
                <!-- Codingame -->
                <a v-if="links.codingame_url && links.codingame_url !== 'null'" 
                  :href="links.codingame_url" 
                  target="_blank"
                  class="social-link codingame">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 12l10 10 10-10L12 2zm-1 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm-3.5 4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.5 1.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
                  </svg>
                  <span>CodinGame</span>
                </a>
                
                <!-- HackerRank -->
                <a v-if="links.hackerrank_url && links.hackerrank_url !== 'null'" 
                  :href="links.hackerrank_url" 
                  target="_blank"
                  class="social-link hackerrank">
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .254-.115.254-.258 0-.094-.049-.176-.123-.221L9.223 4.92c-.049-.063-.141-.109-.226-.109-.086 0-.178.045-.226.109L7.11 6.43c-.045.072-.12.154-.12.221 0 .143.113.258.255.258h.704l.008 10.204c0 .141.111.257.254.257.141 0 .258-.115.258-.257V9.185h4.07v.58l-.61-.032c-.12.004-.21.84-.21.157 0 .18.14.258.28.258h.723v6.473c0 .142.115.257.258.257.141 0 .258-.115.258-.257V6.908h.701c.141 0 .254-.115.254-.258 0-.094-.05-.176-.123-.221l-1.572-1.509c-.049-.063-.141-.109-.227-.109-.086 0-.176.045-.226.109l-1.663 1.509c-.045.072-.12.154-.12.221 0 .143.113.258.255.258h.704v5.897l-.013.01c0-.11-.052-.125-.125-.142l-1.046-.233c-.117-.023-.236.043-.271.158-.033.115.043.235.158.271l.33.74.055.301.238 1.287c.023.117.15.265.212.265h.11c.061 0 .189-.148.211-.265l.238-1.287.054-.301.332-.74c.115-.038.195-.156.16-.273-.034-.115-.156-.181-.273-.16l-1.043.235c-.074.016-.127.031-.127.142l-.012-.012V6.799h.704z"/>
                  </svg>
                  <span>HackerRank</span>
                </a>
              </div>
            </div>
            <div v-else class="no-links-message">
              <p>No social links added yet</p>
              <button class="add-links-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="add-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Social Links
              </button>
            </div>
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
          <div class="info-item">
            <div class="info-label">First name</div>
            <div class="info-value">{{ userData.firstName }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Last name</div>
            <div class="info-value">{{ userData.lastName }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Phone</div>
            <div class="info-value">{{ userData.phoneNumber }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">YouCode E-mail</div>
            <div class="info-value">{{ userData.youcodeEmail }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Personal E-mail</div>
            <div class="info-value">{{ userData.personalEmail }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Username</div>
            <div class="info-value">@{{ userData.username }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">City</div>
            <div class="info-value">{{ userData.city }}</div>
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
          <div class="info-item">
            <div class="info-label">Level</div>
            <div class="info-value">{{ userData.level }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Classroom</div>
            <div class="info-value">{{ userData.classroom }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Referent Coach</div>
            <div class="info-value">{{ userData.referentCoach }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Registration Date</div>
            <div class="info-value">{{ formatDate(userData.registrationDate) }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Campus</div>
            <div class="info-value">{{ userData.campus }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Promotion</div>
            <div class="info-value">{{ userData.promotion }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  
  const props = defineProps({
    userData: {
      type: Object,
      required: true
    }
  });
  
  // Get links from either userData or find in classroom data
  const links = computed(() => {
    // If userData has links property, use it
    if (props.userData.links) {
      return props.userData.links;
    }
    
    // Find the user's classroom to get links
    // Assuming classroomData is accessible, if not, this could be passed as a prop
    const classroom = ref(props.userData.classroomData?.[0] || {});
    return classroom.value.links || {};
  });
  
  // Check if user has any valid social links
  const hasSocialLinks = computed(() => {
    if (!links.value) return false;
    
    return Object.values(links.value).some(link => 
      link && typeof link === 'string' && link !== 'null'
    );
  });
  
  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
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