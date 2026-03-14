import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreHorizontal, ChevronDown, 
  Loader2, Filter, Receipt, CheckCircle2, XCircle, Clock, ArrowUpRight 
} from 'lucide-react';

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [visibleColumns, setVisibleColumns] = useState({
    id: true, userName: true, orderId: true, transactionId: true, 
    amount: true, status: true, date: true, actions: true
  });

  useEffect(() => {
    setTimeout(() => {
      // Mock data for professional look
      setTransactions([
        { id: 'TXN-9920', userName: 'Courtney Henry', orderId: 'ORD-5521', transactionId: 'pay_K9z2Lp0m', amount: 1240.50, status: 'Success', date: 'Mar 12, 2026' },
        { id: 'TXN-9921', userName: 'Arlene McCoy', orderId: 'ORD-5522', transactionId: 'pay_J1x8Vq4n', amount: 89.00, status: 'Failed', date: 'Mar 11, 2026' },
        { id: 'TXN-9922', userName: 'Jerome Bell', orderId: 'ORD-5523', transactionId: 'pay_M2w9Rt6x', amount: 450.00, status: 'Pending', date: 'Mar 11, 2026' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredTransactions = transactions.filter(tx => 
    Object.values(tx).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Success': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Failed': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success': return <CheckCircle2 size={14} className="animate-pulse" />;
      case 'Failed': return <XCircle size={14} />;
      case 'Pending': return <Clock size={14} className="animate-spin-slow" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500">
      
      {/* --- HEADER CONSOLE --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Receipt size={14} />
            <span>Financial Node</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Ledger Matrix</h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Download size={18} className="text-indigo-600" />
            Export Protocol
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- CONTROL CENTER --- */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Query identity, order hash, or transaction node..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl text-[0.9375rem] font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 font-mono"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${showFilters ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
            >
              <Filter size={18} />
              Filters
            </button>
            <button className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm">
              <RotateCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* --- DATA MATRIX --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Transaction / Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nexus Link</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Credits</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">State</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Timestamp</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Syncing ledger stream...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-32 text-center">
                      <div className="bg-slate-50 dark:bg-slate-950 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-800">
                        <Receipt className="text-slate-200 dark:text-slate-800" size={40} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">Void detected</h3>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2 max-w-xs mx-auto">No records detected in the specified coordinates.</p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/5 items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-[10px] border border-indigo-500/20 uppercase tracking-tighter">
                            {tx.id.split('-')[1]}
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900 dark:text-white font-mono tracking-tighter leading-none group-hover:text-indigo-600 transition-colors uppercase">#{tx.id}</div>
                            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mt-1 tracking-widest">{tx.userName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 cursor-pointer hover:text-indigo-700 transition-all flex items-center gap-2 font-mono">
                          {tx.orderId}
                          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 font-mono mt-1 opacity-60 tracking-tighter">{tx.transactionId}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="text-base font-black text-slate-900 dark:text-white tracking-tighter font-mono">₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(tx.status)}`}>
                          {getStatusIcon(tx.status)}
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mt-1">
                        {tx.date}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-3 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-950 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 rounded-xl transition-all shadow-sm hover:shadow-lg">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* --- TERMINAL FOOTER --- */}
          {!loading && filteredTransactions.length > 0 && (
            <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Page Stream <span className="text-slate-900 dark:text-white">01 / 01</span>
              </span>
              <div className="flex items-center gap-6">
                <button className="text-[10px] font-black text-slate-300 dark:text-slate-700 cursor-not-allowed uppercase tracking-widest" disabled>Halt</button>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                <button className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 uppercase tracking-widest transition-colors">Advance Nodes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}