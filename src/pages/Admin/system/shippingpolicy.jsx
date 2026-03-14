import React, { useState } from 'react';
import { 
  Truck, Save, RotateCcw, ChevronRight, 
  Clock, CheckCircle2, History, Eye, 
  MapPin, AlertCircle, Ship, Globe,
  Activity, Shield, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShippingPolicy() {
  const [charCount, setCharCount] = useState(156);

  const handleContentChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Ship size={16} className="text-primary animate-pulse" />
            <span>Distribution Protocol v5.1</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Shipping Registry</h1>
        </div>

        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-500">
          <div className="flex items-center gap-4 px-8 py-3 border-r border-primary/10">
            <Clock size={18} className="text-primary" />
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Sync: 12:10_PM</span>
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
          
          {/* Top Status Bar */}
          <div className="px-12 py-6 bg-primary/5 dark:bg-primary/10 border-b border-primary/5 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-primary animate-ping shadow-lg shadow-primary/50" />
              <div className="h-3 w-3 bg-primary rounded-full absolute" />
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-2">Deployment Stream: HIGH_AVAILABILITY</p>
            </div>
            <button className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-[0.4em] hover:underline group/preview">
              <Eye size={18} className="group-hover/preview:scale-110 transition-transform" /> <span className="hidden sm:inline">Initialize Policy Preview</span>
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
              <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 px-8 py-4 rounded-[1.5rem] border border-primary/5 shadow-inner group/sync transition-all hover:border-primary/20">
                 <MapPin size={18} className="text-primary group-hover:animate-bounce" />
                 <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Global Logistics Sync</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 px-8 py-4 rounded-full border border-primary/5 shadow-inner group/meta">
                <CheckCircle2 size={18} className="text-emerald-500" />
                Index: <span className="text-primary">{charCount.toLocaleString()}</span> METRICS
              </div>
            </div>
          </div>

          {/* Textarea Node */}
          <div className="p-16 md:p-24 lg:p-32 relative group/nexus z-10">
            <div className="flex items-center gap-4 mb-16">
              <Sparkles size={24} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Distribution Editor: ACTIVE_STREAMS</span>
            </div>
            <textarea
              onChange={handleContentChange}
              className="w-full min-h-[550px] bg-transparent border-none outline-none text-text-pri dark:text-slate-200 leading-[2] font-serif text-2xl md:text-3xl resize-none placeholder:text-slate-100 dark:placeholder:text-slate-800 transition-all font-light"
              placeholder="Detail distribution channels, cost matrices, and delivery timelines..."
              defaultValue="We offer standard shipping (3-5 business days) and express delivery (1-2 business days). Shipping costs are calculated at checkout based on weight and destination. Free shipping applies to orders over $50."
            />
          </div>

          {/* Action Console */}
          <div className="px-12 py-12 bg-background-site/80 dark:bg-slate-950/80 border-t border-primary/10 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8 p-10 bg-surface dark:bg-slate-900 border border-amber-500/10 rounded-[3rem] shadow-inner max-w-xl group/alert hover:border-amber-500/30 transition-all duration-700">
              <div className="w-16 h-16 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl text-amber-500 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <AlertCircle size={32} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-text-pri dark:text-white uppercase tracking-[0.4em]">Operational Directive</span>
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-tight italic">
                  Disclose logistical variances or international regulatory restrictions to optimize global distribution success.
                </p>
              </div>
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
            <Globe size={32} className="text-primary animate-spin-slow" />
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Truck size={32} className="text-primary" />
          </div>
          <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.8em]">
            Distribution Registry: <span className="text-primary italic">ID-SHIP-NODE-EPSILON-V5</span>
          </p>
        </footer>
      </main>
    </div>
  );
}