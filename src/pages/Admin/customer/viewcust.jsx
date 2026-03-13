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
    <div className="p-8 bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
              <span>Dashboard</span>
              <ChevronDown size={14} className="-rotate-90" />
              <span className="text-indigo-600">Customers</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Customer Directory</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <UserPlus size={18} />
              Add Customer
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-4">
        {/* Search & Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block" />
            
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              <List size={20} />
            </button>
            
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-all">
              <RotateCw size={20} />
            </button>
          </div>
        </div>

        {/* Table/List Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  {visibleColumns.name && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>}
                  {visibleColumns.mobile && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>}
                  {visibleColumns.city && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>}
                  {visibleColumns.balance && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Balance</th>}
                  {visibleColumns.status && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>}
                  {visibleColumns.actions && <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <Loader2 className="animate-spin h-10 w-10 mx-auto text-indigo-500 mb-4" />
                      <span className="text-slate-500 font-medium">Fetching records...</span>
                    </td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-slate-300" size={28} />
                      </div>
                      <h3 className="text-slate-900 font-semibold">No customers found</h3>
                      <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{customer.name}</div>
                            <div className="text-xs text-slate-500">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{customer.mobile}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{customer.city}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">₹{customer.balance}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                          customer.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${customer.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-md text-slate-600 transition-all" title="View Details">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-md text-slate-600 transition-all">
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
          
          {/* Pagination Footer (Placeholder) */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{filteredCustomers.length}</span> results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-900 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}