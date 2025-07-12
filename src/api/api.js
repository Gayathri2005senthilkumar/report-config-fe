// utils/axiosInstance.ts
import axios from 'axios';

// You can store base URL in an env variable or config
const BASE_URL = "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // or from context/store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Refresh token, redirect on 401, etc.
    if (error.response?.status === 401) {
      // Optional: logout, redirect, refresh token
      console.warn('Unauthorized! Logging out...');
    }

    return Promise.reject(error);
  }
);

export default api;
