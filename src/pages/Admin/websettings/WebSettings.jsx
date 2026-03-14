// src/pages/admin/WebSettings.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, Palette, Database, Smartphone, 
  ChevronRight, Monitor, Zap, Layout, 
  Cpu, Globe, ShieldCheck, Activity, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WebSettings() {
  const cards = [
    {
      title: 'General Identity',
      description: 'Master branding, site title, support nodes, and SEO manifest control',
      icon: Settings,
      path: '/admin/web-settings/general',
      color: 'bg-primary/5 text-primary',
      accent: 'primary',
      border: 'border-primary/10',
    },
    {
      title: 'Style Engine',
      description: 'Dynamic color matrices, typography systems, and theme orchestration',
      icon: Palette,
      path: '/admin/web-settings/themes',
      color: 'bg-emerald-500/5 text-emerald-500',
      accent: 'emerald-500',
      border: 'border-emerald-500/10',
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Firebase integration, security protocols, and mission-critial storage',
      icon: Database,
      path: '/admin/web-settings/firebase',
      color: 'bg-amber-500/5 text-amber-500',
      accent: 'amber-500',
      border: 'border-amber-500/10',
    },
    {
      title: 'Social & Mobile',
      description: 'App distribution endpoints, social clusters, and cross-platform vectors',
      icon: Smartphone,
      path: '/admin/web-settings/app-social',
      color: 'bg-rose-500/5 text-rose-500',
      accent: 'rose-500',
      border: 'border-rose-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Cpu size={16} className="text-primary animate-pulse" />
            <span>Core Ecosystem Controller v4.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Web Configuration</h1>
        </div>

        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-500">
           <div className="px-6 py-4 text-[10px] font-black text-emerald-500 bg-emerald-500/5 rounded-[1.5rem] border border-emerald-500/10 flex items-center gap-3">
             <Activity size={18} /> Network Status: NOMINAL
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
            >
              <Link
                to={card.path}
                className="group relative flex flex-col bg-surface dark:bg-slate-900 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 p-12 shadow-sm transition-all duration-700 hover:shadow-[0_0_80px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-4 overflow-hidden"
              >
                {/* Visual Background Accent */}
                <div className={`absolute top-0 right-0 w-60 h-60 ${card.color} opacity-0 group-hover:opacity-100 rounded-full blur-[80px] -mr-20 -mt-20 transition-opacity duration-1000`} />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center ${card.color} border-2 ${card.border} shadow-inner transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                    <card.icon size={44} />
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center bg-background-site dark:bg-slate-800/50 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary/30">
                    <ChevronRight size={28} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-3xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-[0.2em] italic">
                    {card.description}
                  </p>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em]">
                    <Zap size={16} className="text-primary animate-pulse" /> Latency: 4ms_DELTA
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 translate-x-8 group-hover:translate-x-0 transition-all duration-700 flex items-center gap-3">
                    Initialize Protocol <Sparkles size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* --- DYNAMIC ALERT CLUSTER --- */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-12 bg-slate-950 rounded-[5rem] border-4 border-primary/10 shadow-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-700"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none opacity-50" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
             <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-700">
                   <ShieldCheck size={48} />
                </div>
                <div className="space-y-3">
                   <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Global Sync Matrix</h4>
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] leading-relaxed max-w-2xl italic">System-wide parameters are mirrored across distributed nodes. Changes committed in these sub-modules propagate instantly to all storefront endpoints via secure handshake.</p>
                </div>
             </div>
             <button className="group/audit w-full lg:w-auto px-16 py-7 bg-white text-slate-950 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-3xl hover:bg-primary hover:text-white transition-all active:scale-95 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover/audit:translate-x-0 transition-transform duration-700" />
                <span className="relative z-10">Audit Node Health</span>
             </button>
          </div>
        </motion.section>

        {/* --- SYSTEM FOOTER --- */}
        <footer className="mt-32 text-center flex flex-col items-center gap-10 opacity-30 relative z-10 grayscale hover:grayscale-0 transition-all duration-1000">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[1em] flex items-center gap-6">
             <Globe size={18} className="text-primary animate-spin-slow" /> STABLE-V4.2.0 | HUB-ADMIN-WEB
          </p>
        </footer>
      </main>
    </div>
  );
}