import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  List, 
  Download, 
  ChevronDown, 
  MoreVertical,
  Layers,
  Activity,
  Shield,
  Bell,
  ChevronRight,
  Database,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemNotification() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRead, setFilterRead] = useState("All Messages");

  // Sample data - replace with your actual API integration
  const [notifications, setNotifications] = useState([]);

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
            <Bell size={16} className="text-primary animate-pulse" />
            <span>Messaging Nexus v2.4</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Broadcast Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <Activity size={18} /> Node Status: Operational
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Messaging</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Main Content Hub */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 min-h-[600px] transition-all relative group overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Top Selection Protocol */}
          <div className="relative z-10 mb-12 space-y-4">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Status Protocol Select</label>
            <div className="relative group/filter-select max-w-sm">
              <select 
                className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner"
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value)}
              >
                <option value="All Messages">Comprehensive Broadcast Stream</option>
                <option value="Read">Processed System Payloads</option>
                <option value="Unread">Pending Critical Alerts</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500">
                 <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Action Interface Hub */}
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10 mb-12">
            <div className="relative group/search flex-1 max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
              <input 
                type="text" 
                placeholder="Query Broadcast Master Sequence..." 
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
                
                <button className="px-8 py-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all flex items-center gap-3">
                   <List size={22} />
                   <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Advanced Logic</span>
                   <ChevronDown size={14} className="opacity-30" />
                </button>
                
                <button className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-black text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                  <Download size={20} /> Export Logs
                </button>
            </div>
          </div>

          {/* Table Architectural View */}
          <div className="relative z-10 overflow-x-auto rounded-[3rem] border-2 border-slate-50 dark:border-slate-800/10 shadow-sm bg-background-site/30 dark:bg-slate-950/30">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  {[
                    'Trace ID', 'Subject Header', 'Payload Content', 'Vector Class', 
                    'Identity Ref', 'Operator Log', 'Control'
                  ].map((h, i) => (
                    <th key={h} className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] border-r border-slate-100/30 dark:border-slate-800/20 last:border-r-0">
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
                  {notifications.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-10 py-60 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
                           <Mail size={400} />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                           <Bell size={80} className="text-slate-100 dark:text-slate-800 mb-8 animate-pulse" />
                           <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">Zero Payload</p>
                           <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-4">Broadcast frequency clear: NO-ACTIVE-TRANSMISSIONS</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    notifications.map((notif, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: idx * 0.03 }}
                        key={notif.id} 
                        className="group hover:bg-background-site/50 dark:hover:bg-slate-800/50 transition-all duration-500"
                      >
                        <td className="px-10 py-8 text-primary dark:text-primary-light font-black tracking-tighter text-sm">
                           <div className="flex items-center gap-3">
                              <span className="opacity-30">#</span>{String(notif.id).padStart(4, '0')}
                           </div>
                        </td>
                        <td className="px-10 py-8 text-text-pri dark:text-white font-black tracking-tight uppercase leading-none">{notif.title}</td>
                        <td className="px-10 py-8">
                          <div className="text-slate-400 dark:text-slate-500 max-w-xs truncate font-bold text-[11px] uppercase tracking-tight">
                            {notif.message}
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="inline-flex items-center gap-3 px-5 py-2 bg-primary/5 text-primary dark:text-primary-light border border-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                            <Layers size={14} /> {notif.type}
                          </span>
                        </td>
                        <td className="px-10 py-8 font-mono font-black text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{notif.typeId}</td>
                        <td className="px-10 py-8 text-slate-400 dark:text-slate-600 font-black text-[9px] uppercase tracking-widest leading-none">{notif.readBy}</td>
                        <td className="px-10 py-8 text-center">
                          <button className="w-12 h-12 inline-flex items-center justify-center text-slate-200 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group-hover:shadow-lg active:scale-95">
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
          
          <footer className="relative z-10 p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em] mt-12 rounded-[2rem]">
             <span className="flex items-center gap-3 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                NETWORK BROADCAST MATRIX ACTIVE
             </span>
             <div className="flex items-center gap-4">
                <Database size={16} /> ENTRIES: {notifications.length}
             </div>
          </footer>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
          The broadcast forge centralizes all <span className="text-primary italic">cross-domain</span> signalling. <br/>Registry logs are immutable and cryptographically verified.
        </p>
      </footer>
    </div>
  );
}