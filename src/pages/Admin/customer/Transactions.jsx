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
      case 'Success': return 'bg-emerald-50 text-emerald-700 border-emerald-100 italic-none';
      case 'Failed': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success': return <CheckCircle2 size={14} />;
      case 'Failed': return <XCircle size={14} />;
      case 'Pending': return <Clock size={14} />;
      default: return null;
    }
  };

  return (
    <div className="p-8 bg-[#fcfcfd] min-h-screen font-sans text-slate-900 uppercase-none">
      
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Monitor and manage customer payments and order history.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:shadow-md transition-all">
            <Download size={18} className="text-slate-400" />
            Download Statement
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* --- Toolbar --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by User, Transaction ID or Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Filter size={18} className={showFilters ? "text-indigo-600" : "text-slate-400"} />
              Filters
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
              <RotateCw size={18} />
            </button>
          </div>
        </div>

        {/* --- Table Component --- */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Transaction / User</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Order Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase tracking-widest"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <Loader2 className="animate-spin h-9 w-9 mx-auto text-indigo-500 mb-3" />
                      <p className="text-slate-500 font-medium animate-pulse">Processing ledger data...</p>
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-32 text-center">
                      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <Receipt className="text-slate-300" size={32} />
                      </div>
                      <h3 className="text-slate-900 font-bold text-lg">No transactions found</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto">We couldn't find any records matching your search. Try clearing your filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex h-9 w-9 rounded-lg bg-slate-100 items-center justify-center text-slate-600 font-bold text-xs border border-slate-200 uppercase tracking-tighter">
                            {tx.id.split('-')[0]}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 font-mono tracking-tight">{tx.id}</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">{tx.userName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-indigo-600 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                          {tx.orderId}
                          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-1">{tx.transactionId}</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="text-sm font-bold text-slate-900 tracking-tight">₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${getStatusStyle(tx.status)}`}>
                          {getStatusIcon(tx.status)}
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-slate-600 font-medium">{tx.date}</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* --- Pagination Info --- */}
          {!loading && filteredTransactions.length > 0 && (
            <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Ledger Page 1 of 1
              </span>
              <div className="flex items-center gap-4">
                <button className="text-xs font-bold text-slate-400 cursor-not-allowed uppercase" disabled>Previous</button>
                <div className="h-4 w-px bg-slate-200" />
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider">Next Page</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}