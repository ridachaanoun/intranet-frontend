<template>
    <div class="profile-header">
      <!-- Animated Background with Wave -->
      <div class="profile-header__cover">
        <div class="wave-container">
          <div class="wave"></div>
          <div class="wave wave2"></div>
          <div class="wave wave3"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-4">
        <!-- Main Profile Card -->
        <div class="profile-card">
          <div class="flex flex-col lg:flex-row">
            <!-- Left Column: Avatar & Status -->
            <div class="profile-avatar-container">
              <div class="profile-avatar-wrapper">
                <div class="profile-avatar">
                  <img :src="user.profileImage" :alt="`${user.firstName} ${user.lastName}`">
                  <div class="online-indicator" :class="{'online': user.isConnected}"></div>
                </div>
              </div>
              
              <div class="connection-status" :class="{'connected': user.isConnected}">
                <span class="status-dot"></span>
                <span class="status-text">{{ user.isConnected ? 'Online' : 'Offline' }}</span>
              </div>
              
              <!-- Points Display -->
              <div class="points-display">
                <span class="points-value">{{ extractPoints(user.points) }}</span>
                <span class="points-label">YC</span>
              </div>
            </div>
            
            <!-- Right Column: User Details -->
            <div class="profile-details">
              <!-- User Identity Section -->
              <div class="identity-section">
                <h2 class="user-name">{{ user.firstName }} {{ user.lastName }}</h2>
                <p class="username">@{{ user.username }}</p>
                
                <!-- Level Badge -->
                <div class="level-badge-container">
                  <div class="level-badge" :class="getLevelClass(user.level)">
                    <span class="level-text">{{ getLevelText(user.level) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- User Information Grid -->
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Level</span>
                  <span class="info-value">{{ user.level }}</span>
                </div>
                
                <div class="info-item">
                  <span class="info-label">Classroom</span>
                  <span class="info-value">{{ user.classroom }}</span>
                </div>
                
                <div class="info-item">
                  <span class="info-label">Promotion</span>
                  <span class="info-value">{{ user.promotion }}</span>
                </div>
                
                <div class="info-item">
                  <span class="info-label">Campus</span>
                  <span class="info-value">{{ user.campus }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  
  // Extract numeric points value from string like "2500 YC"
  const extractPoints = (pointsString) => {
    return pointsString.split(' ')[0];
  };
  
  // Get level class based on level string
  const getLevelClass = (level) => {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('sas')) return 'level-sas';
    if (levelLower.includes('1ère') || levelLower.includes('a1')) return 'level-a1';
    if (levelLower.includes('2ème') || levelLower.includes('a2')) return 'level-a2';
    return 'level-default';
  };
  
  // Get level text based on level string
  const getLevelText = (level) => {
    const levelLower = level.toLowerCase();
    if (levelLower.includes('sas')) return 'SAS';
    if (levelLower.includes('1ère') || levelLower.includes('a1')) return 'A1';
    if (levelLower.includes('2ème') || levelLower.includes('a2')) return 'A2';
    return level;
  };
  </script>
  
  <style scoped>
  .profile-header {
    position: relative;
    font-family: 'Inter', sans-serif;
  }
  
  .profile-header__cover {
    height: 180px;
    position: relative;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    overflow: hidden;
  }
  
  /* Wave animation effect */
  .wave-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.08' d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 100% 100px;
    animation: wave 18s linear infinite;
  }
  
  .wave2 {
    animation: wave 13s linear infinite;
    opacity: 0.5;
    background-position-x: 50px;
  }
  
  .wave3 {
    animation: wave 10s linear infinite;
    opacity: 0.2;
    background-position-x: -50px;
  }
  
  @keyframes wave {
    0% { background-position-x: 0; }
    100% { background-position-x: 1440px; }
  }
  
  .container {
    position: relative;
  }
  
  .profile-card {
    background-color: #0f0e3378;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06);
    margin-top: -80px;
    padding: 24px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .profile-card:hover {
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
  
  .profile-avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0;
    margin-bottom: 24px;
  }
  
  @media (min-width: 1024px) {
    .profile-avatar-container {
      margin-right: 48px;
      margin-bottom: 0;
    }
  }
  
  .profile-avatar-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  
  .profile-avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    position: relative;
    border: 4px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  
  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .online-indicator {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #cbd5e1;
    border: 3px solid white;
    transition: all 0.3s ease;
  }
  
  .online-indicator.online {
    background-color: #10b981;
    box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
  
  .connection-status {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 6px 12px;
    border-radius: 20px;
    background-color: #f1f5f9;
    font-size: 13px;
    color: #64748b;
    transition: all 0.3s ease;
  }
  
  .connection-status.connected {
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #cbd5e1;
    margin-right: 6px;
  }
  
  .connected .status-dot {
    background-color: #10b981;
  }
  
  .points-display {
    display: flex;
    align-items: baseline;
    margin-top: 10px;
  }
  
  .points-value {
    font-size: 28px;
    font-weight: 700;
    color: #f59e0b;
    text-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
  }
  
  .points-label {
    font-size: 14px;
    font-weight: 600;
    color: #f59e0b;
    margin-left: 4px;
    opacity: 0.8;
  }
  
  .profile-details {
    flex: 1;
  }
  
  .identity-section {
    margin-bottom: 24px;
    position: relative;
  }
  
  .user-name {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
  }
  
  .username {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 12px;
  }
  
  .level-badge-container {
    margin-top: 16px;
    display: flex;
    align-items: center;
  }
  
  .level-badge {
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .level-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border-radius: inherit;
    filter: blur(8px);
    opacity: 0.4;
    z-index: -1;
  }
  
  .level-sas {
    background: linear-gradient(135deg, #4c1d95, #7c3aed);
    color: white;
  }
  
  .level-a1 {
    background: linear-gradient(135deg, #b45309, #f59e0b);
    color: white;
  }
  
  .level-a2 {
    background: linear-gradient(135deg, #0369a1, #0ea5e9);
    color: white;
  }
  
  .level-text {
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 20px;
    margin-top: 24px;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    background-color: #f8fafc;
    padding: 12px 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
  }
  
  .info-item:hover {
    background-color: #f1f5f9;
    transform: translateY(-2px);
  }
  
  .info-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 4px;
  }
  
  .info-value {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .profile-card {
      margin-top: -60px;
      padding: 16px;
    }
    
    .profile-avatar {
      width: 120px;
      height: 120px;
    }
    
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>