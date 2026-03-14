import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  Calendar, Grid, List, Loader2, TrendingUp, ShoppingCart, 
  DollarSign, RefreshCcw, Eye, Activity, Shield, ChevronRight, BarChart3, Receipt
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SalesReport() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [dateRange, setDateRange] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    orderId: true,
    userName: true,
    mobile: true,
    address: true,
    finalTotal: true,
    status: true,
    orderDate: true,
    operate: true
  });

  // Simulate data loading (replace with real API)
  useEffect(() => {
    setTimeout(() => {
      setInvoices([
        { orderId: 'ORD-1001', userName: 'John Doe', mobile: '+91 9876543210', address: '123 Main St, Mumbai', finalTotal: 1250.00, status: 'Delivered', orderDate: '2023-10-25' },
        { orderId: 'ORD-1002', userName: 'Jane Smith', mobile: '+91 9988776655', address: '456 Park Ave, Delhi', finalTotal: 4500.50, status: 'Pending', orderDate: '2023-10-26' },
        { orderId: 'ORD-1003', userName: 'Ravi Kumar', mobile: '+91 8877665544', address: '789 Lake View, Bangalore', finalTotal: 850.00, status: 'Cancelled', orderDate: '2023-10-26' },
        { orderId: 'ORD-1004', userName: 'Priya Sharma', mobile: '+91 7766554433', address: '101 Pine St, Pune', finalTotal: 2100.00, status: 'Shipped', orderDate: '2023-10-27' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      searchTerm === '' ||
      inv.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.mobile?.includes(searchTerm);

    const matchesStatus = statusFilter === 'All Orders' || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const handleSearch = () => {
    // In real app: fetch with filters
    console.log('Searching with:', { searchTerm, statusFilter, dateRange });
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <TrendingUp size={16} className="text-primary animate-bounce" />
            <span>Revenue Analytics v6.5</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Sales Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Financial Stream: OPTIMAL
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Sales Report</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* Dimensional Filter Section */}
        <section className="bg-surface dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h3 className="text-xs font-black text-text-pri dark:text-white uppercase tracking-[0.3em] mb-10 pb-6 border-b border-primary/10 flex items-center gap-4 relative z-10">
            <BarChart3 size={20} className="text-primary" /> Temporal & Status Vectors
          </h3>

          <div className="flex flex-col xl:flex-row items-end gap-10 relative z-10">
            <div className="w-full xl:w-1/3 space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Temporal Window</label>
              <div className="relative group/filter">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/filter:text-primary transition-all" size={20} />
                <input
                  type="text"
                  placeholder="Select Date Range"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                />
              </div>
            </div>

            <div className="w-full xl:w-1/3 space-y-4">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Order Status Vector</label>
              <div className="relative group/filter">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-8 pr-16 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner"
                >
                  <option>All Orders</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                  <option>Returned</option>
                </select>
                <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-primary transition-all duration-500 pointer-events-none" size={20} />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="group w-full xl:w-auto px-12 py-5 bg-primary hover:bg-black text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              <Search size={18} className="relative z-10" /> <span className="relative z-10">EXECUTE_REVENUE_QUERY</span>
            </button>
          </div>
        </section>

        {/* Sales Matrix Architecture */}
        <section className="bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group overflow-hidden flex flex-col min-h-[700px]">
          <div className="px-12 py-10 border-b border-slate-50 dark:border-slate-800/50 bg-background-site/20 dark:bg-slate-950/20 flex flex-col xl:flex-row justify-between items-center gap-8">
            <div className="relative group/search w-full xl:w-[500px]">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
              <input
                type="text"
                placeholder="Query Identity Matrix..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-20 pr-10 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto">
              <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 p-2 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                {[RotateCw, Grid, List].map((Icon, i) => (
                    <button key={i} className={`p-5 rounded-[2rem] transition-all flex items-center justify-center ${
                    i === 2 ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:text-primary hover:bg-surface dark:hover:bg-slate-900 border border-transparent'
                    }`}>
                    <Icon size={22} />
                    </button>
                ))}
              </div>

              <button className="flex items-center gap-4 px-10 py-5 bg-background-site dark:bg-slate-950 text-slate-400 hover:text-primary rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all shadow-sm">
                <Download size={20} /> SYNC_EXPORT_CSV
              </button>
              
              <div className="relative group/more">
                <button className="p-6 bg-background-site dark:bg-slate-950 text-slate-400 hover:text-primary rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all shadow-sm">
                  <MoreVertical size={24} />
                </button>
                <div className="absolute right-0 mt-6 w-80 bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl hidden group-hover/more:block z-50 overflow-hidden transform origin-top-right transition-all backdrop-blur-3xl bg-opacity-95">
                  <div className="p-10 space-y-8">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] pb-4 border-b border-primary/10">Matrix Visibility Hub</p>
                    <div className="space-y-4">
                      {Object.keys(visibleColumns).map(col => (
                        <label key={col} className="flex items-center justify-between p-4 rounded-2xl hover:bg-background-site dark:hover:bg-slate-800/50 transition-all cursor-pointer group/item">
                          <span className="text-[10px] font-black text-text-pri/70 dark:text-white/70 uppercase tracking-widest group-hover/item:text-primary">{col.replace(/([A-Z])/g, ' $1')}</span>
                          <input
                            type="checkbox"
                            checked={visibleColumns[col]}
                            onChange={() => toggleColumn(col)}
                            className="w-5 h-5 rounded-lg border-2 border-slate-100 dark:border-slate-800 text-primary focus:ring-primary transition-all cursor-pointer"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 flex-1 relative z-10">
            <div className="overflow-x-auto rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800/10 shadow-sm bg-background-site/30 dark:bg-slate-950/20 h-full">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
                  <tr>
                    {Object.keys(visibleColumns).map(col => visibleColumns[col] && (
                      <th key={col} className={`px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] border-r border-slate-100/30 dark:border-slate-800/20 last:border-0 ${col.includes('Total') || col === 'status' ? 'text-center' : ''}`}>
                        {col.replace(/([A-Z])/g, ' $1')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="px-10 py-60 text-center relative overflow-hidden">
                           <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
                             <Receipt size={400} />
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-8">
                            <Loader2 className="animate-spin h-24 w-24 text-primary opacity-20" />
                            <div className="space-y-4">
                              <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">REVENUE_SCAN</p>
                              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] animate-pulse">Awaiting Financial Matrix Synchronization...</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-10 py-60 text-center relative overflow-hidden">
                           <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="w-24 h-24 bg-background-site dark:bg-slate-950 rounded-[2.5rem] flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner">
                              <Search size={48} className="text-slate-100 dark:text-slate-800" />
                            </div>
                           <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">NULL_REVENUE</p>
                           <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Query Logic identified zero matching invoices</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((inv, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={inv.orderId} 
                          className="group hover:bg-background-site/50 dark:hover:bg-slate-800/50 transition-all duration-500"
                        >
                          {visibleColumns.orderId && (
                            <td className="px-10 py-8 text-[11px] font-black text-primary dark:text-primary-light tracking-widest bg-primary/5 dark:bg-primary-light/5 border-x border-primary/5">
                               <div className="flex items-center gap-3">
                                  <span className="opacity-30">#</span>{inv.orderId}
                               </div>
                            </td>
                          )}
                          {visibleColumns.userName && (
                            <td className="px-10 py-8 text-sm font-black text-text-pri dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">{inv.userName}</td>
                          )}
                          {visibleColumns.mobile && (
                            <td className="px-10 py-8 text-[11px] font-black text-slate-400 dark:text-slate-500 tracking-tighter">{inv.mobile}</td>
                          )}
                          {visibleColumns.address && (
                            <td className="px-10 py-8">
                               <div className="max-w-[200px] truncate text-[10px] font-bold text-slate-400 dark:text-slate-600 italic uppercase tracking-tighter hover:text-primary transition-colors">
                                  {inv.address}
                               </div>
                            </td>
                          )}
                          {visibleColumns.finalTotal && (
                            <td className="px-10 py-8 text-right font-black text-lg text-text-pri dark:text-white tracking-widest font-mono italic">
                               ₹{inv.finalTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </td>
                          )}
                          {visibleColumns.status && (
                            <td className="px-10 py-8 text-center">
                              <span className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all duration-500
                                ${inv.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5' :
                                  inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/5' :
                                  inv.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-rose-500/5' :
                                  'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/5'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  inv.status === 'Delivered' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' :
                                  inv.status === 'Pending' ? 'bg-amber-500 animate-pulse shadow-lg shadow-amber-500/50' :
                                  inv.status === 'Cancelled' ? 'bg-rose-500 shadow-lg shadow-rose-500/50' :
                                  'bg-blue-500 shadow-lg shadow-blue-500/50'
                                }`} />
                                {inv.status}
                              </span>
                            </td>
                          )}
                          {visibleColumns.orderDate && (
                            <td className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-widest">{inv.orderDate}</td>
                          )}
                          {visibleColumns.operate && (
                            <td className="px-10 py-8 text-center">
                              <button className="w-12 h-12 inline-flex items-center justify-center text-slate-200 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800 group-hover:shadow-lg active:scale-95">
                                <Eye size={24} />
                              </button>
                            </td>
                          )}
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {!loading && filteredInvoices.length > 0 && (
              <div className="mt-12 p-8 bg-background-site/50 dark:bg-slate-950/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-8">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
                   Financial Index: <span className="text-primary italic">1</span> to <span className="text-primary italic">{filteredInvoices.length}</span> / {invoices.length} INVOICES
                </span>
                <div className="flex items-center gap-4">
                  <button disabled className="w-14 h-14 bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-200 cursor-not-allowed transition-all shadow-sm">
                     <ChevronRight size={24} className="rotate-180" />
                  </button>
                  <div className="px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/30">
                     REVENUE_PAGE_01
                  </div>
                  <button disabled className="w-14 h-14 bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-200 cursor-not-allowed transition-all shadow-sm">
                     <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-auto p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em]">
              <span className="flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                REVENUE_SYNC: NOMINAL
              </span>
              <div className="flex items-center gap-4">
                 <Shield size={18} /> AUDIT_READY_v6
              </div>
          </footer>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           Revenue analytics synthesize <span className="text-primary italic">cross-channel</span> sales vectors. <br/>All financial nodes are cryptographically verified for audit transparency and fiscal compliance.
        </p>
      </footer>
    </div>
  );
}