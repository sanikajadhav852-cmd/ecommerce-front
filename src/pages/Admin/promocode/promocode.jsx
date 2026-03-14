import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Trash2, 
  ToggleLeft as Toggle, ToggleRight, 
  Calendar, DollarSign, Users, 
  Image as ImageIcon, Sparkles,
  ChevronRight, RefreshCw, AlertCircle,
  MoreVertical, Edit, Percent, Activity, Shield, Loader2
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
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span>Rewards Protocol v9.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Promo Matrix</h1>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
                <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
                    <Activity size={18} /> Sync Status: LIVE
                </div>
            </div>
            <Link 
            to="/admin/promocode/add-promocode"
            className="group flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-black transition-all active:scale-95 relative overflow-hidden"
            >
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            <Plus size={20} className="relative z-10" />
            <span className="relative z-10">Generate Reward Vector</span>
            </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* --- CONTROL BAR --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 relative z-10">
            <div className="lg:col-span-8 relative group/search">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
            <input 
                type="text" 
                placeholder="Query Reward Tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-20 pr-10 py-6 bg-surface dark:bg-slate-900 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-sm transition-all"
            />
            </div>
            <div className="lg:col-span-4 flex items-center gap-6">
            <button 
                onClick={fetchPromocodes}
                className="flex-1 flex items-center justify-center gap-4 px-10 py-6 bg-surface dark:bg-slate-900 text-slate-400 hover:text-primary rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all active:scale-95 shadow-sm"
            >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                RESYNC_PROTOCOL
            </button>
            <button className="p-6 bg-surface dark:bg-slate-900 text-slate-400 hover:text-primary rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all active:scale-95 shadow-sm">
                <Filter size={24} />
            </button>
            </div>
        </section>

        {/* --- CONTENT HUB --- */}
        <section>
            {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="animate-spin h-20 w-20 text-primary opacity-20 mb-10" />
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] animate-pulse">Mapping Data Streams...</p>
            </div>
            ) : error ? (
            <div className="bg-red-500/5 border-2 border-red-500/10 p-16 rounded-[4rem] text-center max-w-2xl mx-auto shadow-2xl">
                <AlertCircle className="mx-auto text-red-500 mb-8" size={64} />
                <p className="text-red-500 font-black text-2xl uppercase tracking-tight mb-6">SIGNAL_INTERRUPTED</p>
                <p className="text-red-400/70 font-bold uppercase tracking-widest text-[10px] mb-10 leading-relaxed">{error}</p>
                <button onClick={fetchPromocodes} className="px-12 py-5 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-red-500/20 active:scale-95 transition-all">Retry Protocol</button>
            </div>
            ) : filteredCodes.length === 0 ? (
            <div className="bg-surface dark:bg-slate-900 border-4 border-dashed border-slate-50 dark:border-slate-800/50 p-32 rounded-[5rem] text-center transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000" />
                <div className="w-32 h-32 bg-background-site dark:bg-slate-950 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-100 dark:border-slate-800 group-hover:rotate-12 transition-transform duration-700">
                <Sparkles className="text-slate-100 dark:text-slate-800" size={64} />
                </div>
                <h3 className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.4em] mb-4">VACUUM_DETECTED</h3>
                <p className="text-text-pri/30 dark:text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">Reward Matrix Registry is currently vacant</p>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                {filteredCodes.map((p, index) => (
                    <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4rem] p-10 hover:shadow-3xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden flex flex-col"
                    >
                    <div className="absolute top-0 left-0 w-full h-2 shadow-inner group-hover:h-4 transition-all duration-700 opacity-0 group-hover:opacity-100 bg-primary/10" />
                    
                    {/* Status Glimmer */}
                    <div className={`absolute top-0 right-16 w-24 h-2 rounded-b-2xl transition-all duration-500 ${
                        p.status === 1 ? 'bg-primary shadow-[0_8px_30px_rgba(var(--primary-rgb),0.4)]' : 'bg-slate-300 dark:bg-slate-800 opacity-30 shadow-inner'
                    }`} />

                    <div className="flex items-start gap-8 mb-10 mt-4 relative z-10">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-background-site dark:bg-slate-950 flex-shrink-0 border-4 border-transparent group-hover:border-primary/20 overflow-hidden flex items-center justify-center transition-all duration-700 p-3 shadow-2xl relative">
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700" />
                        {p.image ? (
                            <img src={`${import.meta.env.VITE_API_URL}${p.image}`} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-90 group-hover:scale-100" />
                        ) : (
                            <ImageIcon className="text-slate-100 dark:text-slate-800 group-hover:text-primary transition-colors" size={48} />
                        )}
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em] opacity-50">NODE_ID: #{p.id}</span>
                        </div>
                        <h2 className="text-3xl font-black text-text-pri dark:text-white truncate group-hover:text-primary transition-colors uppercase tracking-tighter leading-tight">{p.promo_code}</h2>
                        <p className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest line-clamp-1 mt-2 opacity-70 italic">{p.message || 'DEFAULT_REWARD_SPEC'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10 relative z-10">
                        <div className="p-6 bg-background-site/50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 transition-all group-hover:bg-surface dark:group-hover:bg-slate-900 group-hover:shadow-xl group-hover:-translate-y-1">
                        <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] flex items-center gap-3 mb-3">
                            <Percent size={14} className="text-primary" /> VALUE_COEFF
                        </span>
                        <p className="text-2xl font-black text-text-pri dark:text-white tracking-tighter">
                            {p.discount}<span className="text-sm ml-1 opacity-50">{p.discount_type === 'percentage' ? '%' : ' OFF'}</span>
                        </p>
                        </div>
                        <div className="p-6 bg-background-site/50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 transition-all group-hover:bg-surface dark:group-hover:bg-slate-900 group-hover:shadow-xl group-hover:-translate-y-1">
                        <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] flex items-center gap-3 mb-3">
                            <Users size={14} className="text-primary" /> QUOTA_CAP
                        </span>
                        <p className="text-2xl font-black text-text-pri dark:text-white tracking-tighter">{p.no_of_users}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-primary/5 mt-auto relative z-10">
                        <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em] mb-2 leading-none">TERMINATION_VECTOR</span>
                        <div className="flex items-center gap-3 text-[11px] text-text-pri/60 dark:text-white/30 font-black tracking-widest uppercase">
                            <Calendar size={14} className="text-primary opacity-50" />
                            <span>{p.end_date}</span>
                        </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                        <button 
                            onClick={() => handleToggleStatus(p.id, p.status)}
                            className={`p-4 rounded-2xl transition-all active:scale-90 shadow-sm ${
                            p.status === 1 ? 'text-primary bg-primary/5 border-2 border-primary/20' : 'text-slate-200 bg-background-site dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800'
                            }`}
                        >
                            {p.status === 1 ? <ToggleRight size={28} /> : <Toggle size={28} />}
                        </button>
                        <button 
                            onClick={() => handleDelete(p.id)}
                            className="p-4 text-red-100 dark:text-red-950 bg-red-500 border-2 border-red-500/20 rounded-2xl hover:bg-black hover:text-red-500 hover:border-red-500/20 transition-all active:scale-90 shadow-2xl shadow-red-500/20"
                        >
                            <Trash2 size={24} />
                        </button>
                        </div>
                    </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
            )}
        </section>
      </main>

      {/* --- FOOTER INFO --- */}
      <footer className="max-w-7xl mx-auto mt-24 text-center border-t border-slate-100 dark:border-slate-800/10 p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] order-2 md:order-1">Registry Synchronized: Universal Core Stable</p>
        <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 px-8 py-4 rounded-full border border-slate-100 dark:border-slate-800 shadow-inner order-1 md:order-2">
           <Shield size={18} className="text-primary" />
           <span className="text-[10px] font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Matrix_Compliance_Ready</span>
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-lg shadow-emerald-500/50" /> 
        </div>
      </footer>
    </div>
  );
}
