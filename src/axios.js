import axios from 'axios';

// Helper function to get the token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 100000, // Request timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Attach token from cookies if it exists
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token found and added to headers:', token);
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;