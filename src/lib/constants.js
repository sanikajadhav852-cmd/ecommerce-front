// src/lib/constants.js

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id) => `/products/${id}`,
  },
  VARIANTS: {
    BY_PRODUCT: (productId) => `/variants/product/${productId}`,
  },
  CART: {
    GET: '/cart',
    ADD: '/cart',
    UPDATE: (id) => `/cart/${id}`,
    DELETE: (id) => `/cart/${id}`,
  },
  ORDERS: {
    CREATE: '/orders',
    USER_ORDERS: '/orders',
    DETAIL: (id) => `/orders/${id}`,
    CANCEL: (id) => `/orders/${id}/cancel`,
  },
  ADDRESSES: {
    GET: '/addresses',
    CREATE: '/addresses',
    UPDATE: (id) => `/addresses/${id}`,
    DELETE: (id) => `/addresses/${id}`,
    SET_DEFAULT: (id) => `/addresses/${id}/default`,
  },
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
};

export const PAYMENT_METHODS = {
  COD: 'cod',
  // Add RAZORPAY, STRIPE later
};