import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreHorizontal, ChevronDown, 
  Grid, List, Loader2, MapPin, Filter, Eye, Edit3, Trash2
} from 'lucide-react';

export default function CustomerAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true, userName: true, type: true, mobile: true,
    landmark: true, city: true, state: true, pincode: true, actions: true
  });

  useEffect(() => {
    setTimeout(() => {
      // Mock data for visual preview
      setAddresses([
        { id: '8821', userName: 'John Doe', type: 'Home', mobile: '+91 98765 43210', landmark: 'Near Central Park', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', country: 'India' },
        { id: '8822', userName: 'Sarah Smith', type: 'Office', mobile: '+91 88776 55443', landmark: 'Tech Hub Floor 4', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' }
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredAddresses = addresses.filter(addr => 
    Object.values(addr).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* --- Page Header --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <MapPin size={14} />
            <span>Logistics Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Customer Addresses</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
            Add New Address
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-4">
        {/* --- Controls Bar --- */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, city, or pincode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all" title="Refresh">
              <RotateCw size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            
            {/* Column Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-all"
              >
                <Filter size={16} />
                Columns
                <ChevronDown size={16} className={`transition-transform ${showColumnDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showColumnDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-2 animate-in fade-in zoom-in duration-150">
                  <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Display Columns</p>
                  <div className="max-h-64 overflow-y-auto">
                    {Object.keys(visibleColumns).map(col => (
                      <label key={col} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={visibleColumns[col]}
                          onChange={() => toggleColumn(col)}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                        {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  {visibleColumns.id && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">ID</th>}
                  {visibleColumns.userName && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Customer</th>}
                  {visibleColumns.type && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Type</th>}
                  {visibleColumns.mobile && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Contact</th>}
                  {visibleColumns.city && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Location</th>}
                  {visibleColumns.pincode && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Pincode</th>}
                  {visibleColumns.actions && <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-24 text-center">
                      <Loader2 className="animate-spin h-10 w-10 mx-auto text-indigo-500 mb-4" />
                      <p className="text-slate-500 font-medium">Syncing address database...</p>
                    </td>
                  </tr>
                ) : filteredAddresses.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-24 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                        <MapPin className="text-slate-300" size={32} />
                      </div>
                      <h3 className="text-slate-900 font-semibold">No addresses found</h3>
                      <p className="text-slate-500 text-sm">No results match your current search criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAddresses.map((addr) => (
                    <tr key={addr.id} className="hover:bg-slate-50/80 transition-colors group">
                      {visibleColumns.id && <td className="px-6 py-4 text-sm font-bold text-indigo-600">#{addr.id}</td>}
                      {visibleColumns.userName && (
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-slate-900">{addr.userName}</div>
                          <div className="text-[11px] text-slate-400 font-medium leading-none mt-1">{addr.landmark || 'No Landmark'}</div>
                        </td>
                      )}
                      {visibleColumns.type && (
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                            addr.type === 'Home' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                          }`}>
                            {addr.type}
                          </span>
                        </td>
                      )}
                      {visibleColumns.mobile && <td className="px-6 py-4 text-sm text-slate-600 font-medium">{addr.mobile}</td>}
                      {visibleColumns.city && (
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 font-medium">{addr.city}</div>
                          <div className="text-xs text-slate-400">{addr.state}</div>
                        </td>
                      )}
                      {visibleColumns.pincode && <td className="px-6 py-4 text-sm text-slate-500 font-mono">{addr.pincode}</td>}
                      {visibleColumns.actions && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 transition-all">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-amber-600 transition-all">
                              <Edit3 size={16} />
                            </button>
                            <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-red-600 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* --- Pagination Footer --- */}
          {!loading && filteredAddresses.length > 0 && (
            <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-900">{filteredAddresses.length}</span> of <span className="text-slate-900">142</span> addresses
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
                <button className="px-4 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}