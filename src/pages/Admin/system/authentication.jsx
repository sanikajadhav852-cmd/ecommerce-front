import React, { useState } from 'react';
import { 
  ShieldCheck, Smartphone, Flame, 
  RotateCcw, Save, CheckCircle2,
  ChevronRight, Lock, Key, Activity, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthenticationSettings() {
  const [selectedMode, setSelectedMode] = useState('firebase');

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Lock size={16} className="text-primary animate-pulse" />
            <span>Security Protocol v5.1</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Auth Mode</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Shield size={18} /> Protocol Status: SECURE
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 md:p-20 transition-all duration-700 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="space-y-16 relative z-10">
            <div className="space-y-12">
              <div className="flex items-center gap-6 pb-6 border-b border-primary/10">
                  <div className="p-4 bg-primary/10 text-primary rounded-3xl shadow-inner">
                      <Key size={28} />
                  </div>
                  <div>
                      <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Primary Verification Vector</h3>
                      <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">Select Active Authentication Provider</p>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* --- Firebase Option --- */}
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedMode('firebase')}
                  className={`relative p-10 rounded-[3rem] border-4 cursor-pointer transition-all duration-700 overflow-hidden group/opt ${
                    selectedMode === 'firebase' 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-3xl shadow-primary/10' 
                    : 'border-background-site dark:border-slate-800 bg-background-site/50 dark:bg-slate-950/50 hover:bg-surface dark:hover:bg-slate-900 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-10 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-inner border border-transparent ${
                      selectedMode === 'firebase' ? 'bg-primary text-white scale-110 rotate-12' : 'bg-surface dark:bg-slate-900 text-slate-300'
                    }`}>
                      <Flame size={32} />
                    </div>
                    {selectedMode === 'firebase' && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-primary text-white p-1.5 rounded-full shadow-2xl shadow-primary/40"
                      >
                        <CheckCircle2 size={28} />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-xl font-black text-text-pri dark:text-white mb-3 uppercase tracking-tighter">Firebase Auth</h4>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-[0.2em] opacity-70 group-hover/opt:opacity-100 transition-opacity italic">
                        Enterprise cloud matrix with global latency optimization.
                    </p>
                  </div>

                  {/* Decorative Background Vector */}
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 ${selectedMode === 'firebase' ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
                </motion.div>

                {/* --- Custom SMS Option --- */}
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedMode('sms')}
                  className={`relative p-10 rounded-[3rem] border-4 cursor-pointer transition-all duration-700 overflow-hidden group/opt ${
                    selectedMode === 'sms' 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-3xl shadow-primary/10' 
                    : 'border-background-site dark:border-slate-800 bg-background-site/50 dark:bg-slate-950/50 hover:bg-surface dark:hover:bg-slate-900 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-10 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-inner border border-transparent ${
                      selectedMode === 'sms' ? 'bg-primary text-white scale-110 -rotate-12' : 'bg-surface dark:bg-slate-900 text-slate-300'
                    }`}>
                      <Smartphone size={32} />
                    </div>
                    {selectedMode === 'sms' && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-primary text-white p-1.5 rounded-full shadow-2xl shadow-primary/40"
                      >
                        <CheckCircle2 size={28} />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-xl font-black text-text-pri dark:text-white mb-3 uppercase tracking-tighter">Custom SMS</h4>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-[0.2em] opacity-70 group-hover/opt:opacity-100 transition-opacity italic">
                        Direct gateway integration for proprietary OTP protocols.
                    </p>
                  </div>

                  {/* Decorative Background Vector */}
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl transition-all duration-1000 ${selectedMode === 'sms' ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`} />
                </motion.div>

              </div>
            </div>

            {/* --- Controller Console --- */}
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-12 border-t border-primary/10">
              <button
                className="group w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl shadow-primary/40 hover:bg-black hover:-translate-y-2 transition-all active:scale-95 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <Save size={22} className="relative z-10" />
                <span className="relative z-10">DEPLOY_CONFIG_VECTOR</span>
              </button>
              
              <button
                onClick={() => setSelectedMode('firebase')}
                className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-background-site dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 dark:border-slate-700/50 hover:border-red-500/20 transition-all active:scale-95 shadow-sm"
              >
                <RotateCcw size={22} />
                ABORT_SEQUENCE
              </button>
            </div>

            <div className="mt-12 p-10 bg-amber-500/5 border-2 border-amber-500/10 rounded-[3rem] flex items-center gap-8 shadow-2xl shadow-amber-500/5 group/alert">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-amber-500/30 shrink-0 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-1">
                <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none mb-2">Protocol Warning</h5>
                <p className="text-[10px] font-black text-amber-600/70 uppercase tracking-tight leading-relaxed italic">
                    Translation of the authentication vector may invalidate current synchronization tokens, necessitating session re-entry.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
        
        {/* --- FOOTER INFO --- */}
        <footer className="mt-24 text-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em] flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary animate-pulse" />
            <span>Auth Architecture: <span className="text-primary italic">V5.1-STABLE</span></span>
          </div>
          <span className="hidden md:block opacity-20">|</span>
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-primary" />
            <span>Node Status: <span className="text-emerald-500 italic">SECURE</span></span>
          </div>
        </footer>
      </main>
    </div>
  );
}