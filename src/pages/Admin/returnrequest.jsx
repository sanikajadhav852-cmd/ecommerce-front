import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  CheckCircle, XCircle, Clock, AlertCircle, Eye, Loader2,
  RefreshCcw, Package, AlertTriangle, ChevronRight, Activity, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReturnRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    orderId: true,
    username: true,
    productName: true,
    price: true,
    quantity: true,
    subTotal: true,
    status: true,
    actions: true
  });

  useEffect(() => {
    // Simulated fetch - in a real app this would call api.get('/admin/return-requests')
    setTimeout(() => {
      setRequests([
        { id: 'RTN-1001', orderId: 'ORD-1001', username: 'John Doe', productName: 'Cotton Saree - Red', price: 1250.00, quantity: 1, subTotal: 1250.00, status: 'Pending' },
        { id: 'RTN-1002', orderId: 'ORD-1024', username: 'Jane Smith', productName: 'Silk Kurta - Blue', price: 890.00, quantity: 2, subTotal: 1780.00, status: 'Approved' },
        { id: 'RTN-1003', orderId: 'ORD-1045', username: 'Ravi Kumar', productName: 'Mens Formal Shirt', price: 1050.00, quantity: 1, subTotal: 1050.00, status: 'Processed' },
        { id: 'RTN-1004', orderId: 'ORD-1056', username: 'Priya Sharma', productName: 'Designer Lehenga', price: 4500.00, quantity: 1, subTotal: 4500.00, status: 'Rejected' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesSearch = 
      searchTerm === '' ||
      req.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.3em]">
            <RefreshCcw size={16} className="animate-pulse" />
            <span>Operational Reversal Protocol</span>
          </div>
          <h1 className="text-4xl font-black text-text-pri dark:text-white tracking-tight">Return Management</h1>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-600 bg-surface dark:bg-slate-900 px-6 py-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
          <span>Home</span> <ChevronRight size={14} className="text-slate-300 dark:text-slate-800" /> <span className="text-primary dark:text-primary-light tracking-widest">RETURNS</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* --- CONTROL NODE --- */}
        <section className="bg-surface dark:bg-slate-900 rounded-[3.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-10 relative overflow-hidden group transition-all">
          <div className="absolute top-0 left-0 -ml-24 -mt-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 flex flex-col xl:flex-row gap-10 items-start xl:items-center justify-between">
            
            <div className="flex flex-col sm:flex-row gap-8 w-full xl:w-auto">
              {/* Status Protocol */}
              <div className="w-full sm:w-64 space-y-3">
                  <label className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">
                    <Activity size={14} className="text-primary" /> Status Logic
                  </label>
                  <div className="relative group/select">
                      <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-2xl p-5 text-sm font-black text-text-pri dark:text-white appearance-none cursor-pointer transition-all shadow-inner"
                      >
                          <option value="All">All Transactions</option>
                          <option value="Pending">Queue: Pending</option>
                          <option value="Approved">Verified: Success</option>
                          <option value="Rejected">Flagged: Rejected</option>
                          <option value="Processed">Complete: Processed</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/select:text-primary transition-colors pointer-events-none" />
                  </div>
              </div>

              {/* Identity Scanner */}
              <div className="w-full sm:w-[400px] space-y-3">
                  <label className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">
                    <Search size={14} className="text-primary" /> Request Lookup
                  </label>
                  <div className="relative group">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={22} />
                      <input
                          type="text"
                          placeholder="Order ID, User or Node..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-16 pr-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-2xl text-[1rem] font-bold text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                      />
                  </div>
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center bg-background-site dark:bg-slate-950 p-2.5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner mt-4 xl:mt-0">
              <button className="p-4 text-slate-400 hover:text-primary dark:hover:text-primary-light rounded-2xl hover:bg-surface dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Sync Registry"><RotateCw size={22} /></button>
              <button className="flex items-center gap-4 px-10 py-4 bg-slate-900 dark:bg-black text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                <Download size={18} /> Export List
              </button>
              
              <div className="relative group/more">
                <button className="p-4 text-slate-400 hover:text-primary dark:hover:text-primary-light rounded-2xl transition-all active:scale-90"><MoreVertical size={22} /></button>
                <div className="absolute right-0 mt-6 w-80 bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl hidden group-hover/more:block z-50 overflow-hidden ring-8 ring-black/5 p-8 animate-in zoom-in-95 duration-200">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6">Metadata Logic</p>
                  <div className="space-y-3">
                    {Object.keys(visibleColumns).map(col => (
                      <label key={col} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-background-site dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                        <div className="relative flex items-center justify-center">
                           <input type="checkbox" checked={visibleColumns[col]} onChange={() => toggleColumn(col)} className="peer sr-only" />
                           <div className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-800 peer-checked:bg-primary peer-checked:border-primary transition-all" />
                           <Shield size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{col === 'orderId' ? 'ORD_LINK' : col}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- DATA MATRIX --- */}
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col relative transition-all">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-50 dark:border-slate-800/50">
                  {visibleColumns.id && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Module Hash</th>}
                  {visibleColumns.orderId && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Order Node</th>}
                  {visibleColumns.username && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Entity</th>}
                  {visibleColumns.productName && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Asset Visual</th>}
                  {visibleColumns.subTotal && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-right">Debit Quantum</th>}
                  {visibleColumns.status && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-center">State</th>}
                  {visibleColumns.actions && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-center">Ops</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-40 text-center">
                        <Loader2 className="animate-spin h-14 w-14 mx-auto text-primary mb-8 opacity-40" />
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Scanning Product Reversal Nodes...</p>
                      </td>
                    </tr>
                  ) : filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-40 text-center">
                        <div className="w-24 h-24 bg-background-site dark:bg-slate-950 rounded-full mx-auto mb-8 flex items-center justify-center text-slate-200 dark:text-slate-800 border-4 border-dashed border-slate-100 dark:border-slate-800">
                           <RefreshCcw size={40} />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Zero Request Artifacts Identified</p>
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={req.id} className="group hover:bg-background-site/30 dark:hover:bg-slate-950/30 transition-all duration-500">
                        {visibleColumns.id && (
                          <td className="px-10 py-10 font-black text-primary dark:text-primary-light text-sm tracking-tighter">
                             <div className="flex items-center gap-3">
                                <span className="opacity-30">#</span>{req.id}
                             </div>
                          </td>
                        )}
                        {visibleColumns.orderId && (
                          <td className="px-10 py-10 whitespace-nowrap text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                             {req.orderId}
                          </td>
                        )}
                        {visibleColumns.username && (
                          <td className="px-10 py-10 whitespace-nowrap text-sm text-text-pri dark:text-white font-black uppercase tracking-tight">
                            {req.username}
                          </td>
                        )}
                        {visibleColumns.productName && (
                          <td className="px-10 py-10">
                             <div className="text-sm font-black text-text-pri dark:text-white tracking-tight group-hover:text-primary transition-colors uppercase">{req.productName}</div>
                             <div className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">QTY: {req.quantity} Units</div>
                          </td>
                        )}
                        {visibleColumns.subTotal && (
                          <td className="px-10 py-10 text-right">
                             <div className="text-2xl font-black text-text-pri dark:text-white tracking-tighter">₹{req.subTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                             <div className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">Reversal Sum</div>
                          </td>
                        )}
                        {visibleColumns.status && (
                          <td className="px-10 py-10 text-center">
                            <span className={`inline-flex items-center px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm
                              ${(req.status === 'Approved' || req.status === 'Processed') ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10' :
                                req.status === 'Rejected' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10' :
                                 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10 animate-pulse'
                              }`}>
                              {req.status === 'Approved' && <CheckCircle className="w-4 h-4 mr-3" />}
                              {req.status === 'Rejected' && <XCircle className="w-4 h-4 mr-3" />}
                              {req.status === 'Pending' && <Clock className="w-4 h-4 mr-3" />}
                              {req.status || 'Pending'}
                            </span>
                          </td>
                        )}
                        {visibleColumns.actions && (
                          <td className="px-10 py-10">
                            <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                               <button className="flex items-center gap-3 px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                 <Eye size={14} /> Audit Trace
                               </button>
                            </div>
                          </td>
                        )}
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* --- MATRIX FOOTER --- */}
          <footer className="p-10 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-10 transition-all">
             <div className="flex items-center gap-5 text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.4em]">
                Registry Sync: <span className="text-primary dark:text-primary-light text-sm">{filteredRequests.length}</span> Objects Identified
             </div>
             <p className="text-[8px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.6em] hidden xl:block">SYSTEM-REVERSAL-INTEGRITY-v3.0</p>
          </footer>
        </section>
      </main>
    </div>
  );
}