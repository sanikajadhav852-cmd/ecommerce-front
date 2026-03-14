import React from 'react';
import { Download, Upload, RotateCcw, FileText, CheckCircle, Activity, Shield, ChevronDown, ChevronRight, Database, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BulkUpload() {
  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Upload size={16} className="text-primary animate-bounce" />
            <span>Batch Processor v2.9</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Ingestion Hub</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Ingestion Channel: READY
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Batch Upload</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Protocol Banner */}
        <section className="bg-primary/5 dark:bg-primary-light/5 rounded-[4rem] border border-primary/10 dark:border-primary-light/10 p-12 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-[0.08] transition-opacity duration-1000">
            <FileText size={200} className="text-primary rotate-12" />
          </div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-xs font-black text-primary dark:text-primary-light uppercase tracking-[0.4em] flex items-center gap-4">
              <Shield size={20} />
              Operation Protocol Invariant
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <InstructionItem text="Strict adherence to CSV manifest geometry" />
              <InstructionItem text="Baseline matrix files minimize ingestion variance" />
              <InstructionItem text="Mandatory UTF-8 encoding for payload integrity" />
              <InstructionItem text="Cross-verify media identifiers in central hub" />
              <InstructionItem text="Execute logic validation before mass-sync" />
            </ul>
          </div>
        </section>

        {/* Upload Interface Matrix */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 space-y-12 transition-all relative group overflow-hidden">
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Operation Selector */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                Operation Vector <span className="text-primary">*</span>
              </label>
              <div className="relative group/filter-select">
                <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] px-8 py-6 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
                  <option>Identify Vector</option>
                  <option value="upload">NEW_INGESTION [Universal]</option>
                  <option value="update">DELTA_SYNC [Update Existing]</option>
                </select>
                <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Ingestion Stream */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                Data Stream Payload <span className="text-primary">*</span>
              </label>
              <div className="flex items-stretch gap-0 h-[72px] shadow-2xl rounded-[2.5rem] overflow-hidden group/payload">
                <label className="cursor-pointer bg-slate-900 dark:bg-black px-10 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary transition-all active:scale-95 z-10 group/label relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/label:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center gap-3"><Database size={16} /> SCAN_DISK</span>
                  <input type="file" className="hidden" accept=".csv" />
                </label>
                <div className="flex-1 bg-background-site dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 border-l-0 px-8 flex items-center text-sm font-black text-slate-300 dark:text-slate-700 shadow-inner italic tracking-tight">
                  Awaiting_CSV_Buffer_Sync...
                </div>
              </div>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex flex-col sm:flex-row gap-6 pt-10 relative z-10">
            <button className="group flex-1 bg-background-site dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-red-500 py-6 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-sm border border-transparent hover:border-red-500/10 flex items-center justify-center gap-4">
              <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-700" />
              PURGE_LOCAL_BUFFER
            </button>
            <button className="group flex-[2] bg-primary hover:bg-black text-white py-6 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all active:scale-95 shadow-2xl shadow-primary/30 flex items-center justify-center gap-6 relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
               <Upload size={22} className="relative z-10" />
               <span className="relative z-10 uppercase tracking-[0.3em]">EXECUTE_SYSTEM_INGESTION</span>
            </button>
          </div>

          {/* Resource Repository */}
          <div className="pt-16 border-t border-slate-100 dark:border-slate-800 space-y-8 relative z-10">
            <h4 className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em] flex items-center gap-4">
               <Layers size={16} /> Architectural Baseline & Vectors
            </h4>
            <div className="flex flex-wrap gap-6 items-center">
              <ResourceButton label="INGESTION_BASELINE" color="bg-primary" />
              <ResourceButton label="INGESTION_MANUAL" color="bg-slate-900 dark:bg-black" />
              <div className="w-px h-12 bg-slate-100 dark:bg-slate-800 hidden lg:block" />
              <ResourceButton label="DELTA_BASELINE" color="bg-primary" />
              <ResourceButton label="DELTA_MANUAL" color="bg-slate-900 dark:bg-black" />
              <div className="w-px h-12 bg-slate-100 dark:bg-slate-800 hidden lg:block" />
              <ResourceButton label="SYNC_CORE_ARTIFACTS" color="bg-emerald-600" />
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           The batch processor optimizes <span className="text-primary italic">high-velocity</span> data ingestion. <br/>Manifest integrity is verified through universal schema parity protocols.
        </p>
      </footer>
    </div>
  );
}

/* Helper Components */

function InstructionItem({ text }) {
  return (
    <li className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-tight group/item">
      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/20 shrink-0 group-hover/item:scale-125 transition-transform" />
      {text}
    </li>
  );
}

function ResourceButton({ label, color }) {
  return (
    <button className={`${color} text-white px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest flex items-center gap-4 shadow-xl hover:scale-105 transition-all active:scale-95 group/res`}>
      <span className="relative z-10">{label}</span>
      <Download size={18} className="opacity-50 group-hover/res:opacity-100 transition-opacity" />
    </button>
  );
}