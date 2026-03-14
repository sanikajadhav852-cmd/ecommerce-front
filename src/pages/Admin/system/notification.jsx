import React, { useState } from 'react';
import { 
  BellRing, Key, ShieldCheck, FileJson, 
  UploadCloud, RotateCcw, Save, Info,
  ExternalLink, ChevronRight, Activity, Zap, Shield, Lock, Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationSettings() {
  const [fileName, setFileName] = useState('No manifest detected');
  const [formData, setFormData] = useState({
    vapidKey: '',
    firebaseId: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <BellRing size={16} className="text-primary animate-bounce" />
            <span>Alert Infrastructure v4.3</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Notification Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Signal Integrity: NOMINAL
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-700 relative group"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* --- Technical Alert Protocol --- */}
          <div className="bg-primary/5 dark:bg-primary/10 px-10 py-8 border-b border-primary/10 flex items-center gap-8 relative z-10">
            <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-2xl shadow-primary/30 animate-pulse">
              <Zap size={28} />
            </div>
            <div className="space-y-1">
                <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Active Push Protocol Sync</p>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-relaxed italic">
                    Universal broadcast requires valid Firebase project mapping and VAPID key exchange.
                </p>
            </div>
          </div>

          <form className="p-12 md:p-20 space-y-16 relative z-10">
            
            {/* --- VapID Key Matrix --- */}
            <div className="space-y-6">
              <label className="flex items-center gap-4 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">
                <Key size={18} className="text-primary" />
                VAPID Public Key Protocol
              </label>
              <div className="relative group/input">
                <textarea
                  rows={3}
                  placeholder="Insert public broadcast key identity..."
                  className="w-full px-8 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner resize-none font-mono tracking-tighter"
                />
                <div className="absolute right-8 bottom-6 opacity-0 group-hover/input:opacity-100 transition-opacity">
                    <Lock size={16} className="text-primary/30" />
                </div>
              </div>
            </div>

            {/* --- Firebase Cluster Identification --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <label className="flex items-center gap-4 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">
                  <Cloud size={18} className="text-primary" />
                  Firebase Project ID
                </label>
                <div className="relative group/input">
                    <input
                    type="text"
                    placeholder="e.g. cloud-nexus-sigma-01"
                    className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner"
                    />
                </div>
              </div>

              {/* External Console Bridge */}
              <div className="flex flex-col justify-center bg-background-site/50 dark:bg-slate-950/50 rounded-[3rem] px-10 py-6 border border-slate-100 dark:border-slate-800/10 shadow-inner group/console hover:bg-surface dark:hover:bg-slate-900 transition-all duration-500">
                <div className="space-y-3">
                  <p className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">External Assets</p>
                  <a href="#" className="inline-flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors group-hover/console:translate-x-1 duration-700">
                    Firebase Cloud Console <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* --- Manifest Ingestion --- */}
            <div className="space-y-8 pt-6">
              <label className="flex items-center gap-4 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">
                <FileJson size={18} className="text-primary" />
                Security Manifest (.json)
              </label>
              
              <div className="relative group/upload">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="relative border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem] p-16 transition-all duration-700 group-hover/upload:border-primary/20 group-hover/upload:bg-primary/5 flex flex-col items-center">
                    <div className="w-24 h-24 bg-surface dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-3xl border border-slate-100 dark:border-slate-800 mb-8 group-hover/upload:scale-110 group-hover/upload:rotate-6 transition-all duration-700 relative z-10">
                        <UploadCloud size={44} className="text-primary" />
                    </div>
                    <h3 className="text-base font-black text-text-pri dark:text-white uppercase tracking-tighter mb-2 group-hover/upload:text-primary transition-colors">{fileName}</h3>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] opacity-60">
                    Authorized Protocol: <span className="text-primary italic">JSON manifest</span> only
                    </p>
                </div>
              </div>
            </div>

            {/* --- Action Controller --- */}
            <div className="pt-12 flex flex-col sm:flex-row items-center gap-8 border-t border-primary/10">
              <button
                type="submit"
                className="group/submit w-full sm:w-auto flex-1 flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl shadow-primary/40 hover:bg-black hover:-translate-y-2 transition-all active:scale-95 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/submit:translate-x-0 transition-transform duration-700" />
                <Save size={22} className="relative z-10" />
                <span className="relative z-10">Synchronize_Forge_Protocol</span>
              </button>
              
              <button
                type="reset"
                className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-background-site dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 dark:border-slate-700/50 hover:border-red-500/20 transition-all active:scale-95 shadow-sm"
              >
                <RotateCcw size={22} />
                Abort
              </button>
            </div>

          </form>
        </motion.div>
        
        {/* --- FOOTER TELEMETRY --- */}
        <footer className="mt-24 text-center flex flex-col items-center gap-8 relative z-10">
          <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
            <Activity size={24} className="text-primary animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Lock size={24} className="text-primary" />
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.6em] flex items-center gap-4">
            <ShieldCheck size={18} className="text-primary" />
            Signal Cluster: <span className="text-primary italic">ALERT-SIGMA-V4</span>
          </p>
        </footer>
      </main>
    </div>
  );
}