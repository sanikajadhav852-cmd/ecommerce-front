// src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import { ShoppingBag, ArrowLeft, ArrowRight, Lock, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { isAuthenticated } = useAuthStore();
  const { cartItems, loading, fetchCart, updateCartItem, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleQtyChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(itemId, newQty);
    } catch {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async (itemId) => {
    if (!window.confirm('Remove this item from your cart?')) return;
    try {
      await removeFromCart(itemId);
    } catch {
      alert('Failed to remove item');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 1);
    return sum + (price * qty);
  }, 0);

  const formattedSubtotal = subtotal.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  // --- STATE: NOT LOGGED IN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background dark:bg-slate-950 transition-colors">
        <div className="p-10 md:p-16 rounded-[2.5rem] shadow-xl border text-center max-w-2xl bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-gray-50 dark:bg-slate-800">
            <Lock size={32} className="text-primary dark:text-primary-light" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-text-pri dark:text-white">
            Your bag is locked
          </h2>
          <p className="text-lg mb-10 leading-relaxed text-text-sec dark:text-slate-400">
            Please log in to your account to view your saved items and continue to checkout.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold transition-all shadow-lg bg-primary dark:bg-primary-light text-white dark:text-slate-900"
            >
              Login to Account
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold border transition-all bg-surface dark:bg-slate-800 text-text-pri dark:text-white border-gray-100 dark:border-slate-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- STATE: LOADING ---
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background dark:bg-slate-950 transition-colors">
        <Loader size="large" />
        <p className="mt-4 font-bold uppercase tracking-widest text-[10px] text-text-sec dark:text-slate-400">
          Loading Bag...
        </p>
      </div>
    );
  }

  // --- STATE: EMPTY CART ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background dark:bg-slate-950 transition-colors">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto bg-gray-50 dark:bg-slate-800">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border bg-surface dark:bg-slate-700 border-gray-100 dark:border-slate-600">
              <span className="font-bold text-xs text-text-pri dark:text-white">0</span>
            </div>
          </div>
          <h2 className="text-3xl font-black mb-4 text-text-pri dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-lg mb-10 max-w-sm mx-auto text-text-sec dark:text-slate-400">
            Looks like you haven't added anything to your bag yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg transition shadow-xl bg-primary dark:bg-primary-light text-white dark:text-slate-900"
          >
            Explore Collection <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  // --- STATE: NORMAL CART ---
  return (
    <div className="min-h-screen pb-20 bg-background dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <nav className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-text-sec dark:text-slate-400">
              <Link to="/products" className="hover:underline transition text-text-pri dark:text-slate-200">
                Shop
              </Link>
              <span className="mx-3">/</span>
              <span className="text-text-pri dark:text-slate-100">Cart</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-pri dark:text-slate-50">
              Shopping Bag
            </h1>
          </div>
          <p className="font-medium text-text-sec dark:text-slate-400">
            Items in your bag are not reserved — check out now to make them yours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-[2rem] shadow-sm border overflow-hidden bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800">
              <div className="p-8 border-b flex justify-between items-center border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-text-pri dark:text-white">
                  Bag Items ({cartItems.length})
                </h3>
                <Link 
                  to="/products" 
                  className="text-xs font-bold flex items-center gap-1 uppercase tracking-wider transition-colors text-primary dark:text-primary-light"
                >
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>
              <div className="divide-y divide-gray-100 px-4 md:px-8" style={{ borderColor: 'var(--gray-light, #e5e7eb)' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="py-8">
                    <CartItem
                      item={item}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border flex items-center gap-4 transition-all bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-slate-800">
                  <Truck size={24} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-text-sec dark:text-slate-400">
                    Shipping
                  </p>
                  <p className="font-bold text-sm text-text-pri dark:text-slate-200">
                    Fast Delivery
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border flex items-center gap-4 transition-all bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-slate-800">
                  <ShieldCheck size={24} className="text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-text-sec dark:text-slate-400">
                    Warranty
                  </p>
                  <p className="font-bold text-sm text-text-pri dark:text-slate-200">
                    Secure Purchase
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-[2.5rem] shadow-2xl p-10 border relative overflow-hidden bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />

              <h2 className="text-2xl font-black mb-8 text-text-pri dark:text-slate-50">
                Order Summary
              </h2>

              <div className="space-y-5 relative">
                <div className="flex justify-between items-center text-text-sec dark:text-slate-400">
                  <span className="font-medium">Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold text-text-pri dark:text-slate-100">
                    {formattedSubtotal}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-text-sec dark:text-slate-400">
                  <span className="font-medium">Shipping Fee</span>
                  <span className="font-bold text-sm uppercase tracking-wider text-secondary">
                    Calculated next
                  </span>
                </div>

                <div className="flex justify-between items-center text-text-sec dark:text-slate-400">
                  <span className="font-medium">Estimated Tax</span>
                  <span className="font-bold text-text-pri dark:text-slate-100">₹0.00</span>
                </div>

                <div className="h-[1px] my-6 bg-gray-100 dark:bg-slate-800" />

                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-text-sec dark:text-slate-400">
                      Total Amount
                    </p>
                    <p className="text-4xl font-black tracking-tighter text-text-pri dark:text-slate-50">
                      {formattedSubtotal}
                    </p>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="group relative flex items-center justify-center w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl bg-primary dark:bg-primary-light text-white dark:text-slate-900"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-8 pt-6 border-t text-center border-gray-100 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-2 text-sm text-text-sec dark:text-slate-400">
                    <ShieldCheck size={16} className="text-primary dark:text-primary-light" />
                    <span className="font-bold uppercase tracking-widest">SSL Secure Payment</span>
                  </div>
                  <p className="text-[10px] mt-4 leading-relaxed text-text-sec dark:text-slate-500">
                    Free shipping on orders above ₹999.<br/> Easy 14-day returns and exchanges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}