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
    <div className="min-h-screen pb-20 bg-background dark:bg-slate-950 transition-colors">
      {/* Decorative Header Background */}
      <div className="h-64 w-full absolute top-0 z-0 bg-gradient-to-r from-primary via-primary-dark to-accent dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20">
        
        {/* Header Section */}
        <div className="mb-10 text-white dark:text-slate-100">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
          >
            Namaste, <span className="text-primary-light dark:text-primary">{user?.username?.split(' ')[0] || 'User'}</span>
          </motion.h1>
          <p className="font-medium flex items-center gap-2 text-primary-light dark:text-primary">
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
              className="rounded-[2rem] p-8 md:p-12 shadow-xl border bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold text-text-pri dark:text-slate-50">
                  Personal Details
                </h2>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800">
                  <User size={24} className="text-primary dark:text-primary-light" />
                </div>
              </div>

              <AnimatePresence>
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-8 border text-sm font-bold bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                  >
                    <CheckCircle2 size={18} />
                    {message}
                  </motion.div>
                )}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-3 p-4 rounded-2xl mb-8 border text-sm font-bold bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1 text-text-sec dark:text-slate-400">
                    Full Name
                  </label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border focus-within:border-primary dark:focus-within:border-primary-light focus-within:ring-4 transition-all bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700">
                    <User size={20} className="text-gray-400 dark:text-slate-500" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-semibold text-text-pri dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1 text-text-sec dark:text-slate-400">
                    Email Address
                  </label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border focus-within:border-primary dark:focus-within:border-primary-light focus-within:ring-4 transition-all bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700">
                    <Mail size={20} className="text-gray-400 dark:text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-semibold text-text-pri dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest ml-1 text-text-sec dark:text-slate-400">
                    Mobile Connection
                  </label>
                  <div className="flex items-center gap-4 p-4 rounded-2xl border focus-within:border-primary dark:focus-within:border-primary-light focus-within:ring-4 transition-all bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700">
                    <Phone size={20} className="text-gray-400 dark:text-slate-500" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none font-semibold text-text-pri dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-[0.98] transition-all shadow-lg disabled:opacity-50 mt-4 bg-primary dark:bg-primary-light text-white dark:text-slate-900 shadow-primary/20 dark:shadow-primary-light/10"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </motion.div>

            <button
              onClick={handleLogout}
              className="mt-8 flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] transition-colors px-6 text-text-sec dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <LogOut size={16} />
              Sign out of my account
            </button>
          </div>

          {/* RIGHT: NAVIGATION CARDS */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] px-4 mb-2 text-text-sec dark:text-slate-400">
              Shortcuts
            </h3>
            
            <Link
              to="/my-orders"
              className="group flex items-center justify-between p-6 rounded-[1.5rem] border hover:shadow-xl transition-all bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-gray-50 dark:bg-slate-800">
                  <Package size={26} className="text-primary dark:text-primary-light" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-pri dark:text-slate-100">
                    My Orders
                  </h4>
                  <p className="text-xs font-medium text-text-sec dark:text-slate-400">
                    Track and manage purchases
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-gray-50 dark:bg-slate-800">
                <ChevronRight size={20} className="text-primary dark:text-primary-light" />
              </div>
            </Link>

            <Link
              to="/addresses"
              className="group flex items-center justify-between p-6 rounded-[1.5rem] border hover:shadow-xl transition-all bg-surface dark:bg-slate-900 border-gray-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-gray-50 dark:bg-slate-800">
                  <MapPin size={26} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-pri dark:text-slate-100">
                    Addresses
                  </h4>
                  <p className="text-xs font-medium text-text-sec dark:text-slate-400">
                    Manage delivery locations
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110 bg-gray-50 dark:bg-slate-800">
                <ChevronRight size={20} className="text-accent" />
              </div>
            </Link>

            {/* Premium Membership Card */}
            <div className="p-8 rounded-[2rem] shadow-2xl relative overflow-hidden mt-6 group bg-gradient-to-br from-primary to-primary-dark text-white dark:from-slate-800 dark:to-slate-900 border dark:border-slate-700">
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
              
              <button className="text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg bg-white text-primary dark:bg-slate-950 dark:text-primary-light border dark:border-slate-700">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}