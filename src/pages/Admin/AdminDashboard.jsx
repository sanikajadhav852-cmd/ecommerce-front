import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { 
  ShoppingCart, Package, Users, RefreshCw, Truck, 
  Search, AlertCircle, CheckCircle, RotateCcw, Settings, X,
  TrendingUp, Calendar, ChevronRight, Zap, Activity, Shield, Coins, Box, Layers, Clock, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    orders: 0,
    newSigns: 0,
    deliveryBoys: 0,
    products: 0
  });
  const [orderOutlines, setOrderOutlines] = useState({
    pending: 0,
    ready: 0,
    awaiting: 0,
    processed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, outlinesRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/orders/outlines')
      ]);
      setStats(statsRes.data || {});
      setOrderOutlines(outlinesRes.data || {});
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to synchronize command center data.');
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-site dark:bg-slate-950 transition-colors duration-500">
        <div className="relative flex items-center justify-center">
          <div className="h-24 w-24 animate-spin rounded-full border-[6px] border-solid border-primary border-t-transparent shadow-2xl shadow-primary/20"></div>
          <div className="absolute h-12 w-12 animate-ping rounded-full border-4 border-primary/20 dark:border-primary-light/5"></div>
          <Activity size={32} className="absolute text-primary animate-pulse" />
        </div>
        <p className="mt-10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-600 animate-pulse">Establishing Secure Uplink...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 min-h-screen flex flex-col items-center justify-center bg-background-site dark:bg-slate-950 transition-colors duration-500">
        <div className="bg-surface dark:bg-slate-900 p-16 rounded-[4rem] shadow-2xl border border-rose-100 dark:border-rose-900/30 text-center max-w-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
          <div className="bg-rose-50 dark:bg-rose-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <AlertCircle size={48} className="text-rose-500 dark:text-rose-400" />
          </div>
          <h2 className="text-3xl font-black text-text-pri dark:text-white mb-4 tracking-tighter uppercase">Protocol Interrupted</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 font-bold text-lg leading-relaxed">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="w-full py-6 bg-text-pri dark:bg-primary text-white rounded-[2rem] hover:bg-black dark:hover:bg-primary-dark transition-all flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary/20 active:scale-95"
          >
            <RefreshCw size={20} /> Re-Initialize Node
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Shield size={16} className="text-primary animate-pulse" />
            <span>Operational Command Center</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Mission Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} className="text-emerald-500" /> System Integrity: <span className="text-emerald-500">Optimal</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] flex items-center gap-3 border border-primary/10 dark:border-primary-light/10">
            <Calendar size={18} /> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <button
            onClick={fetchDashboardData}
            className="p-4 text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-background-site dark:hover:bg-slate-800 rounded-2xl transition-all active:scale-90"
            title="Sychronize Ledger"
          >
            <RefreshCw size={22} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-16">
        
        {/* --- MACRO METRICS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <TopStatCard title="Total Volume" value={stats.orders} icon={ShoppingCart} gradient="from-primary to-blue-500" type="CURRENCY" />
          <TopStatCard title="Active Nodes" value={stats.newSigns} icon={Users} gradient="from-violet-600 to-purple-500" type="COUNT" />
          <TopStatCard title="Logistics flow" value={stats.deliveryBoys} icon={Truck} gradient="from-emerald-600 to-teal-500" type="COUNT" />
          <TopStatCard title="Asset Registry" value={stats.products} icon={Package} gradient="from-slate-900 to-slate-700" type="COUNT" />
        </div>

        {/* --- LIFECYCLE GRID --- */}
        <section className="bg-surface dark:bg-slate-900 p-12 rounded-[4rem] shadow-sm border border-slate-200/60 dark:border-slate-800 transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xl font-black text-text-pri dark:text-white flex items-center gap-4 uppercase tracking-tighter">
              <Layers size={24} className="text-primary" />
              Transactional Lifecycle
              <span className="px-4 py-1.5 bg-primary text-white text-[9px] font-black rounded-full uppercase tracking-widest ml-4 shadow-lg shadow-primary/20">Real-Time</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
            <OutlineCard label="Pending" count={orderOutlines.pending} icon={Clock} color="amber" />
            <OutlineCard label="Manifested" count={orderOutlines.ready} icon={Package} color="blue" />
            <OutlineCard label="Holding" count={orderOutlines.awaiting} icon={RefreshCw} color="indigo" />
            <OutlineCard label="Executed" count={orderOutlines.processed} icon={Shield} color="cyan" />
            <OutlineCard label="Transition" count={orderOutlines.shipped} icon={Truck} color="emerald" />
            <OutlineCard label="Completed" count={orderOutlines.delivered} icon={CheckCircle} color="green" />
            <OutlineCard label="Aborted" count={orderOutlines.cancelled} icon={X} color="red" />
            <OutlineCard label="Reversed" count={orderOutlines.returned} icon={RotateCcw} color="orange" />
          </div>
        </section>

        {/* --- TRANSACTIONAL LOG --- */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col relative group">
          <div className="p-12 border-b border-slate-50 dark:border-slate-800/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-background-site/20 dark:bg-slate-950/20 transition-all">
            <div className="space-y-2">
                <h3 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Event Registry</h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Latest System Interchanges</p>
            </div>
            <div className="relative w-full lg:w-[400px] group/search">
              <input 
                type="text" 
                placeholder="Scan by Hash or Subject..." 
                className="w-full pl-16 pr-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black outline-none transition-all dark:text-white shadow-inner placeholder:text-slate-300"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-primary transition-colors" size={22} />
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/50">
                  {['Logical Hub', 'Entity Subject', 'Sum Quantum', 'State Protocol', 'Time-Stamp', 'Ops'].map(h => (
                    <th key={h} className="px-12 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                <tr>
                  <td colSpan={6} className="py-40 text-center">
                    <div className="flex flex-col items-center opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
                      <div className="bg-background-site dark:bg-slate-950 p-10 rounded-full mb-8 border-4 border-dashed border-slate-100 dark:border-slate-800">
                        <Activity size={48} className="text-slate-200 dark:text-slate-800" />
                      </div>
                      <p className="font-black text-text-pri dark:text-white text-xl uppercase tracking-tighter mb-2">Registry Silent</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Scan parameters returned zero artifacts</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <footer className="p-12 bg-background-site/30 dark:bg-slate-950/30 border-t border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.4em]">
                Registry Sync Loop: <span className="text-primary dark:text-primary-light mx-2 text-sm">30s</span> Optimized
              </div>
              <button className="flex items-center gap-4 px-10 py-5 bg-primary hover:bg-black dark:hover:bg-primary-dark text-white rounded-[1.75rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 active:scale-95 transition-all">
                Access Full Ledger <ChevronRight size={16} />
              </button>
          </footer>
        </section>
      </main>
    </div>
  );
}

// ── PREMIUM SUB-COMPONENTS ─────────────────────────────────────────────────

function TopStatCard({ title, value, icon: Icon, gradient, type }) {
  return (
    <div className="group relative bg-surface dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-none dark:hover:border-primary/20">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.03] group-hover:opacity-[0.08] dark:opacity-10 dark:group-hover:opacity-20 rounded-bl-[4rem] transition-opacity duration-700`}></div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`p-5 rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
          <Icon size={28} />
        </div>
        <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 text-[10px] font-black bg-emerald-500/10 dark:bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <TrendingUp size={14} /> +12.5%
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 group-hover:text-primary transition-colors">{title}</p>
        <h4 className="text-3xl lg:text-4xl font-black text-text-pri dark:text-white tracking-tighter">
          {type === 'CURRENCY' ? '₹' : ''}{value?.toLocaleString() || '0'}
        </h4>
      </div>
    </div>
  );
}

function OutlineCard({ label, count, icon: Icon, color }) {
  const colorMap = {
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10 group-hover:bg-amber-500 group-hover:text-white",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/10 group-hover:bg-blue-500 group-hover:text-white",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white",
    green: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/10 group-hover:bg-green-500 group-hover:text-white",
    red: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10 group-hover:bg-rose-500 group-hover:text-white",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/10 group-hover:bg-orange-500 group-hover:text-white"
  };

  return (
    <div className="flex flex-col items-center text-center group/card cursor-default group-hover:scale-95 transition-transform duration-700">
      <div className={`w-full aspect-square flex flex-col items-center justify-center rounded-[2.5rem] border transition-all duration-500 shadow-sm group-hover/card:scale-110 group-hover/card:shadow-2xl ${colorMap[color]}`}>
        <Icon size={28} className="mb-3" />
        <span className="text-2xl font-black leading-none">{count}</span>
      </div>
      <span className="mt-5 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] group-hover/card:text-primary transition-colors whitespace-nowrap">{label}</span>
    </div>
  );
}