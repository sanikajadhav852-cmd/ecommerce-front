import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreHorizontal, 
  Loader2, Wallet, ArrowUpCircle, ArrowDownCircle,
  UserPlus, History, Info, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageCustomerWallet() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchTransaction, setSearchTransaction] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formData, setFormData] = useState({
    type: 'Credit',
    amount: '',
    message: ''
  });

  useEffect(() => {
    setTimeout(() => {
      // Mock data for professional preview
      setCustomers([
        { id: '801', name: 'Alex Johnson', email: 'alex.j@example.com', balance: 1250.00 },
        { id: '802', name: 'Maria Garcia', email: 'm.garcia@test.com', balance: 45.50 },
        { id: '803', name: 'James Wilson', email: 'j.wilson@corp.com', balance: 0.00 },
      ]);
      setTransactions([
        { id: 'W-99', userName: 'Alex Johnson', type: 'Credit', amount: 500, status: 'Success', message: 'Seasonal Bonus', date: 'Mar 12, 2026' },
        { id: 'W-98', userName: 'Maria Garcia', email: 'm.garcia@test.com', type: 'Debit', amount: 20, status: 'Success', message: 'Service Fee', date: 'Mar 10, 2026' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateNewBalance = () => {
    if (!selectedUser || !formData.amount) return null;
    const amt = parseFloat(formData.amount);
    return formData.type === 'Credit' ? selectedUser.balance + amt : selectedUser.balance - amt;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500">
      {/* --- HEADER CONSOLE --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Wallet size={14} />
            <span>Financial Node</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Wallet Matrix</h1>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] border border-indigo-500/20">
          <History size={16} className="animate-pulse" />
          Neural Audit Log Active
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: TRANSACTION FORM (5 COLS) --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30">
              <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <Wallet size={18} />
                </div>
                Balance Adjuster
              </h2>
            </div>
            
            <form className="p-8 space-y-6">
              {/* Selected User Display */}
              <div className={`p-5 rounded-2xl border-2 transition-all duration-500 ${selectedUser ? 'border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-inner' : 'border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50'}`}>
                {selectedUser ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Target Identity</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white leading-none">{selectedUser.name}</p>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">{selectedUser.email}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedUser(null)}
                      className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors py-2 px-3 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/20"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest italic">Pick an entity from the matrix</p>
                  </div>
                )}
              </div>

              {/* Transaction Type Toggle */}
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-[1.5rem] border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, type: 'Credit' }))}
                  className={`flex items-center justify-center gap-3 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${formData.type === 'Credit' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  <ArrowUpCircle size={18} /> INFUSION
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, type: 'Debit' }))}
                  className={`flex items-center justify-center gap-3 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${formData.type === 'Debit' ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                  <ArrowDownCircle size={18} /> EXTRACTION
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2 tracking-[0.2em] ml-2">Value Amount (INR)</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 font-black text-xl group-focus-within:text-indigo-600 transition-colors">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl text-lg font-black text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 font-mono"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Balance Preview */}
              <AnimatePresence>
                {selectedUser && formData.amount && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-between p-5 bg-slate-900 dark:bg-slate-950 rounded-2xl text-white border border-indigo-500/20"
                  >
                    <div className="text-center flex-1">
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">State</p>
                      <p className="font-mono text-sm font-bold">₹{selectedUser.balance.toFixed(2)}</p>
                    </div>
                    <div className="text-slate-700 mx-3 font-black text-xl">→</div>
                    <div className="text-center flex-1">
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Projected</p>
                      <p className={`font-mono text-sm font-black ${formData.type === 'Credit' ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>₹{calculateNewBalance()?.toFixed(2)}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2 tracking-[0.2em] ml-2">Audit Memo / Reason</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl text-[0.9375rem] font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 resize-none"
                  placeholder="Describe the financial mutation..."
                />
              </div>

              <div className="flex items-start gap-3 text-[10px] font-black text-amber-600 dark:text-amber-400/70 bg-amber-500/5 dark:bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 uppercase tracking-widest leading-relaxed">
                <Info size={16} className="text-amber-500 shrink-0" />
                <span>Adjustments commit instantly to the ledger and notify the entity.</span>
              </div>

              <button 
                type="button"
                disabled={!selectedUser}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-300 dark:disabled:text-slate-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1 block text-center"
              >
                Execute Mutation
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT: USER SELECTION (7 COLS) --- */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] pl-2">Entity Matrix</h2>
            <div className="relative flex-1 max-w-sm w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Identify hub..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-xl text-sm font-bold outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto max-h-[600px]">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white dark:bg-slate-900 shadow-sm z-10">
                <tr className="bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Entity Hub</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right border-b border-slate-100 dark:border-slate-800">Credit State</th>
                  <th className="px-8 py-4 border-b border-slate-100 dark:border-slate-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {customers.map(c => (
                  <tr key={c.id} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all ${selectedUser?.id === c.id ? 'bg-indigo-500/5 dark:bg-indigo-500/10' : ''}`}>
                    <td className="px-8 py-5">
                      <div className="text-[0.9375rem] font-black text-slate-900 dark:text-white leading-tight">{c.name}</div>
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-1">{c.email}</div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">₹{c.balance.toFixed(2)}</div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedUser(c)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedUser?.id === c.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white'}`}
                      >
                        {selectedUser?.id === c.id ? 'Active' : 'Deploy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- BOTTOM: HISTORY CONSOLE --- */}
      <div className="max-w-7xl mx-auto mt-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20 flex justify-between items-center">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-950 rounded-lg">
              <History size={18} className="text-slate-400 dark:text-slate-600" />
            </div>
            Mutation History
          </h2>
          <button className="p-3 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition-all text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 shadow-sm">
            <Download size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Hex ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Identity Hub</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mutation</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Protocol</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Audit Memo</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-all group">
                  <td className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 font-mono tracking-tighter group-hover:text-indigo-600">#{tx.id}</td>
                  <td className="px-8 py-6 text-[0.9375rem] font-black text-slate-900 dark:text-white leading-tight">{tx.userName}</td>
                  <td className="px-8 py-6">
                    <span className={`text-base font-black font-mono transition-transform group-hover:scale-110 inline-block ${tx.type === 'Credit' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                      {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-[0.15em] border inline-flex items-center gap-1.5 ${tx.type === 'Credit' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${tx.type === 'Credit' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500 dark:text-slate-400 truncate max-w-xs">{tx.message}</td>
                  <td className="px-8 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}