import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreHorizontal, ChevronDown, 
  Grid, List, Loader2, MapPin, Filter, Eye, Edit3, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500">
      {/* --- PAGE HEADER --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <MapPin size={14} />
            <span>Logistics Node</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Delivery Matrix</h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Download size={18} className="text-indigo-600" />
            Sync CSV
          </button>
          <button className="flex items-center gap-3 px-6 py-3 bg-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-200 dark:shadow-none">
            New Entry
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- CONTROLS CENTER --- */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-6">
          <div className="relative w-full md:w-[28rem] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Locate by identity, sector, or zip..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl text-[0.9375rem] font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition-all" title="Reset Flux">
              <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-1" />
            
            {/* Column Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                className="flex items-center gap-3 px-5 py-3.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 transition-all"
              >
                <Filter size={16} className="text-indigo-600" />
                Columns
                <ChevronDown size={16} className={`transition-transform duration-300 ${showColumnDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showColumnDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl z-20 p-4"
                  >
                    <p className="px-3 pb-3 border-b border-slate-50 dark:border-slate-800 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Visibility Matrix</p>
                    <div className="mt-3 max-h-72 overflow-y-auto space-y-1">
                      {Object.keys(visibleColumns).map(col => (
                        <label key={col} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl cursor-pointer transition-colors text-xs font-bold text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={visibleColumns[col]}
                            onChange={() => toggleColumn(col)}
                            className="w-4 h-4 rounded-md border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-transparent dark:checked:bg-indigo-600"
                          />
                          {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- DATA CONSOLE --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                  {visibleColumns.id && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Hex Code</th>}
                  {visibleColumns.userName && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nexus Hub</th>}
                  {visibleColumns.type && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Topology</th>}
                  {visibleColumns.mobile && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Comm-Link</th>}
                  {visibleColumns.city && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sector</th>}
                  {visibleColumns.pincode && <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Zip code</th>}
                  {visibleColumns.actions && <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Operations</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Syncing database node...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredAddresses.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-32 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 dark:bg-slate-950 rounded-full mb-6 border border-slate-100 dark:border-slate-800">
                        <MapPin className="text-slate-200 dark:text-slate-800" size={40} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">Coordinate anomaly</h3>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">Zero points detected.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAddresses.map((addr) => (
                    <tr key={addr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                      {visibleColumns.id && <td className="px-8 py-6 text-sm font-black text-indigo-600 dark:text-indigo-400">#{addr.id}</td>}
                      {visibleColumns.userName && (
                        <td className="px-8 py-6">
                          <div className="text-base font-black text-slate-900 dark:text-white">{addr.userName}</div>
                          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter mt-1">{addr.landmark || 'UNDEFINED'}</div>
                        </td>
                      )}
                      {visibleColumns.type && (
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                            addr.type === 'Home' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
                          }`}>
                            {addr.type}
                          </span>
                        </td>
                      )}
                      {visibleColumns.mobile && <td className="px-8 py-6 text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.05em]">{addr.mobile}</td>}
                      {visibleColumns.city && (
                        <td className="px-8 py-6">
                          <div className="text-sm font-black text-slate-900 dark:text-white leading-tight">{addr.city}</div>
                          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{addr.state}</div>
                        </td>
                      )}
                      {visibleColumns.pincode && <td className="px-8 py-6 text-sm font-black text-slate-500 dark:text-slate-500 font-mono tracking-tighter">{addr.pincode}</td>}
                      {visibleColumns.actions && (
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-3 bg-white dark:bg-slate-900 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                              <Eye size={18} />
                            </button>
                            <button className="p-3 bg-white dark:bg-slate-900 text-slate-400 hover:text-amber-600 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                              <Edit3 size={18} />
                            </button>
                            <button className="p-3 bg-white dark:bg-slate-900 text-slate-400 hover:text-red-500 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                              <Trash2 size={18} />
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
          
          {/* --- TERMINAL FOOTER --- */}
          {!loading && filteredAddresses.length > 0 && (
            <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Matrix View: <span className="text-indigo-600 dark:text-indigo-400">{filteredAddresses.length} Nodes</span> Active
              </span>
              <div className="flex gap-4">
                <button className="px-6 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors cursor-not-allowed">Halt</button>
                <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all">Advance</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}