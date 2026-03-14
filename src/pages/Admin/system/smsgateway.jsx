import React, { useState } from 'react';
import { 
  Globe, Send, Key, Lock, Plus, Trash2, 
  RotateCcw, Save, Info, ChevronRight,
  Settings2, Database, Code, Zap, Hash, Activity, Shield, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SMSGatewaySettings() {
  const [activeTab, setActiveTab] = useState('header');
  const [headers, setHeaders] = useState([{ id: Date.now(), key: '', value: '' }]);
  const [method, setMethod] = useState('POST');

  const addHeaderRow = () => {
    setHeaders([...headers, { id: Date.now(), key: '', value: '' }]);
  };

  const removeHeaderRow = (id) => {
    if (headers.length > 1) {
      setHeaders(headers.filter(row => row.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    const updatedHeaders = headers.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    );
    setHeaders(updatedHeaders);
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Zap size={16} className="text-primary animate-pulse" />
            <span>Infrastructure Gateway v5.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Protocol Matrix</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Buffer Status: INITIALIZING
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Gateway <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">DISPATCH</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        
        {/* --- Reference Alert Protocol --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-primary/5 dark:bg-primary/10 rounded-[3rem] border border-primary/10 dark:border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-surface dark:bg-slate-900 rounded-[2rem] flex items-center justify-center text-primary shadow-2xl border border-primary/10 group-hover:rotate-12 transition-transform duration-700">
              <Info size={32} />
            </div>
            <div className="space-y-1">
                <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Gateway Reference Node</p>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-relaxed italic">
                    Infrastructure mapping detected. Ensure synchronous terminal handshake.
                </p>
            </div>
          </div>
          <a href="#" className="flex-1 md:flex-none px-10 py-5 bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-[2rem] shadow-2xl shadow-primary/30 hover:bg-black hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4">
            DOCUMENTATION <ChevronRight size={18} />
          </a>
        </motion.div>

        <div className="space-y-12">
          
          {/* --- 1. Connection Matrix --- */}
          <section className="bg-surface dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-5">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                <Globe size={24} />
              </div>
              Connection Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Universal Base URL</label>
                <div className="relative group/input">
                    <input 
                    type="text" 
                    placeholder="https://core.dispatch-nexus.api/v5/handshake"
                    className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner"
                    />
                </div>
              </div>
              <div className="space-y-5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Protocol Method</label>
                <div className="relative group/select">
                    <select 
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none appearance-none cursor-pointer shadow-inner"
                    >
                    <option>POST</option>
                    <option>GET</option>
                    <option>PUT</option>
                    </select>
                    <ChevronRight size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* --- 2. Authorization Credentials --- */}
          <section className="bg-surface dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 relative z-10">
              <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em] flex items-center gap-5">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl shadow-inner">
                    <Lock size={24} />
                </div>
                Auth Cryptography
              </h3>
              <button className="px-10 py-4 bg-emerald-500 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] shadow-2xl shadow-emerald-500/30 hover:bg-black hover:-translate-y-1 transition-all active:scale-95 group/btn relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                <span className="relative z-10">GENERATE_SECURE_TOKEN</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Account Identifier (SID)</label>
                <div className="relative group/input">
                  <Hash className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" size={20} />
                  <input 
                    type="text" 
                    className="w-full pl-20 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner uppercase font-mono tracking-tighter"
                    placeholder="SID-NODE-000-000"
                  />
                </div>
              </div>
              <div className="space-y-5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Secret Key (Auth Token)</label>
                <div className="relative group/input">
                  <Key className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" size={20} />
                  <input 
                    type="password" 
                    className="w-full pl-20 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner font-mono tracking-tighter"
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- 3. Payload Construction --- */}
          <section className="bg-surface dark:bg-slate-900 rounded-[4.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
            <div className="flex bg-background-site/50 dark:bg-slate-950/50 border-b border-primary/5 p-4 gap-4">
              {['header', 'body', 'params'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] rounded-[2.5rem] transition-all duration-500 relative overflow-hidden ${
                    activeTab === tab 
                    ? 'bg-surface dark:bg-slate-900 text-primary shadow-2xl border border-primary/10' 
                    : 'text-slate-400 dark:text-slate-600 hover:text-text-pri dark:hover:text-white hover:bg-background-site dark:hover:bg-slate-950'
                  }`}
                >
                  <span className="relative z-10">{tab} Structural Grid</span>
                  {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
                </button>
              ))}
            </div>

            <div className="p-12 md:p-20">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-base font-black text-text-pri dark:text-white uppercase tracking-tighter flex items-center gap-6">
                  <Terminal size={24} className="text-primary" />
                  Define Interface Data
                </h3>
                <button 
                  onClick={addHeaderRow}
                  className="w-16 h-16 bg-primary text-white rounded-[2rem] flex items-center justify-center hover:bg-black hover:-translate-y-2 transition-all shadow-2xl shadow-primary/30 active:scale-90"
                >
                  <Plus size={32} />
                </button>
              </div>

              <div className="space-y-8">
                <AnimatePresence mode="popLayout">
                  {headers.map((row) => (
                    <motion.div 
                      key={row.id} 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="grid grid-cols-1 sm:grid-cols-12 items-end gap-8 bg-background-site/30 dark:bg-slate-950/30 p-10 rounded-[3.5rem] border border-primary/5 group/row hover:border-primary/20 transition-all duration-500"
                    >
                      <div className="sm:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ml-2">Mnemonic Key</label>
                            <input 
                            type="text"
                            placeholder="e.g. Content-Type"
                            value={row.key}
                            onChange={(e) => handleInputChange(row.id, 'key', e.target.value)}
                            className="w-full px-8 py-5 bg-surface dark:bg-slate-900 border-2 border-transparent focus:border-primary/10 rounded-[1.5rem] text-sm font-black transition-all outline-none shadow-inner"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ml-2">Protocol Value</label>
                            <input 
                            type="text"
                            placeholder="e.g. application/json"
                            value={row.value}
                            onChange={(e) => handleInputChange(row.id, 'value', e.target.value)}
                            className="w-full px-8 py-5 bg-surface dark:bg-slate-900 border-2 border-transparent focus:border-primary/10 rounded-[1.5rem] text-sm font-black transition-all outline-none shadow-inner"
                            />
                        </div>
                      </div>
                      <div className="sm:col-span-1 flex justify-center pb-2">
                        <button 
                          onClick={() => removeHeaderRow(row.id)}
                          className="w-14 h-14 bg-background-site dark:bg-slate-950 text-slate-300 dark:text-slate-800 hover:text-white hover:bg-red-500 rounded-2xl transition-all active:scale-95 flex items-center justify-center shadow-inner"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Variable Injection Grid */}
              <div className="mt-16 p-10 bg-background-site dark:bg-slate-950 rounded-[3.5rem] border border-primary/10 shadow-3xl relative overflow-hidden group/matrix">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/matrix:opacity-100 group-hover/matrix:rotate-12 transition-all duration-1000">
                   <Code size={100} className="text-primary" />
                </div>
                <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                    <Database size={18} />
                    Variable Injection Matrix
                </h4>
                <div className="flex flex-wrap gap-6 font-mono text-[10px] relative z-10">
                  {['TARGET_MOBILE', 'AUTH_TOKEN_VECTOR', 'CLUSTER_CC', 'MSG_JSON_STRING'].map((tag) => (
                    <span key={tag} className="px-6 py-3 bg-primary/5 text-primary border border-primary/10 rounded-[1.2rem] hover:bg-primary hover:text-white transition-all duration-500 cursor-default uppercase tracking-widest font-black">
                      {`{${tag}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- Action Deployer --- */}
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-12 border-t border-primary/10">
            <button className="group/submit w-full sm:w-auto flex-1 flex items-center justify-center gap-6 px-16 py-8 bg-primary text-white rounded-[3rem] font-black text-[12px] uppercase tracking-[0.6em] shadow-3xl shadow-primary/40 hover:bg-black hover:-translate-y-3 transition-all active:scale-95 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/submit:translate-x-0 transition-transform duration-700" />
              <Save size={28} className="relative z-10" />
              <span className="relative z-10">SYNCHRONIZE_GATEWAY_PROTOCOL</span>
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-6 px-12 py-8 bg-background-site dark:bg-slate-800 text-slate-400 dark:text-slate-600 hover:text-red-500 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 dark:border-slate-700/50 hover:border-red-500/20 transition-all active:scale-95 shadow-sm">
              <RotateCcw size={26} />
              Reset
            </button>
          </div>
        </div>
      </main>

      {/* --- FOOTER ARCHITECTURE --- */}
      <footer className="max-w-5xl mx-auto mt-32 text-center border-t border-slate-100 dark:border-slate-800/10 pt-16 flex flex-col items-center gap-8">
        <div className="flex items-center gap-8 opacity-20 filter grayscale hover:grayscale-0 transition-all duration-1000">
            <Shield size={28} className="text-primary" />
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Activity size={28} className="text-primary animate-pulse" />
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.8em] flex items-center gap-6">
          <Terminal size={18} />
          SMS-INTERFACE-LAYER-ALPHA-V.5.2
        </p>
      </footer>
    </div>
  );
}