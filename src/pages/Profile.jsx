// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { LogOut, Package, MapPin, User, Mail, Phone, ChevronRight, CheckCircle2, AlertCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        mobile: user.mobile || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await api.put('/users/update', formData);
      setUser(res.data.user);
      setMessage(res.data.message || 'Profile updated successfully!');
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update profile';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
      {/* Decorative Header Background */}
      <div className="h-64 w-full absolute top-0 z-0 bg-gradient-to-r" style={{
        backgroundImage: 'linear-gradient(to right, var(--primary, #7c3aed), var(--primary-dark, #5b21b6), var(--accent, #ec4899))'
      }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20">
        
        {/* Header Section */}
        <div className="mb-10 text-white">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
          >
            Namaste, <span style={{ color: 'var(--primary-light, #a78bfa)' }}>{user?.username?.split(' ')[0] || 'User'}</span>
          </motion.h1>
          <p className="font-medium flex items-center gap-2" style={{ color: 'var(--primary-light, #a78bfa)' }}>
            <ShieldCheck size={16} />
            Manage your account settings and orders
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] p-8 md:p-12 shadow-xl border"
              style={{
                backgroundColor: 'var(--surface, #ffffff)',
                borderColor: 'var(--gray-light, #e5e7eb)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary, #111827)' }}>
                  Personal Details
                </h2>
                <div className="p-2 rounded-xl" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                  <User size={24} style={{ color: 'var(--primary, #7c3aed)' }} />
                </div>
              </div>

              <AnimatePresence>
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-8 border text-sm font-bold"
                    style={{
                      backgroundColor: 'var(--gray-light, #f3f4f6)',
                      borderColor: 'var(--primary-light, #a78bfa)',
                      color: 'var(--primary, #7c3aed)',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    {message}
                  </motion.div>
                )}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-8 border text-sm font-bold"
                    style={{
                      backgroundColor: 'var(--gray-light, #f3f4f6)',
                      borderColor: 'var(--accent, #ef4444)',
                      color: 'var(--accent, #ef4444)',
                    }}
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Full Name
                  </label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border focus-within:border-purple-600 focus-within:bg-white focus-within:ring-4 transition-all" style={{
                    backgroundColor: 'var(--gray-light, #f3f4f6)',
                    borderColor: 'var(--gray-light, #e5e7eb)',
                  }}>
                    <User size={20} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-semibold"
                      placeholder="Your name"
                      style={{ color: 'var(--text-primary, #111827)' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Email Address
                  </label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border focus-within:border-purple-600 focus-within:bg-white focus-within:ring-4 transition-all" style={{
                    backgroundColor: 'var(--gray-light, #f3f4f6)',
                    borderColor: 'var(--gray-light, #e5e7eb)',
                  }}>
                    <Mail size={20} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-semibold"
                      placeholder="email@example.com"
                      style={{ color: 'var(--text-primary, #111827)' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Mobile Connection
                  </label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border focus-within:border-purple-600 focus-within:bg-white focus-within:ring-4 transition-all" style={{
                    backgroundColor: 'var(--gray-light, #f3f4f6)',
                    borderColor: 'var(--gray-light, #e5e7eb)',
                  }}>
                    <Phone size={20} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-semibold"
                      placeholder="Phone number"
                      style={{ color: 'var(--text-primary, #111827)' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-[0.98] transition-all shadow-lg disabled:opacity-50 mt-4"
                  style={{
                    backgroundColor: 'var(--primary, #7c3aed)',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(124, 58, 237, 0.2)',
                  }}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </motion.div>

            <button
              onClick={handleLogout}
              className="mt-8 flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] transition-colors px-6"
              style={{ color: 'var(--text-secondary, #6b7280)' }}
            >
              <LogOut size={16} />
              Sign out of my account
            </button>
          </div>

          {/* RIGHT: NAVIGATION CARDS */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] px-4 mb-2" style={{ color: 'var(--text-secondary, #6b7280)' }}>
              Shortcuts
            </h3>
            
            <Link
              to="/my-orders"
              className="group flex items-center justify-between p-6 rounded-[1.5rem] border hover:shadow-xl transition-all"
              style={{
                backgroundColor: 'var(--surface, #ffffff)',
                borderColor: 'var(--gray-light, #e5e7eb)',
              }}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                  <Package size={26} style={{ color: 'var(--primary, #7c3aed)' }} />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary, #111827)' }}>
                    My Orders
                  </h4>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Track and manage purchases
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                <ChevronRight size={20} style={{ color: 'var(--primary, #7c3aed)' }} />
              </div>
            </Link>

            <Link
              to="/addresses"
              className="group flex items-center justify-between p-6 rounded-[1.5rem] border hover:shadow-xl transition-all"
              style={{
                backgroundColor: 'var(--surface, #ffffff)',
                borderColor: 'var(--gray-light, #e5e7eb)',
              }}
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                  <MapPin size={26} style={{ color: 'var(--accent, #ec4899)' }} />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary, #111827)' }}>
                    Addresses
                  </h4>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                    Manage delivery locations
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                <ChevronRight size={20} style={{ color: 'var(--accent, #ec4899)' }} />
              </div>
            </Link>

            {/* Premium Membership Card */}
            <div className="p-8 rounded-[2rem] shadow-2xl relative overflow-hidden mt-6 group" style={{
              background: 'linear-gradient(to bottom right, var(--primary, #7c3aed), var(--primary-dark, #5b21b6))',
              color: 'white',
            }}>
              {/* Animated Background Circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-widest opacity-90">
                <CreditCard size={18} />
                Rewards Program
              </div>
              
              <h4 className="text-2xl font-black mb-2 relative z-10">
                Jijai Spice Plus
              </h4>
              <p className="text-sm opacity-80 mb-6 relative z-10 max-w-[200px]">
                Enjoy free delivery on all orders and 5% cashback on spices.
              </p>
              
              <button className="text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg" style={{
                backgroundColor: 'white',
                color: 'var(--primary, #7c3aed)',
              }}>
                Learn More
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}