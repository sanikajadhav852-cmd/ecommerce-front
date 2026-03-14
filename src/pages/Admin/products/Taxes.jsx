import React, { useState } from 'react';
import { 
  RotateCcw, Search, Download, List, ChevronDown, MoreVertical, Percent, Plus, Activity, Shield, ChevronRight, Calculator, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Taxes() {
  const [taxes] = useState([]); // Matching the "No matching records found" state

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Percent size={16} className="text-primary animate-spin-slow" />
            <span>Fiscal Logic v2.4</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Tax Matrix</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Compliance Status: SECURE
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Tax Settings</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Add Tax Form */}
        <section className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
          <div className="bg-surface dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex items-center gap-4 mb-12 pb-6 border-b border-primary/10">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                    <Calculator size={24} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-widest">Fiscal Entry</h3>
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-1">Initialize Tax Protocol</p>
                </div>
            </div>

            <form className="space-y-10 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                  Tax Component Identity <span className="text-primary">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. GST_18_CLUSTER" 
                  className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                  Percentage Coefficient <span className="text-primary">*</span>
                </label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] pl-8 pr-16 py-5 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-primary font-black text-xl italic opacity-50">%</div>
                </div>
              </div>

              <div className="flex gap-4 pt-10">
                <button type="reset" className="flex-1 bg-background-site dark:bg-slate-800 text-slate-400 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-red-500 transition-all active:scale-95 shadow-sm border border-transparent hover:border-red-500/10 flex items-center justify-center gap-3">
                  <RotateCcw size={18} /> PURGE
                </button>
                <button type="submit" className="flex-[2] bg-primary text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all active:scale-95 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 relative overflow-hidden group/btn">
                   <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                   <Plus size={20} className="relative z-10" /> <span className="relative z-10">MAP_LOGIC</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: Taxes Table */}
        <section className="lg:col-span-8">
          <div className="bg-surface dark:bg-slate-900 p-12 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden flex flex-col min-h-[700px]">
            <div className="absolute top-0 right-0 -mr-60 -mt-60 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 mb-12 pb-10 border-b border-primary/10">
              <div>
                <h3 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Regulatory Matrix</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">Active Fiscal Component Nodes</p>
              </div>
              
              {/* Table Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
                <div className="relative group/search w-full sm:w-80">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
                  <input 
                    type="text" 
                    placeholder="Scan Tax Vectors..." 
                    className="w-full pl-16 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner shrink-0">
                  {[RotateCcw, List, Download].map((Icon, i) => (
                    <button key={i} className="p-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all active:scale-90 flex items-center gap-3">
                      <Icon size={22} />
                      {i === 2 && <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Export</span>}
                      {i > 0 && <ChevronDown size={14} className="opacity-20" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Architectural View */}
            <div className="relative z-10 overflow-x-auto rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800/10 shadow-sm bg-background-site/30 dark:bg-slate-950/20 flex-1">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
                  <tr>
                    {[
                      'Registry Ref', 'Tax Component Class', 'Coefficient Map', 'Logic Control'
                    ].map((h, i) => (
                      <th key={h} className={`px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ${i === 3 ? 'text-center' : 'border-r border-slate-100/30 dark:border-slate-800/20 last:border-r-0'}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                  <AnimatePresence mode="popLayout">
                    {taxes.length > 0 ? (
                      taxes.map((tax, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={tax.id} 
                          className="group hover:bg-background-site/50 dark:hover:bg-slate-800/50 transition-all duration-500"
                        >
                          <td className="px-10 py-8 text-primary dark:text-primary-light font-black tracking-tighter text-sm">
                             <div className="flex items-center gap-3">
                                <span className="opacity-30">#</span>{String(tax.id).padStart(3, '0')}
                             </div>
                          </td>
                          <td className="px-10 py-8 text-text-pri dark:text-white font-black uppercase tracking-tight group-hover:text-primary transition-colors">{tax.title}</td>
                          <td className="px-10 py-8">
                             <span className="px-6 py-2 bg-primary/5 text-primary dark:text-primary-light border border-primary/10 rounded-full font-black text-xs uppercase tracking-widest shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                {tax.percentage}%
                             </span>
                          </td>
                          <td className="px-10 py-8 text-center">
                            <button className="w-12 h-12 inline-flex items-center justify-center text-slate-200 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group-hover:shadow-lg active:scale-95">
                              <MoreVertical size={24} />
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-10 py-60 text-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
                             <Calculator size={400} />
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="w-24 h-24 bg-background-site dark:bg-slate-950 rounded-[2.5rem] flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-2xl animate-pulse text-slate-100 dark:text-slate-800">
                              <Percent size={48} />
                            </div>
                            <div className="space-y-4">
                              <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">FISCAL VACUUM</p>
                              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Zero Tax Regulations Identified in Matrix Cluster</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            <footer className="relative z-10 mt-12 p-10 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 rounded-[3rem] flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em]">
              <span className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shadow-lg shadow-emerald-500/50" />
                SYSTEM_LIVE: COMPLIANCE_LAYER_STABLE
              </span>
              <div className="flex items-center gap-3">
                 <Database size={16} /> DATA_NODES_ENCRYPTED
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           The tax matrix orchestrates all <span className="text-primary italic">fiscal-compliance</span> logic nodes. <br/>Regulation certificates are cryptographically signed and archived for audit transparency.
        </p>
      </footer>
    </div>
  );
}