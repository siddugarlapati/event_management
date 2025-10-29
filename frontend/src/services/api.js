import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      console.error(`❌ ${status}: ${data.message || data.error || 'Server error'}`);
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
          
        case 404:
          // Not found
          console.error('Resource not found');
          break;
          
        case 429:
          // Too many requests
          console.error('Too many requests. Please try again later.');
          break;
          
        case 500:
        case 502:
        case 503:
          // Server errors
          console.error('Server error. Please try again later.');
          break;
          
        default:
          console.error('An error occurred');
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error. Please check your connection.');
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

// API methods
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const eventAPI = {
  create: (data) => api.post('/events', data),
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  join: (data) => api.post('/events/join', data),
  finalize: (id) => api.post(`/events/${id}/finalize`),
  complete: (id) => api.post(`/events/${id}/complete`),
};

export const vendorAPI = {
  create: (data) => api.post('/vendors', data),
  getAll: (params) => api.get('/vendors', { params }),
  getById: (id) => api.get(`/vendors/${id}`),
  update: (id, data) => api.put(`/vendors/${id}`, data),
  addReview: (id, data) => api.post(`/vendors/${id}/review`, data),
  getNearby: (lat, lng, radius) => api.get('/vendors/nearby', { params: { lat, lng, radius } }),
};

export const paymentAPI = {
  createIntent: (data) => api.post('/payments/intent', data),
  confirm: (data) => api.post('/payments/confirm', data),
  getTransactions: (params) => api.get('/payments/transactions', { params }),
};

export const aiAPI = {
  getRecommendations: (data) => api.post('/ai/recommend', data),
  analyzeBudget: (data) => api.post('/ai/budget', data),
  chat: (data) => api.post('/ai/chat', data),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
