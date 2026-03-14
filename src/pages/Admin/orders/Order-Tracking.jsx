import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  List, 
  Download, 
  ChevronDown, 
  MoreVertical, 
  ExternalLink,
  Truck,
  Activity,
  Shield,
  ChevronRight,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderTracking() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - replace with your API call
  const [trackingData, setTrackingData] = useState([]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Truck size={16} className="text-primary animate-pulse" />
            <span>Logistics Vector v3.0</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Telemetry Hub</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Telemetry Signal: Nominal
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">TRACKING</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Main Matrix Card */}
        <div className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all flex flex-col group relative">
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Action Hub */}
          <div className="p-12 flex flex-col xl:flex-row xl:items-center justify-between gap-10 border-b border-slate-50 dark:border-slate-800/50 bg-background-site/20 dark:bg-slate-950/20 relative z-10">
            <div className="relative group/search flex-1 max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
              <input 
                type="text" 
                placeholder="Query Registry Sequence..." 
                className="w-full pl-16 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner shrink-0">
                <button 
                  onClick={handleRefresh}
                  className="p-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all active:scale-90" 
                  title="Sync Matrix"
                >
                  <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
                </button>
                
                <div className="relative group/filter">
                  <button className="flex items-center gap-4 px-6 py-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all">
                    <List size={22} />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Filter Protocol</span>
                    <ChevronDown size={14} className="opacity-50 group-hover/filter:rotate-180 transition-transform" />
                  </button>
                </div>
                
                <button className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-black text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                  <Download size={20} /> Export Vector
                </button>
            </div>
          </div>

          {/* Table Architecture */}
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  {[
                    'Core Index', 'Nexus Reference', 'Logistics Provider', 
                    'Tracking Sequence', 'Redirect URL', 'Timestamp', 'Control'
                  ].map((h, i) => (
                    <th key={h} className={`px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ${i === 6 ? 'text-center' : ''}`}>
                      <div className="flex items-center justify-between gap-4">
                        {h}
                        {i < 6 && <ChevronDown size={14} className="opacity-20" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                <AnimatePresence mode="popLayout">
                  {trackingData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-10 py-60 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
                           <Database size={400} />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                           <Activity size={80} className="text-slate-100 dark:text-slate-800 mb-8 animate-pulse" />
                           <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">Zero Signal Detected</p>
                           <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-4">Sector empty: NO-PAYLOADS-IDENTIFIED</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    trackingData.map((row) => (
                      <motion.tr 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        key={row.id} 
                        className="group hover:bg-background-site/30 dark:hover:bg-slate-800/30 transition-all duration-500"
                      >
                        <td className="px-10 py-8 text-primary dark:text-primary-light font-black tracking-tighter text-sm">
                           <div className="flex items-center gap-3">
                              <span className="opacity-30">#</span>{String(row.id).padStart(4, '0')}
                           </div>
                        </td>
                        <td className="px-10 py-8 text-text-pri dark:text-white font-black uppercase tracking-tight">{row.orderId}</td>
                        <td className="px-10 py-8">
                          <span className="px-5 py-2 bg-background-site dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-full text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                            {row.agency}
                          </span>
                        </td>
                        <td className="px-10 py-8 font-mono font-black text-xs text-slate-500 dark:text-slate-400 tracking-tighter">{row.trackingId}</td>
                        <td className="px-10 py-8">
                          <a 
                            href={row.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/5 text-primary dark:text-primary-light border border-primary/10 rounded-[1.25rem] hover:bg-primary hover:text-white transition-all duration-500 text-[9px] font-black uppercase tracking-widest shadow-sm"
                          >
                            Execute Link <ExternalLink size={14} />
                          </a>
                        </td>
                        <td className="px-10 py-8 text-slate-400 dark:text-slate-600 font-black text-[10px] uppercase tracking-tighter">{row.date}</td>
                        <td className="px-10 py-8 text-center">
                          <button className="w-12 h-12 inline-flex items-center justify-center text-slate-200 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group-hover:shadow-lg">
                            <MoreVertical size={20} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <footer className="p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em]">
             <span className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                TELEMETRY INTEGRITY NOMINAL
             </span>
             <div className="flex items-center gap-2">
                <Activity size={14} /> SYS-LOGISTICS-v3.2
             </div>
          </footer>
        </div>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
          Logistics vector data is computed in <span className="text-primary italic">real-time</span> across all fulfillment endpoints. <br/>Registry latency is minimized for ultimate operational precision.
        </p>
      </footer>
    </div>
  );
}