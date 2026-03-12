// src/store/cartStore.js
import { create } from 'zustand';
import api from '../lib/api'; // assuming this is your axios instance with auth interceptors

export const useCartStore = create((set, get) => ({
  cartItems: [],          // array of cart items from API
  loading: false,
  error: null,

  // Fetch and normalize cart items
  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/cart');
      const rawItems = res.data.cartItems || [];

      // Normalize field names so frontend can use .id instead of .cart_id
      const normalizedItems = rawItems.map(item => ({
        ...item,
        id: item.cart_id,           // ← map cart_id → id for consistency
        productId: item.product_id, // optional: clearer name
      }));

      set({ cartItems: normalizedItems, loading: false });
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      set({
        loading: false,
        error: err.response?.data?.message || 'Failed to load cart',
      });
      // Optional: show toast/notification
      // toast.error(get().error);
    }
  },

  // Add item to cart (expects { product_id, qty })
  addToCart: async (item) => {
    set({ loading: true, error: null });
    try {
      await api.post('/cart', {
        product_id: item.product_id || item.id, // support both naming styles
        qty: item.qty || 1,
      });
      await get().fetchCart(); // refresh cart
      // Optional success feedback
      // toast.success('Added to cart!');
      return true;
    } catch (err) {
      console.error('Add to cart failed:', err);
      const message = err.response?.data?.message || 'Failed to add item';
      set({ loading: false, error: message });
      // toast.error(message);
      throw err;
    }
  },

  // Update quantity of existing cart item
  // itemId here should be the cart row ID (cart_id from API)
  updateCartItem: async (itemId, qty) => {
    if (!itemId) {
      console.warn('updateCartItem called without itemId');
      return;
    }

    set({ loading: true, error: null });
    try {
      const quantity = Number(qty);
      if (isNaN(quantity) || quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }

      await api.put(`/cart/${itemId}`, { qty: quantity });
      await get().fetchCart(); // refresh
      // toast.success('Quantity updated');
      return true;
    } catch (err) {
      console.error('Update cart item failed:', err);
      const message = err.response?.data?.message || 'Failed to update quantity';
      set({ loading: false, error: message });
      // toast.error(message);
      throw err;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    if (!itemId) {
      console.warn('removeFromCart called without itemId');
      return;
    }

    set({ loading: true, error: null });
    try {
      await api.delete(`/cart/${itemId}`);
      await get().fetchCart(); // refresh
      // toast.success('Item removed');
      return true;
    } catch (err) {
      console.error('Remove from cart failed:', err);
      const message = err.response?.data?.message || 'Failed to remove item';
      set({ loading: false, error: message });
      // toast.error(message);
      throw err;
    }
  },

  // Clear local state (useful on logout or manual clear)
  clearCart: () => {
    set({ cartItems: [], error: null });
  },

  // Optional: Get total quantity or subtotal (client-side calculation)
  getTotalQuantity: () => {
    return get().cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);
  },

  // Optional: Get subtotal (if you add price later)
  // getSubtotal: () => {
  //   return get().cartItems.reduce((sum, item) => sum + (item.qty * (item.price || 0)), 0);
  // },
}));