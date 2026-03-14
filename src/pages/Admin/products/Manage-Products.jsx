import React, { useState } from 'react';
import { 
  Plus, Search, RotateCcw, List, Download, 
  ChevronDown, MoreVertical, Star, Activity, Shield, ChevronRight, Package, Grid, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageProducts() {
  const navigate = useNavigate();
  
  // Mock data based on your screenshot
  const [products] = useState([
    {
      id: 1,
      image: "https://placehold.co/100x100?text=Kasoori+Methi", 
      name: "KASOORI METHI (Variable Product)",
      rating: 0,
      active: true
    },
    {
      id: 2,
      image: "https://placehold.co/100x100?text=Kashmiri+Chilli",
      name: "KASHMIRI CHILLI POWDER (Simple Product)",
      rating: 0,
      active: true
    },
    {
      id: 3,
      image: "https://placehold.co/100x100?text=Bedgi+Chilli",
      name: "BEDGI CHILLI POWDER (Simple Product)",
      rating: 0,
      active: true
    }
  ]);

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Package size={16} className="text-primary animate-pulse" />
            <span>Inventory Architecture v6.0</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Product Forge</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <Activity size={18} /> Global Stock: Nominal
          </div>
          <button 
            onClick={() => navigate('/add-product')}
            className="group relative flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-primary/30 hover:bg-black active:scale-95 overflow-hidden"
          >
            <Plus size={20} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
            <span className="relative z-10">Register Asset</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 transition-all relative group overflow-hidden">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Filters and Search Hub */}
          <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 mb-12 pb-12 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row gap-8 w-full xl:w-auto">
              <div className="space-y-4 flex-1 sm:w-80">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Category Nexus</label>
                <div className="relative group/filter-select">
                  <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
                    <option>Comprehensive Directory</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500" />
                </div>
              </div>

              <div className="space-y-4 flex-1 sm:w-64">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Pattern Logic</label>
                <div className="relative group/filter-select">
                  <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
                    <option>All Archetypes</option>
                    <option>Simple Node</option>
                    <option>Variable Cluster</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
              <div className="relative group/search w-full sm:w-96">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
                <input 
                  type="text" 
                  placeholder="Scan Product Records..." 
                  className="w-full pl-16 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                />
              </div>
              <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                {[RotateCcw, Grid, Download].map((Icon, i) => (
                  <button key={i} className="p-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all active:scale-90 flex items-center gap-3">
                    <Icon size={22} />
                    {i === 2 && <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Export</span>}
                    {i > 0 && <ChevronDown size={14} className="opacity-30" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Architecture */}
          <div className="overflow-x-auto rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800/10 shadow-sm">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
                <tr>
                  {[
                    'Visual ID', 'Node Identity', 'Reputation Matrix', 'Operational State', 'Ops Hub'
                  ].map((h, i) => (
                    <th key={h} className={`px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ${i === 4 ? 'text-center' : 'border-r border-slate-100/30 dark:border-slate-800/20 last:border-r-0'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                <AnimatePresence>
                  {products.map((product, idx) => (
                    <motion.tr 
                      key={product.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-background-site/30 dark:hover:bg-slate-800/30 transition-all duration-500"
                    >
                      <td className="px-10 py-8">
                        <div className="w-20 h-20 rounded-[1.5rem] border-4 border-white dark:border-slate-800 overflow-hidden bg-background-site dark:bg-slate-950 shadow-xl group-hover:rotate-3 group-hover:scale-110 transition-all duration-700 flex items-center justify-center p-2">
                          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-2">
                          <h4 className="text-lg font-black text-text-pri dark:text-white tracking-tight uppercase group-hover:text-primary transition-colors">{product.name}</h4>
                          <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-primary/5 text-primary dark:text-primary-light border border-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">Core Identity: #{product.id}</span>
                            <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest hidden sm:inline flex items-center gap-2">
                               <Shield size={12} /> Registry Verified
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-3">
                          <div className="flex gap-1.5 text-slate-100 dark:text-slate-800">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} className={`${i < product.rating ? 'text-amber-400 fill-amber-400 shadow-lg' : ''} group-hover:scale-125 transition-transform duration-500`} />
                            ))}
                          </div>
                          <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em] block">PROTOCOL: NOMINAL</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <label className="relative inline-flex items-center cursor-pointer group/toggle">
                          <input type="checkbox" checked={product.active} className="sr-only peer" readOnly />
                          <div className="w-16 h-8 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[24px] after:w-[24px] after:transition-all peer-checked:bg-emerald-500 shadow-inner ring-offset-4 ring-offset-surface dark:ring-offset-slate-900 peer-checked:ring-4 peer-checked:ring-emerald-500/20 transition-all duration-500" />
                          <span className={`ml-4 text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${product.active ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {product.active ? 'Operational' : 'Paused'}
                          </span>
                        </label>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <button className="w-12 h-12 inline-flex items-center justify-center text-slate-200 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 shadow-sm group-hover:shadow-lg">
                          <MoreVertical size={24} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <footer className="mt-12 p-10 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 rounded-[3rem] flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 tracking-[0.5em] uppercase">
            <span className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              INVENTORY CLUSTER SYNC: ACTIVE
            </span>
            <div className="flex items-center gap-3">
               <Database size={16} /> Total Artifacts: {products.length}
            </div>
          </footer>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           The product forge handles all <span className="text-primary italic">SKU-domain</span> lifecycle events. <br/>Inventory state is synchronized across edge delivery nodes globally.
        </p>
      </footer>
    </div>
  );
}