// src/pages/MyOrders.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import api from '../lib/api';
import Loader from '../components/Loader';
import { ShoppingBag, ArrowLeft, ArrowRight, Lock, Truck, ShieldCheck } from 'lucide-react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-950 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <p className="font-medium text-text-sec dark:text-slate-400">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background dark:bg-slate-950 transition-colors">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 bg-gray-50 dark:bg-slate-800">
            <ShoppingBag size={40} className="text-gray-400 dark:text-slate-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-text-pri dark:text-slate-50">
            No orders yet
          </h2>
          <p className="text-lg mb-8 max-w-sm mx-auto text-text-sec dark:text-slate-400">
            Start shopping to see your orders here!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 py-4 px-8 rounded-lg font-semibold transition-all shadow-lg bg-primary dark:bg-primary-light text-white dark:text-slate-900"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-text-pri dark:text-slate-50">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="rounded-lg shadow-md p-6 border transition-all hover:shadow-lg bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-text-sec dark:text-slate-400">
                    Order ID: #{order.id}
                  </p>
                  <p className="text-sm text-text-sec dark:text-slate-400">
                    Placed on: {new Date(order.date_added).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold tracking-wider ${
                    order.status === 'pending'
                      ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500'
                      : order.status === 'cancelled'
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                  }`}
                >
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>

              <div className="border-t pt-4 mt-4 border-gray-100 dark:border-slate-800">
                <p className="font-semibold mb-2 text-text-pri dark:text-slate-100">
                  Items:
                </p>
                {/* You can fetch order items separately if needed */}
                <p className="font-medium text-text-pri dark:text-slate-100">
                  Total: ₹{order.total?.toFixed(2)}
                </p>
              </div>

              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <button
                  onClick={async () => {
                    if (window.confirm('Cancel this order?')) {
                      try {
                        await api.put(`/orders/${order.id}/cancel`);
                        alert('Order cancelled');
                        // Refresh orders
                        window.location.reload();
                      } catch (err) {
                        alert('Failed to cancel order');
                      }
                    }
                  }}
                  className="mt-4 font-medium transition-colors text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}