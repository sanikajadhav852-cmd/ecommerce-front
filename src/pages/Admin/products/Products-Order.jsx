import React, { useState } from 'react';
import { Search, ChevronDown, ArrowUpDown, Move, Activity, Shield, ChevronRight, Layers, Save, Grid } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

export default function ProductsOrder() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "KANDA LASUN MASALA",
      image: "https://placehold.co/100x100?text=Kanda+Lasun",
      displayOrder: 0,
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "MUTTON MASALA",
      image: "https://placehold.co/100x100?text=Mutton+Masala",
      displayOrder: 1,
      status: "ACTIVE"
    }
  ]);

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <ArrowUpDown size={16} className="text-primary animate-bounce" />
            <span>Sequence Engine v3.1</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Hierarchy Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Engine Priority: Nominal
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Display Order</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* Dimensional Filter Hub */}
        <section className="bg-surface dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h3 className="text-xs font-black text-text-pri dark:text-white uppercase tracking-[0.3em] mb-10 pb-6 border-b border-primary/10 flex items-center gap-4 relative z-10">
            <Grid size={20} className="text-primary" /> Sector Calibration
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group/filter-select w-full md:w-96">
              <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
                <option>Comprehensive Product Domains</option>
                <option>Ready Mix Masala Cluster</option>
                <option>Khada Masala Cluster</option>
              </select>
              <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-all duration-500 pointer-events-none" />
            </div>
            <button className="group w-full md:w-auto px-12 py-5 bg-primary hover:bg-black text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
               <Search size={18} className="relative z-10" /> <span className="relative z-10">EXECUTE_DOMAIN_QUERY</span>
            </button>
          </div>
        </section>

        {/* Entity Stack Matrix */}
        <section className="bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group overflow-hidden">
          <div className="px-12 py-10 border-b border-slate-50 dark:border-slate-800/50 bg-background-site/20 dark:bg-slate-950/20 flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
                <div className="p-4 bg-primary/10 text-primary rounded-[1.5rem] shadow-inner">
                    <Move size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Logical Sequence</h3>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">Global Storefront Hierarchy</p>
                </div>
            </div>
            <button className="group px-10 py-4 bg-emerald-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:bg-black transition-all relative overflow-hidden flex items-center gap-3 active:scale-95">
               <Save size={18} /> Commit Hierarchy State
            </button>
          </div>

          <div className="p-12">
            {/* Architectural Header */}
            <div className="grid grid-cols-12 gap-8 px-10 py-6 bg-background-site dark:bg-slate-950 rounded-[2rem] text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mb-8 shadow-inner border border-slate-50 dark:border-slate-800/50">
              <div className="col-span-2">INDEX_POS</div>
              <div className="col-span-4"> NEXUS_IDENTITY </div>
              <div className="col-span-3 text-center"> VISUAL_BUFFER </div>
              <div className="col-span-3 text-right pr-4"> TELEMETRY </div>
            </div>

            {/* Invariant Reorder Group */}
            <Reorder.Group 
              axis="y" 
              values={products} 
              onReorder={setProducts}
              className="space-y-6"
            >
              <AnimatePresence>
                {products.map((item, index) => (
                  <Reorder.Item 
                    key={item.id} 
                    value={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="group/item"
                  >
                    <div className="grid grid-cols-12 gap-8 px-10 py-8 items-center bg-background-site dark:bg-slate-950 border-2 border-transparent hover:border-primary/20 hover:bg-surface dark:hover:bg-slate-900 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 cursor-default group/row active:cursor-grabbing">
                      <div className="col-span-2 text-primary dark:text-primary-light font-black tracking-tighter text-3xl">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="col-span-4 space-y-1">
                        <h4 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight group-hover/row:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-50">NODE_ID: #{item.id}</p>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="w-24 h-24 bg-white dark:bg-slate-950 rounded-[2rem] border-4 border-white dark:border-slate-800 group-hover:border-primary/20 overflow-hidden shadow-2xl flex items-center justify-center p-3 transition-all duration-700 grayscale group-hover/row:grayscale-0 group-hover/row:rotate-3 group-hover/row:scale-110">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 flex flex-col items-end gap-3 pr-4">
                        <span className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-500/5 text-emerald-500 dark:text-emerald-400 text-[9px] font-black rounded-full border border-emerald-500/10 uppercase tracking-[0.2em] shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                          SIGNAL: {item.status}
                        </span>
                        <div className="p-3 text-slate-100 dark:text-slate-800 group-hover/row:text-primary group-hover/row:scale-125 transition-all duration-500">
                           <Layers size={24} />
                        </div>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </div>
          
          <footer className="p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em] rounded-b-[5rem]">
             <span className="flex items-center gap-3">
                <Shield size={16} /> CLUSTER_INTEGRITY_VERIFIED
             </span>
             <div className="flex items-center gap-3 italic">
                <Activity size={14} /> ACTIVE_SEQUENCE_BUFFER: {products.length} NODES
             </div>
          </footer>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           Display hierarchy adjustments reflect in <span className="text-primary italic">real-time</span> across edge storefront nodes. <br/>Ensure <span className="text-primary underline px-1">Commit Sequence</span> is executed for persistent state architecture.
        </p>
      </footer>
    </div>
  );
}