import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, 
  Loader2, Wallet, ArrowUpCircle, ArrowDownCircle,
  UserPlus, History, Info, AlertCircle
} from 'lucide-react';

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
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* --- Header --- */}
      <div className="max-w-7xl mx-auto flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Wallet Management</h1>
          <p className="text-slate-500 text-sm mt-1">Adjust balances and monitor customer ledger entries.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wider">
          <History size={14} />
          Audit Log Active
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Left: Transaction Form (5 cols) --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Wallet size={18} className="text-indigo-600" />
                Adjust Balance
              </h2>
            </div>
            
            <form className="p-6 space-y-5">
              {/* Selected User Display */}
              <div className={`p-4 rounded-xl border-2 transition-all ${selectedUser ? 'border-indigo-100 bg-indigo-50/30' : 'border-dashed border-slate-200 bg-slate-50'}`}>
                {selectedUser ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">Selected Customer</p>
                      <p className="text-sm font-bold text-slate-900">{selectedUser.name}</p>
                      <p className="text-xs text-slate-500">{selectedUser.email}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedUser(null)}
                      className="text-xs font-bold text-slate-400 hover:text-red-500 underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-sm text-slate-500 font-medium italic">Please select a user from the table</p>
                  </div>
                )}
              </div>

              {/* Transaction Type Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, type: 'Credit' }))}
                  className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${formData.type === 'Credit' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <ArrowUpCircle size={16} /> Credit
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, type: 'Debit' }))}
                  className={`flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${formData.type === 'Debit' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <ArrowDownCircle size={16} /> Debit
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5 tracking-wide">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Balance Preview */}
              {selectedUser && formData.amount && (
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl text-white">
                  <div className="text-center flex-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Current</p>
                    <p className="font-mono text-sm">₹{selectedUser.balance.toFixed(2)}</p>
                  </div>
                  <div className="text-slate-600 px-2">→</div>
                  <div className="text-center flex-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Final</p>
                    <p className="font-mono text-sm font-bold text-emerald-400">₹{calculateNewBalance()?.toFixed(2)}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5 tracking-wide">Internal Message / Reason</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="e.g. Refund for Order #123"
                />
              </div>

              <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <Info size={14} className="text-amber-500 shrink-0" />
                <span>Adjustment will be processed immediately and is visible to the customer.</span>
              </div>

              <button 
                disabled={!selectedUser}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
              >
                Execute Transaction
              </button>
            </form>
          </div>
        </div>

        {/* --- Right: User Selection (7 cols) --- */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest pl-2">Select User</h2>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Find customer..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto max-h-[500px]">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white shadow-sm z-10">
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Balance</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {customers.map(c => (
                  <tr key={c.id} className={`group hover:bg-slate-50 transition-colors ${selectedUser?.id === c.id ? 'bg-indigo-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-400">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-mono font-bold text-slate-700">₹{c.balance.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedUser(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedUser?.id === c.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'}`}
                      >
                        {selectedUser?.id === c.id ? 'Selected' : 'Select'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Bottom: History Table --- */}
      <div className="max-w-7xl mx-auto mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <History size={18} className="text-slate-400" />
            Wallet Activity
          </h2>
          <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
            <Download size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reason</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 font-mono">#{tx.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{tx.userName}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold font-mono ${tx.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${tx.type === 'Credit' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{tx.message}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}