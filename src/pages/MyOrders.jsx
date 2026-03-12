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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <p className="font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
            <ShoppingBag size={40} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary, #111827)' }}>
            No orders yet
          </h2>
          <p className="text-lg mb-8 max-w-sm mx-auto" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Start shopping to see your orders here!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 py-4 px-8 rounded-lg font-semibold transition-all shadow-lg"
            style={{
              backgroundColor: 'var(--primary, #7c3aed)',
              color: 'white',
            }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: 'var(--text-primary, #111827)' }}>
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="rounded-lg shadow-md p-6 border transition-all hover:shadow-lg"
              style={{
                backgroundColor: 'var(--surface, #ffffff)',
                borderColor: 'var(--gray-light, #e5e7eb)',
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Order ID: #{order.id}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Placed on: {new Date(order.date_added).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                  style={{
                    backgroundColor: 
                      order.status === 'pending' ? 'var(--gray-light, #f3f4f6)' :
                      order.status === 'cancelled' ? 'var(--accent-light, #fee2e2)' :
                      'var(--secondary-light, #dcfce7)',
                    color: 
                      order.status === 'pending' ? 'var(--accent, #ef4444)' :
                      order.status === 'cancelled' ? 'var(--accent, #ef4444)' :
                      'var(--secondary, #10b981)',
                  }}
                >
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>

              <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--gray-light, #e5e7eb)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>
                  Items:
                </p>
                {/* You can fetch order items separately if needed */}
                <p className="font-medium" style={{ color: 'var(--text-primary, #111827)' }}>
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
                  className="mt-4 font-medium transition-colors"
                  style={{ color: 'var(--accent, #ef4444)' }}
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