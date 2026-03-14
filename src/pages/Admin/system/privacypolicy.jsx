import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  RotateCcw, 
  Save, 
  Eye, 
  Info,
  History,
  CheckCircle2,
  Lock,
  Activity,
  Shield,
  Gavel
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PolicySettings() {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Lock size={16} className="text-primary animate-pulse" />
            <span>Compliance Directive v5.0</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Legal & Compliance</h1>
        </div>

        {/* Premium Tab Switcher */}
        <div className="flex bg-surface dark:bg-slate-900 p-2 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-500">
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-4 px-10 py-5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group/tab ${
              activeTab === 'privacy' 
              ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
              : 'text-slate-400 dark:text-slate-600 hover:text-primary'
            }`}
          >
            <ShieldCheck size={18} className="relative z-10" />
            <span className="relative z-10">Privacy Directive</span>
            {activeTab === 'privacy' && (
              <motion.div layoutId="active-policy-bg" className="absolute inset-0 bg-primary z-0" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-4 px-10 py-5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group/tab ${
              activeTab === 'terms' 
              ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
              : 'text-slate-400 dark:text-slate-600 hover:text-primary'
            }`}
          >
            <FileText size={18} className="relative z-10" />
            <span className="relative z-10">Service Terms</span>
            {activeTab === 'terms' && (
              <motion.div layoutId="active-policy-bg" className="absolute inset-0 bg-primary z-0" />
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-surface dark:bg-slate-900 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-700 relative group"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* --- Toolbar Matrix --- */}
          <div className="px-12 py-8 bg-background-site/50 dark:bg-slate-950/50 border-b border-primary/5 flex flex-wrap items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                {[Eye, History].map((Icon, i) => (
                    <button key={i} className="p-5 bg-surface dark:bg-slate-900 text-slate-300 dark:text-slate-700 rounded-2xl border border-slate-100 dark:border-slate-800 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all shadow-sm active:scale-90">
                    <Icon size={24} />
                    </button>
                ))}
              </div>
              <div className="w-px h-12 bg-primary/10 mx-2" />
              <div className="flex items-center gap-4 text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                <CheckCircle2 size={24} className="animate-pulse" /> Auto-Sync: ACTIVE
              </div>
            </div>

            <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] italic opacity-70 group-hover:opacity-100 transition-opacity">
              Node Metric: {activeTab === 'privacy' ? '592 WORDS' : '2905 WORDS'} | Handshake: UTF-8
            </div>
          </div>

          {/* --- Writing Arena --- */}
          <div className="p-16 md:p-24 lg:p-32 relative group/nexus z-10">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-3 h-3 rounded-full bg-primary animate-ping shadow-lg shadow-primary/50" />
              <div className="h-3 w-3 bg-primary rounded-full absolute" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Compliance Editor: INITIALIZED</span>
            </div>

            <textarea
              className="w-full min-h-[700px] bg-transparent border-none outline-none text-text-pri dark:text-slate-200 leading-[2] font-serif text-2xl md:text-3xl resize-none placeholder:text-slate-100 dark:placeholder:text-slate-800 transition-all font-light"
              placeholder={activeTab === 'privacy' ? "Initialize Privacy Protocol matrix..." : "Initialize Service Terms matrix..."}
              defaultValue={activeTab === 'privacy' ? "Costumers ACCESSING, BROWSING OR OTHERWISE USING THE WEBSITE citycommerce.com indicates user is in AGREEMENT with citycommerce vegetables & fruits Pvt Ltd. Data protection is mission critical..." : "Personal Information eshop.com respects your privacy. This section clarifies the scope of service engagement and liability matrices..."}
            />
            
            {/* Floating Protocol Tag */}
            <div className="absolute top-16 right-16 opacity-0 group-hover/nexus:opacity-100 transition-all duration-700 -translate-y-4 group-hover/nexus:translate-y-0">
              <div className="flex items-center gap-4 bg-surface dark:bg-slate-800 px-8 py-4 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-3xl">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Protocol: RICH_SYNTAX</span>
              </div>
            </div>
          </div>

          {/* --- Action Console --- */}
          <div className="px-12 py-12 bg-background-site/80 dark:bg-slate-950/80 border-t border-primary/10 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8 p-10 bg-surface dark:bg-slate-900 border border-primary/10 rounded-[3rem] shadow-inner max-w-xl group/alert hover:border-primary/40 transition-all duration-700">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Info size={32} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-text-pri dark:text-white uppercase tracking-[0.4em]">Propogation Hub</span>
                <p className="text-[11px] font-black text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-tight italic">
                    Global propogation enabled for all public-facing endpoints. Review regulatory mapping before commit.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-5 px-12 py-6 bg-background-site dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:text-red-500 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 dark:border-slate-700/50 hover:border-red-500/20 transition-all active:scale-95 shadow-sm">
                <RotateCcw size={24} />
                ABORT_SEQUENCE
              </button>
              <button className="group/btn flex-1 lg:flex-none flex items-center justify-center gap-6 px-16 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.6em] shadow-3xl shadow-primary/40 hover:bg-black hover:-translate-y-2 transition-all active:scale-[0.98] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                <Save size={24} className="relative z-10" />
                <span className="relative z-10">COMMIT_POLICY_MANIFEST</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- FOOTER TELEMETRY --- */}
        <footer className="mt-24 text-center flex flex-col items-center gap-10 relative z-10">
          <div className="flex items-center gap-8 opacity-20 filter grayscale hover:grayscale-0 transition-all duration-1000">
              <Activity size={28} className="text-primary animate-pulse" />
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <ShieldCheck size={28} className="text-primary" />
          </div>
          <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.8em]">
            Legal Lifecycle Node: <span className="text-primary italic">ADMIN-PRIVACY-SIGMA-V5</span>
          </p>
        </footer>
      </main>
    </div>
  );
}