import axios from 'axios';

// Change this to your live Render URL once the backend is deployed
export const API_BASE = 'https://ecommerce-ioot.onrender.com/api';

// URL of the separate Admin app - change this once the admin app is deployed too
export const ADMIN_APP_URL = 'https://ecommerce-admin-app-eight.vercel.app';

const api = axios.create({ baseURL: API_BASE });

// Attach the JWT (if logged in) to every outgoing request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
