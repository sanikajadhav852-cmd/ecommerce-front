// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds - good for uploads & slow networks
});

// Request interceptor: Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle common errors globally (especially 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    // Optional: Log successful responses in dev
    if (import.meta.env.DEV) {
      console.log(`[API RESPONSE] ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`);
    }
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized globally (token expired/invalid)
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      
      // Optional: Show toast/notification (if you use one)
      // toast.error('Session expired. Please login again.');

      // Redirect to login page (adjust path as needed)
      window.location.href = '/login?session_expired=true';
    }

    // Handle other common errors
    if (error.response?.status === 403) {
      console.warn('Forbidden: You do not have permission for this action');
    } else if (error.response?.status === 500) {
      console.error('Server error occurred:', error.response?.data);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }

    // Always log full error in development
    if (import.meta.env.DEV) {
      console.error('API Error Details:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
      });
    }

    return Promise.reject(error);
  }
);

// In api.js response interceptor error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error – Full Details:', {
        status: error.response.status,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        sentData: error.config?.data ? JSON.parse(error.config.data || '{}') : null,
        serverResponse: error.response.data,              // ← THIS shows the real message!
        headers: error.config?.headers
      });
    }

    return Promise.reject(error);
  }
);

export default api;