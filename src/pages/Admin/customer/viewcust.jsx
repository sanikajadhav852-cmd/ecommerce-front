import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreHorizontal, ChevronDown, 
  Grid, List, Loader2, Globe, Eye, Filter, UserPlus
} from 'lucide-react';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  
  const [visibleColumns, setVisibleColumns] = useState({
    id: true, name: true, email: true, mobile: true, 
    balance: true, city: true, status: true, actions: true
  });

  useEffect(() => {
    setTimeout(() => {
      // Mock Data for demonstration
      setCustomers([
        { id: '101', name: 'Alex Johnson', email: 'alex@example.com', mobile: '+1 234 567', balance: '1,250.00', city: 'New York', status: 'Active', date: '2024-03-10' },
        { id: '102', name: 'Sarah Williams', email: 'sarah.w@tech.com', mobile: '+1 987 654', balance: '0.00', city: 'London', status: 'Inactive', date: '2024-03-12' },
      ]); 
      setLoading(false);
    }, 1200);
  }, []);

  const filteredCustomers = customers.filter(c => 
    Object.values(c).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Orbit</span>
              <ChevronDown size={14} className="-rotate-90 text-slate-300 dark:text-slate-700" />
              <span className="text-indigo-600 dark:text-indigo-400">Civilian Nodes</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Customer Matrix</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              <Download size={18} className="text-indigo-600" />
              Export
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-200 dark:shadow-none">
              <UserPlus size={18} />
              Onboard User
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- SEARCH & CONTROL CENTER --- */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-6">
          <div className="relative flex-1 max-w-xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Query biometric or network identity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl text-[0.9375rem] font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 px-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <Grid size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <List size={20} />
              </button>
            </div>
            
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all">
              <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* --- DATA MATRIX --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50">
                  {visibleColumns.name && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nexus ID</th>}
                  {visibleColumns.mobile && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Comm-Link</th>}
                  {visibleColumns.city && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sector</th>}
                  {visibleColumns.balance && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Credits</th>}
                  {visibleColumns.status && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>}
                  {visibleColumns.actions && <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Ops</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Scanning frequency...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-32 text-center">
                      <div className="bg-slate-50 dark:bg-slate-950 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-800">
                        <Search className="text-slate-200 dark:text-slate-800" size={32} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">No entity detected</h3>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">Adjust query parameters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-500">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 dark:text-white text-base leading-tight">{customer.name}</div>
                            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{customer.mobile}</td>
                      <td className="px-8 py-6 text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{customer.city}</td>
                      <td className="px-8 py-6 text-sm font-black text-indigo-601 dark:text-indigo-400 leading-none">₹{customer.balance}</td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          customer.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                        }`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${customer.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-3 bg-white dark:bg-slate-900 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all" title="View Profile">
                            <Eye size={18} />
                          </button>
                          <button className="p-3 bg-white dark:bg-slate-900 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* --- PAGINATION CONSOLE --- */}
          <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Protocol: <span className="text-slate-900 dark:text-white">{filteredCustomers.length} Entities Online</span>
            </p>
            <div className="flex gap-4">
              <button className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors" disabled>Back</button>
              <button className="px-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:-translate-y-0.5 transition-all">Advance</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}