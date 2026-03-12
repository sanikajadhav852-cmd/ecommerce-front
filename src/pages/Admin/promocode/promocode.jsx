import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Trash2, 
  ToggleLeft as Toggle, ToggleRight, 
  Calendar, DollarSign, Users, 
  Image as ImageIcon, Sparkles,
  ChevronRight, RefreshCw, AlertCircle,
  MoreVertical, Edit, Percent
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../../lib/api.js';

export default function Promocode() {
  const [promocodes, setPromocodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPromocodes();
  }, []);

  const fetchPromocodes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/promocodes');
      if (res.data.success) {
        setPromocodes(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching promo codes:', err);
      setError('Failed to load promo codes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const res = await api.put(`/promocodes/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setPromocodes(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this promo code?')) return;
    try {
      const res = await api.delete(`/promocodes/${id}`);
      if (res.data.success) {
        setPromocodes(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Error deleting promo code:', err);
    }
  };

  const filteredCodes = promocodes.filter(p => 
    p.promo_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-[1.5rem] md:p-[2rem]">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[1rem] mb-[2rem]">
        <div className="space-y-[0.25rem]">
          <h1 className="text-[1.875rem] font-black text-gray-900 tracking-tight flex items-center gap-[0.75rem]">
            <Sparkles className="text-primary" size={28} />
            Promo Code Explorer
          </h1>
          <div className="flex items-center gap-[0.5rem] text-[0.875rem] text-gray-500 font-medium">
            <span>Admin</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-primary-light">Manage Rewards</span>
          </div>
        </div>

        <Link 
          to="/admin/promocode/add-promocode"
          className="flex items-center gap-[0.75rem] px-[1.5rem] py-[0.875rem] bg-primary text-white rounded-[1.25rem] font-black text-[0.875rem] shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95"
        >
          <Plus size={20} />
          CREATE NEW PROMO
        </Link>
      </div>

      {/* --- STATS/FILTERS BAR --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1.5rem] mb-[2rem]">
        <div className="lg:col-span-2 relative group">
          <Search className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by code or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-white border border-gray-100 rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-[1rem]">
          <button 
            onClick={fetchPromocodes}
            className="flex-1 flex items-center justify-center gap-[0.75rem] px-[1.25rem] py-[1rem] bg-white text-gray-500 rounded-[1.25rem] font-bold border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            RELOAD
          </button>
          <button className="p-[1rem] bg-white text-gray-500 rounded-[1.25rem] border border-gray-100 hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* --- CONTENT --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-[10rem]">
          <div className="w-[3rem] h-[3rem] border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-[1.5rem]" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[0.875rem]">Syncing with Database...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 p-[2rem] rounded-[2rem] text-center">
          <AlertCircle className="mx-auto text-red-500 mb-[1rem]" size={48} />
          <p className="text-red-600 font-black text-[1.125rem]">{error}</p>
          <button onClick={fetchPromocodes} className="mt-[1rem] text-red-500 font-bold underline">Try Again</button>
        </div>
      ) : filteredCodes.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-200 p-[5rem] rounded-[2.5rem] text-center">
          <div className="w-[5rem] h-[5rem] bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-[1.5rem]">
            <ImageIcon className="text-gray-200" size={32} />
          </div>
          <h3 className="text-gray-900 font-black text-[1.25rem] mb-[0.5rem]">No Promo Codes Found</h3>
          <p className="text-gray-400 font-medium max-w-[20rem] mx-auto">Start by creating your first promotional offer to drive more sales.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1.5rem]">
          <AnimatePresence>
            {filteredCodes.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-[1.5rem] hover:shadow-2xl hover:shadow-primary/5 transition-all"
              >
                {/* Status Badge */}
                <div className={`absolute top-[1.5rem] right-[1.5rem] px-[0.75rem] py-[0.25rem] rounded-full text-[0.625rem] font-black uppercase tracking-widest transition-colors ${
                  p.status === 1 ? 'bg-secondary/10 text-secondary' : 'bg-red-50 text-red-400'
                }`}>
                  {p.status === 1 ? 'Live' : 'Inactive'}
                </div>

                <div className="flex items-start gap-[1.25rem] mb-[1.5rem]">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-[1.5rem] bg-gray-50 flex-shrink-0 border border-gray-50 overflow-hidden flex items-center justify-center">
                    {p.image ? (
                      <img src={`${import.meta.env.VITE_API_URL}${p.image}`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-200" size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[1.25rem] font-black text-gray-900 truncate mb-[0.25rem]">{p.promo_code}</h2>
                    <p className="text-[0.8125rem] text-gray-400 font-medium line-clamp-2 leading-relaxed">{p.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[1rem] mb-[1.5rem]">
                  <div className="p-[0.75rem] bg-gray-50 rounded-[1.25rem] space-y-[0.25rem]">
                    <span className="text-[0.625rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.25rem]">
                      <Percent size={10} className="text-primary" /> Reward
                    </span>
                    <p className="text-[0.9375rem] font-black text-gray-900">
                      {p.discount}{p.discount_type === 'percentage' ? '%' : ' OFF'}
                    </p>
                  </div>
                  <div className="p-[0.75rem] bg-gray-50 rounded-[1.25rem] space-y-[0.25rem]">
                    <span className="text-[0.625rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.25rem]">
                      <Users size={10} className="text-primary" /> Usage
                    </span>
                    <p className="text-[0.9375rem] font-black text-gray-900">Limit: {p.no_of_users}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-[1.25rem] border-t border-gray-50">
                  <div className="flex items-center gap-[0.5rem] text-[0.75rem] text-gray-400 font-bold">
                    <Calendar size={14} className="text-primary-light" />
                    <span>Expires: {p.end_date}</span>
                  </div>
                  
                  <div className="flex items-center gap-[0.5rem]">
                    <button 
                      onClick={() => handleToggleStatus(p.id, p.status)}
                      className={`p-[0.5rem] rounded-[1rem] transition-all hover:scale-110 ${
                        p.status === 1 ? 'text-secondary bg-secondary/10' : 'text-gray-300 bg-gray-50'
                      }`}
                    >
                      {p.status === 1 ? <ToggleRight size={22} /> : <Toggle size={22} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-[0.5rem] text-red-400 bg-red-50/50 rounded-[1rem] hover:bg-red-50 hover:text-red-500 transition-all hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* --- FOOTER INFO --- */}
      <div className="mt-[3rem] text-center border-t border-gray-100 pt-[2rem]">
        <p className="text-[0.875rem] text-gray-400 font-medium">
          Promo Registry Status: <span className="font-bold text-secondary uppercase">Operational</span>
        </p>
      </div>
    </div>
  );
}
