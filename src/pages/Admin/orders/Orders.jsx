import { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, ListFilter, Download, 
  RotateCcw, Layers, Settings, Truck, User, X, 
  MoreVertical, Filter, Calendar, Activity, Shield, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../lib/api';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Stats for the top cards
  const outlines = [
    { label: 'Awaiting', count: 0, icon: RotateCcw, color: 'text-primary' },
    { label: 'Received', count: 0, icon: Layers, color: 'text-primary' },
    { label: 'Processed', count: 0, icon: Settings, color: 'text-primary' },
    { label: 'Shipped', count: 0, icon: Truck, color: 'text-primary' },
    { label: 'Delivered', count: 0, icon: User, color: 'text-primary' },
    { label: 'Cancelled', count: 0, icon: X, color: 'text-primary' },
    { label: 'Returned', count: 0, icon: RotateCcw, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Layers size={16} className="text-primary animate-pulse" />
            <span>Operational Ledger v5.1</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Commerce Vault</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <Truck size={18} className="animate-bounce" /> Logistics Sync Active
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Orders</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-16">
        
        {/* Metric Matrix */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all group p-12">
          <div className="flex items-center justify-between mb-12 px-4">
             <div>
                <h3 className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Lifecycle Metrics</h3>
                <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-1">Real-time Node Scan</p>
             </div>
             <Shield size={24} className="text-slate-100 dark:text-slate-800" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-8">
            {outlines.map((item) => (
              <div key={item.label} className="group/card bg-background-site/50 dark:bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-50 dark:border-slate-800/50 hover:border-primary/20 hover:bg-surface transition-all cursor-crosshair shadow-sm hover:shadow-2xl">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="p-4 bg-surface dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 group-hover/card:scale-110 group-hover/card:bg-primary group-hover/card:text-white transition-all duration-500">
                    <item.icon size={22} className="group-hover/card:text-white transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{item.label}</p>
                    <p className="text-3xl font-black text-text-pri dark:text-white tabular-nums tracking-tighter">{item.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Control Node */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <FilterInput label="Temporal Range" placeholder="Select Period..." icon={Calendar} />
            <FilterSelect label="Operational State" options={['All Protocol', 'Pending Queue', 'Verified Success', 'Logistics Out']} />
            <FilterSelect label="Logistics Unit" options={['All Command Units']} />
            <FilterSelect label="Settle Protocol" options={['All Modes', 'Digital Transfer', 'COD Verification']} />
            <FilterSelect label="Registry Domain" options={['All Domains']} />
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center mt-12 pt-10 border-t border-slate-100 dark:border-slate-800 gap-8">
            <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">
               <Activity size={18} /> Protocol Integrity Active
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-10 py-5 bg-background-site dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                  Reset Matrix
                </button>
                <button className="flex-1 sm:flex-none bg-primary hover:bg-black text-white px-16 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-4">
                  Deploy Filter
                </button>
            </div>
          </div>
        </section>

        {/* Data Architecture */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all flex flex-col group">
          {/* Internal Tab Protocol */}
          <div className="flex bg-background-site/50 dark:bg-slate-950/50 p-10 gap-8 border-b border-slate-100 dark:border-slate-800">
            {['Orders', 'Order Items'].map((tab) => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-12 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group/tab ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-2xl shadow-primary/20' 
                    : 'text-slate-400 dark:text-slate-500 hover:text-primary transition-all'
                }`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-white opacity-20" />}
              </button>
            ))}
          </div>

          {/* Action Hub */}
          <div className="p-12 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
            <div className="relative group/search flex-1 max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
              <input 
                type="text" 
                placeholder="Query Registry Master Ledger..." 
                className="w-full pl-16 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
              />
            </div>
            <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner shrink-0">
                <button className="p-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all active:scale-90" title="Sync Ledger">
                  <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
                </button>
                <button className="p-5 text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 rounded-[1.5rem] transition-all active:scale-90" title="Refine Protocol">
                   <ListFilter size={24} />
                </button>
                <button className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-black text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                  <Download size={20} /> Export Ledger
                </button>
            </div>
          </div>

          {/* Table Matrix */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  {[
                    'Order ID', 'Subject', 'Interface', 'Notation', 'Amount', 
                    'Logistics', 'Wallet', 'Settlement', 'Protocol', 'Timestamp', 'Control'
                  ].map((h) => (
                    <th key={h} className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
                      {h} <span className="ml-2 opacity-20">⇅</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                <tr>
                  <td colSpan="11" className="px-10 py-60 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
                       <Shield size={400} />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                       <RotateCcw size={80} className="text-slate-100 dark:text-slate-800 mb-8 animate-pulse" />
                       <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">Void Identified</p>
                       <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-4">Zero Operational Artifacts in Current Buffer</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <footer className="p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em]">
             <span className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                SYSTEM LEDGER SYNC Active 
             </span>
             <span>Cluster Partition: ORD-v5.x</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

// Global Filter UI Components
function FilterInput({ label, placeholder, icon: Icon }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">{label}</label>
      <div className="relative group/filter-box">
        {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/filter-box:text-primary transition-all" size={20} />}
        <input 
          type="text" 
          placeholder={placeholder} 
          className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] pl-16 pr-6 py-5 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
        />
      </div>
    </div>
  );
}

function FilterSelect({ label, options }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">{label}</label>
      <div className="relative group/filter-select">
        <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500">
           <ChevronRight size={18} className="rotate-90" />
        </div>
      </div>
    </div>
  );
}