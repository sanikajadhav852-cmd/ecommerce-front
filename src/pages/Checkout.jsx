// src/pages/Checkout.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import api from '../lib/api';
import Loader from '../components/Loader';
import { ShoppingBag, ArrowLeft, ArrowRight, Lock, Truck, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { isAuthenticated } = useAuthStore();
  const { cartItems, fetchCart, clearCart } = useCartStore();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      try {
        const [cartRes, addrRes] = await Promise.all([
          fetchCart(),
          api.get('/addresses'),
        ]);
        setAddresses(addrRes.data.addresses || []);
        if (addrRes.data.addresses?.length > 0) {
          const defaultAddr = addrRes.data.addresses.find(a => a.is_default);
          setSelectedAddressId(defaultAddr?.id || addrRes.data.addresses[0].id);
        }
      } catch (err) {
        setError('Failed to load checkout data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, navigate, fetchCart]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    if (cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }

    try {
      const payload = {
        address_id: selectedAddressId,
        items: cartItems.map(item => ({
          product_variant_id: item.product_variant_id,
          qty: item.qty,
          price: item.price,
        })),
        total: subtotal,
        payment_method: 'cod', // can be extended later
      };

      const res = await api.post('/orders', payload);
      alert('Order placed successfully! Order ID: ' + res.data.orderId);
      clearCart();
      navigate('/my-orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-950 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <p className="font-medium text-text-sec dark:text-slate-400">
            Preparing checkout...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background dark:bg-slate-950 transition-colors">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-text-pri dark:text-slate-50">
            {error}
          </h2>
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 font-medium hover:underline transition-colors text-primary dark:text-primary-light"
          >
            <ArrowLeft size={20} /> Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-text-pri dark:text-slate-50">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Address & Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-text-pri dark:text-slate-50">
              Delivery Address
            </h2>

            {addresses.length === 0 ? (
              <div className="p-6 rounded-lg text-center border bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                <p className="mb-4 font-medium text-text-sec dark:text-slate-400">
                  No addresses found
                </p>
                <button
                  onClick={() => navigate('/profile')} // or a modal to add address
                  className="px-6 py-3 rounded-lg font-medium transition-all bg-primary dark:bg-primary-light text-white dark:text-slate-900"
                >
                  Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-6 border rounded-lg cursor-pointer transition-all bg-surface dark:bg-slate-900 ${
                      selectedAddressId === addr.id ? 'border-primary dark:border-primary-light shadow-md' : 'border-gray-200 dark:border-slate-800 hover:shadow'
                    }`}
                  >
                    <p className="font-semibold text-text-pri dark:text-slate-100">
                      {addr.name} ({addr.type})
                    </p>
                    <p className="mt-1 text-text-sec dark:text-slate-400">
                      {addr.address}
                    </p>
                    <p className="mt-1 text-text-sec dark:text-slate-400">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="mt-1 text-text-sec dark:text-slate-400">
                      Phone: {addr.mobile}
                    </p>
                    {addr.is_default && (
                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-6 text-text-pri dark:text-slate-50">
                Order Summary
              </h2>
              <div className="p-6 rounded-lg bg-gray-50 dark:bg-slate-900 border border-transparent dark:border-slate-800">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-3 border-b border-gray-200 dark:border-slate-800 last:border-b-0">
                    <div>
                      <p className="font-medium text-text-pri dark:text-slate-100">
                        {item.name}
                      </p>
                      <p className="text-sm text-text-sec dark:text-slate-400">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-text-pri dark:text-slate-100">
                      ₹{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-6 pt-4 border-t border-gray-200 dark:border-slate-800">
                  <span className="text-text-pri dark:text-slate-100">Total</span>
                  <span className="text-text-pri dark:text-slate-100">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Payment & Place Order */}
          <div className="self-start sticky top-6">
            <div className="rounded-lg p-8 shadow-md border bg-surface dark:bg-slate-900 border-gray-200 dark:border-slate-800">
              <h2 className="text-2xl font-semibold mb-6 text-text-pri dark:text-slate-50">
                Payment Method
              </h2>
              <div className="space-y-4 mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked 
                    readOnly 
                    className="w-5 h-5 accent-primary dark:accent-primary-light" 
                  />
                  <span className="text-text-pri dark:text-slate-100">
                    Cash on Delivery (COD)
                  </span>
                </label>
                {/* You can add more methods later (Razorpay, etc.) */}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={addresses.length === 0 || cartItems.length === 0}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-primary dark:bg-primary-light text-white dark:text-slate-900 shadow-primary/20"
              >
                Place Order (COD)
              </button>

              <p className="text-sm mt-6 text-center text-text-sec dark:text-slate-400">
                You will pay when your order is delivered
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}