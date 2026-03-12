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
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="p-10 md:p-16 rounded-[2.5rem] shadow-xl border text-center max-w-2xl" style={{
          backgroundColor: 'var(--surface, #ffffff)',
          borderColor: 'var(--gray-light, #e5e7eb)',
        }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
            <Lock size={32} style={{ color: 'var(--primary, #7c3aed)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--text-primary, #111827)' }}>
            Your bag is locked
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Please log in to your account to view your saved items and continue to checkout.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto py-4 rounded-2xl font-bold transition-all shadow-lg"
              style={{
                backgroundColor: 'var(--primary, #7c3aed)',
                color: 'white',
              }}
            >
              Login to Account
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto py-4 rounded-2xl font-bold border transition-all"
              style={{
                backgroundColor: 'var(--surface, #ffffff)',
                color: 'var(--text-primary, #111827)',
                borderColor: 'var(--gray-light, #e5e7eb)',
              }}
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <Loader size="large" />
        <p className="mt-4 font-bold uppercase tracking-widest text-[10px]" style={{ color: 'var(--text-secondary, #6b7280)' }}>
          Loading Bag...
        </p>
      </div>
    );
  }

  // --- STATE: EMPTY CART ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
              <ShoppingBag size={40} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border" style={{
              backgroundColor: 'var(--surface, #ffffff)',
              borderColor: 'var(--gray-light, #e5e7eb)',
            }}>
              <span className="font-bold text-xs" style={{ color: 'var(--text-primary, #111827)' }}>0</span>
            </div>
          </div>
          <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--text-primary, #111827)' }}>
            Your cart is empty
          </h2>
          <p className="text-lg mb-10 max-w-sm mx-auto" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Looks like you haven't added anything to your bag yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 py-4 rounded-2xl font-bold text-lg transition shadow-xl"
            style={{
              backgroundColor: 'var(--primary, #7c3aed)',
              color: 'white',
            }}
          >
            Explore Collection <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  // --- STATE: NORMAL CART ---
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <nav className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--text-secondary, #6b7280)' }}>
              <Link to="/products" className="hover:underline transition" style={{ color: 'var(--text-primary, #111827)' }}>
                Shop
              </Link>
              <span className="mx-3">/</span>
              <span style={{ color: 'var(--text-primary, #111827)' }}>Cart</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary, #111827)' }}>
              Shopping Bag
            </h1>
          </div>
          <p className="font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Items in your bag are not reserved — check out now to make them yours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-[2rem] shadow-sm border overflow-hidden" style={{
              backgroundColor: 'var(--surface, #ffffff)',
              borderColor: 'var(--gray-light, #e5e7eb)',
            }}>
              <div className="p-8 border-b flex justify-between items-center" style={{ borderColor: 'var(--gray-light, #e5e7eb)' }}>
                <h3 className="font-bold" style={{ color: 'var(--text-primary, #111827)' }}>
                  Bag Items ({cartItems.length})
                </h3>
                <Link 
                  to="/products" 
                  className="text-xs font-bold flex items-center gap-1 uppercase tracking-wider transition-colors"
                  style={{ color: 'var(--primary, #7c3aed)' }}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border flex items-center gap-4 transition-all" style={{
                backgroundColor: 'var(--surface, #ffffff)',
                borderColor: 'var(--gray-light, #e5e7eb)',
              }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                  <Truck size={24} style={{ color: 'var(--secondary, #10b981)' }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Shipping
                  </p>
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary, #111827)' }}>
                    Fast Delivery
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border flex items-center gap-4 transition-all" style={{
                backgroundColor: 'var(--surface, #ffffff)',
                borderColor: 'var(--gray-light, #e5e7eb)',
              }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                  <ShieldCheck size={24} style={{ color: 'var(--primary, #7c3aed)' }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Warranty
                  </p>
                  <p className="font-bold text-sm" style={{ color: 'var(--text-primary, #111827)' }}>
                    Secure Purchase
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-[2.5rem] shadow-2xl p-10 border relative overflow-hidden" style={{
              backgroundColor: 'var(--surface, #ffffff)',
              borderColor: 'var(--gray-light, #e5e7eb)',
            }}>
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-opacity-50 rounded-full -mr-16 -mt-16 blur-3xl" style={{ backgroundColor: 'var(--primary-light, #a78bfa)' }} />

              <h2 className="text-2xl font-black mb-8" style={{ color: 'var(--text-primary, #111827)' }}>
                Order Summary
              </h2>

              <div className="space-y-5 relative">
                <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                  <span className="font-medium">Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold" style={{ color: 'var(--text-primary, #111827)' }}>
                    {formattedSubtotal}
                  </span>
                </div>
                
                <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                  <span className="font-medium">Shipping Fee</span>
                  <span className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--secondary, #10b981)' }}>
                    Calculated next
                  </span>
                </div>

                <div className="flex justify-between items-center" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                  <span className="font-medium">Estimated Tax</span>
                  <span className="font-bold" style={{ color: 'var(--text-primary, #111827)' }}>₹0.00</span>
                </div>

                <div className="h-[1px] my-6" style={{ backgroundColor: 'var(--gray-light, #e5e7eb)' }} />

                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                      Total Amount
                    </p>
                    <p className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary, #111827)' }}>
                      {formattedSubtotal}
                    </p>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="group relative flex items-center justify-center w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl"
                  style={{
                    backgroundColor: 'var(--primary, #7c3aed)',
                    color: 'white',
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'var(--gray-light, #e5e7eb)' }}>
                  <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--primary, #7c3aed)' }} />
                    <span className="font-bold uppercase tracking-widest">SSL Secure Payment</span>
                  </div>
                  <p className="text-[10px] mt-4 leading-relaxed" style={{ color: 'var(--text-secondary, #6b7280)' }}>
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