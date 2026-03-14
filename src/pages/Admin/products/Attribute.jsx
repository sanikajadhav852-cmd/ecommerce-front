import React, { useState } from 'react';
import { 
  RotateCcw, Search, Download, List, Plus, 
  MoreVertical, ChevronDown, Layers, Activity, Shield, ChevronRight, Grid, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Attribute() {
  const [attributes, setAttributes] = useState([
    { id: 3, type: "Weight", name: "1000 gm", status: true },
    { id: 2, type: "Weight", name: "500 gm", status: true },
    { id: 1, type: "Weight", name: "200 gm", status: true },
  ]);

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Layers size={16} className="text-primary animate-pulse" />
            <span>Property Matrix v4.8</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Attribute Hub</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Synapse Active: Nominal
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Attributes</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Add Attribute Form */}
        <section className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
          <div className="bg-surface dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex items-center gap-4 mb-12 pb-6 border-b border-primary/10">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                    <Grid size={24} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-widest">Registry Input</h3>
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-1">Define New Property Node</p>
                </div>
            </div>

            <form className="space-y-10 relative z-10">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-4">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                    Attribute Nexus <span className="text-primary">*</span>
                  </label>
                  <div className="relative group/filter-select">
                    <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
                      <option>Weight Matrix</option>
                      <option>Color Spectrum</option>
                      <option>Size Dimension</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-10">
                  <button type="button" className="bg-primary text-white p-4 rounded-2xl hover:bg-black transition-all shadow-2xl shadow-primary/20 active:scale-90 group-hover:rotate-12 duration-500">
                    <Plus size={20} />
                  </button>
                  <button type="button" className="bg-background-site dark:bg-slate-950 text-slate-400 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:text-primary transition-all active:scale-90 shadow-sm">
                    <List size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                  Property Identity <span className="text-primary">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Instance Identifier (e.g. 500gm)" 
                  className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                  Value Frequency <span className="text-primary">*</span>
                </label>
                <button type="button" className="w-full py-5 bg-primary/5 text-primary dark:text-primary-light rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] border-2 border-primary/10 hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg group/btn">
                  Configure Values Cluster
                </button>
              </div>

              <div className="flex gap-4 pt-10">
                <button type="reset" className="flex-1 bg-background-site dark:bg-slate-800 text-slate-400 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-red-500 transition-all active:scale-95 shadow-sm border border-transparent hover:border-red-500/10">
                  <RotateCcw size={16} className="inline mr-2" /> Purge
                </button>
                <button type="submit" className="flex-1 bg-primary text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-2xl shadow-primary/30 relative overflow-hidden group/save">
                   <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/save:translate-x-0 transition-transform duration-700" />
                   <span className="relative z-10">Registry Deposit</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: Attributes Table */}
        <section className="lg:col-span-8">
          <div className="bg-surface dark:bg-slate-900 p-12 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden flex flex-col min-h-[700px]">
            <div className="absolute top-0 right-0 -mr-60 -mt-60 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 mb-12 pb-10 border-b border-primary/10">
              <div>
                <h3 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Active Artifacts</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1 line-relaxed">System-wide Property Nodes</p>
              </div>
              
              {/* Table Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <div className="relative group/search w-full sm:w-80">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
                  <input 
                    type="text" 
                    placeholder="Scan Artifacts..." 
                    className="w-full pl-16 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner shrink-0">
                  {[RotateCcw, List, Download].map((Icon, i) => (
                    <button key={i} className="p-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all active:scale-90 flex items-center gap-3 shadow-sm">
                      <Icon size={22} />
                      {i === 2 && <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Export</span>}
                      {i > 0 && <ChevronDown size={14} className="opacity-20" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Architecture */}
            <div className="relative z-10 overflow-x-auto rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800/10 shadow-sm bg-background-site/30 dark:bg-slate-950/20">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
                  <tr>
                    {[
                      'Registry ID', 'Matrix Class', 'Artifact Label', 'State Buffer', 'Ops'
                    ].map((h, i) => (
                      <th key={h} className={`px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ${i === 4 ? 'text-center' : 'border-r border-slate-100/30 dark:border-slate-800/20 last:border-r-0'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                  <AnimatePresence>
                    {attributes.map((attr, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={attr.id} 
                        className="group hover:bg-background-site/50 dark:hover:bg-slate-800/50 transition-all duration-500"
                      >
                        <td className="px-10 py-8 text-primary dark:text-primary-light font-black tracking-tighter text-sm">
                           <div className="flex items-center gap-3">
                              <span className="opacity-30">#</span>{String(attr.id).padStart(3, '0')}
                           </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="px-5 py-2 bg-primary/5 text-primary dark:text-primary-light border border-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                             {attr.type}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-text-pri dark:text-white font-black uppercase tracking-tight group-hover:text-primary transition-colors">{attr.name}</td>
                        <td className="px-10 py-8">
                          <label className="relative inline-flex items-center cursor-pointer group/toggle">
                            <input type="checkbox" checked={attr.status} className="sr-only peer" readOnly />
                            <div className="w-16 h-8 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[24px] after:w-[24px] after:transition-all duration-500 peer-checked:bg-emerald-500 shadow-inner ring-offset-4 ring-offset-surface dark:ring-offset-slate-900 peer-checked:ring-4 peer-checked:ring-emerald-500/20" />
                          </label>
                        </td>
                        <td className="px-10 py-8 text-center">
                          <button className="w-12 h-12 inline-flex items-center justify-center text-slate-200 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group-hover:shadow-lg active:scale-95">
                            <MoreVertical size={24} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            <footer className="mt-12 p-10 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 rounded-[3rem] flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 tracking-[0.5em] uppercase relative z-10">
              <span className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                TELEMETRY SCAN: {attributes.length} ACTIVE CLUSTERS
              </span>
              <div className="flex items-center gap-3">
                 <Database size={16} /> CLUSTER-ID: P-MAT-v4.x
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           The property matrix orchestrates all <span className="text-primary italic">SKU-specific</span> variance nodes. <br/>Registry logs are immutable and cryptographically synchronized across global endpoints.
        </p>
      </footer>
    </div>
  );
}