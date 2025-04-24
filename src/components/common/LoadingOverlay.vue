<template>
  <div v-if="show" class="loading-overlay">
    <div class="loading-content">
      <div class="spinner-container">
        <div class="spinner-outer"></div>
        <div class="spinner-middle"></div>
        <div class="spinner-inner"></div>
      </div>
      <div class="mt-6 text-center">
        <p class="text-lg font-semibold text-accent-500">Loading</p>
        <div class="dots-container">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 8, 35, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(8px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  border-radius: 1.5rem;
  background-color: rgba(19, 17, 58, 0.7);
  box-shadow: 0 0 30px rgba(120, 77, 255, 0.35);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 15px rgba(120, 77, 255, 0.35); }
  50% { box-shadow: 0 0 30px rgba(120, 77, 255, 0.6); }
  100% { box-shadow: 0 0 15px rgba(120, 77, 255, 0.35); }
}

.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
}

.spinner-outer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: #00f0c0;
  border-left-color: #00f0c0;
  animation: spin 2s linear infinite;
}

.spinner-middle {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  border: 4px solid transparent;
  border-radius: 50%;
  border-top-color: #784dff;
  border-right-color: #784dff;
  animation: spin 1.4s linear infinite reverse;
}

.spinner-inner {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  border: 3px solid transparent;
  border-radius: 50%;
  border-bottom-color: #00f0c0;
  border-right-color: #00f0c0;
  animation: spin 1s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.dots-container {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00f0c0;
  display: inline-block;
  animation: dot-pulse 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
}
</style>