import React, { useState } from 'react';
import { 
  RotateCcw, Save, Undo2, ChevronRight, Info,
  CheckCircle2, Clock, History, Eye, ShieldCheck,
  PackageCheck, Activity, Shield, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReturnPolicy() {
  const [charCount, setCharCount] = useState(132); // Initial count based on default text

  const handleContentChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <PackageCheck size={16} className="text-primary animate-bounce" />
            <span>Logistics Feedback Protocol v4.4</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Return Registry</h1>
        </div>

        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-500">
          <div className="flex items-center gap-4 px-8 py-3 border-r border-primary/10">
            <Clock size={18} className="text-primary" />
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Last Commit: 16:45_PM</span>
          </div>
          <button className="p-4 hover:bg-primary/5 rounded-full text-slate-300 dark:text-slate-700 hover:text-primary transition-all active:scale-90">
            <History size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* --- Editor Matrix --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-surface dark:bg-slate-900 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-700 relative group"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Top Protocol Bar */}
          <div className="px-12 py-6 bg-primary/5 dark:bg-primary/10 border-b border-primary/5 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping shadow-lg shadow-emerald-500/50" />
              <div className="h-3 w-3 bg-emerald-500 rounded-full absolute" />
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-2">Logic Stream: ACTIVE_FEEDBACK</p>
            </div>
            <button className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:underline group/render">
              <Eye size={18} className="group-hover/render:scale-110 transition-transform" /> <span className="hidden sm:inline">Render Storefront Endpoint</span>
            </button>
          </div>

          {/* Toolbar Nexus */}
          <div className="px-12 py-8 border-b border-primary/5 flex flex-wrap items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-8">
              <div className="flex bg-background-site dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] p-1.5 shadow-inner">
                {['B', 'I', 'U'].map((label, i) => (
                  <button key={i} className={`px-8 py-3 hover:bg-surface dark:hover:bg-slate-900 rounded-xl text-text-pri dark:text-white font-black text-sm transition-all hover:scale-110 active:scale-90 ${i === 1 ? 'italic font-serif' : i === 2 ? 'underline' : ''}`}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="w-px h-12 bg-primary/10" />
              <div className="relative group/select">
                 <select className="bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-2xl px-10 py-4 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em] outline-none transition-all appearance-none cursor-pointer shadow-inner">
                    <option>SYSTEM_DEFAULT</option>
                    <option>CLAUSE_HEADER</option>
                    <option>POINT_NARRATIVE</option>
                </select>
                <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary rotate-90 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 px-8 py-4 rounded-full border border-primary/5 shadow-inner group/meta transition-all hover:border-primary/20">
                <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                Index: <span className="text-primary">{charCount.toLocaleString()}</span> METRICS
              </div>
            </div>
          </div>

          {/* Writing Node */}
          <div className="p-16 md:p-24 lg:p-32 relative group/nexus z-10">
            <div className="flex items-center gap-4 mb-16">
              <Sparkles size={24} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Protocol Editor: IN_PROGRESS</span>
            </div>
            <textarea
              onChange={handleContentChange}
              className="w-full min-h-[600px] bg-transparent border-none outline-none text-text-pri dark:text-slate-200 leading-[2] font-serif text-2xl md:text-3xl resize-none placeholder:text-slate-100 dark:placeholder:text-slate-800 transition-all font-light"
              placeholder="Synthesize return window, condition parameters, and refund logic..."
              defaultValue="Our Return Policy ensures a hassle-free experience. Customers can return items within 30 days of purchase provided they are in original condition with tags intact. Please allow 5-7 business days for refund processing."
            />
          </div>

          {/* Action Console */}
          <div className="px-12 py-12 bg-background-site/80 dark:bg-slate-950/80 border-t border-primary/10 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8 p-10 bg-surface dark:bg-slate-900 border border-primary/10 rounded-[3rem] shadow-inner max-w-xl group/alert hover:border-primary/40 transition-all duration-700">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-tight italic">
                Global propagation hub active: Changes committed here scale across all <span className="text-primary">Mobile Domain</span> and <span className="text-primary">Web Cluster</span> nodes.
              </p>
            </div>

            <div className="flex items-center gap-6 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-5 px-12 py-6 bg-surface dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:text-red-500 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 dark:border-slate-700/50 hover:border-red-500/20 transition-all active:scale-95 shadow-sm">
                <RotateCcw size={24} />
                ABORT_DRAFT
              </button>
              <button className="group/btn flex-1 lg:flex-none flex items-center justify-center gap-6 px-16 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.6em] shadow-3xl shadow-primary/40 hover:bg-black hover:-translate-y-2 transition-all active:scale-[0.98] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                <Save size={24} className="relative z-10" />
                <span className="relative z-10">COMMIT_POLICY</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- FOOTER TELEMETRY --- */}
        <footer className="mt-24 text-center flex flex-col items-center gap-10 relative z-10">
          <div className="flex items-center gap-10 opacity-20 filter grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="h-8 w-20 bg-primary/30 rounded-lg skew-x-12" />
            <Activity size={32} className="text-primary animate-pulse" />
            <div className="h-8 w-20 bg-primary/30 rounded-lg -skew-x-12" />
          </div>
          <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.8em]">
            Policy Lifecycle Environment: <span className="text-primary italic">ID-RETURN-LOG-EPSILON</span>
          </p>
        </footer>
      </main>
    </div>
  );
}