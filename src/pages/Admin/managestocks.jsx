import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  Grid, List, Loader2, ChevronRight, Package, TrendingUp, AlertCircle, Box, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    variantId: true,
    name: true,
    image: true,
    stock: true
  });

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { variantId: 1024, name: "KASOORI METHI PREMIUM", image: "https://via.placeholder.com/150", category: "Masale", stock: 154 },
        { variantId: 1025, name: "KASHMIRI CHILLI POWDER", image: "https://via.placeholder.com/150", category: "Powders", stock: 8 },
        { variantId: 1026, name: "TURMARIC GOLD DUST", image: "https://via.placeholder.com/150", category: "Powders", stock: 45 }
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesSearch = 
      searchTerm === '' ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.variantId?.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">
            <TrendingUp size={16} className="animate-pulse" />
            <span>Master Inventory Interface</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Stock Intelligence</h1>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 px-6 py-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span>Home</span> <ChevronRight size={14} className="text-slate-300 dark:text-slate-800" /> <span className="text-indigo-600 dark:text-indigo-400 tracking-widest">LOGISTICS</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* --- CONTROL NODE --- */}
        <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-sm border border-slate-200 dark:border-slate-800 p-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 -ml-24 -mt-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 flex flex-col xl:flex-row gap-10 items-start xl:items-center justify-between">
            {/* Category Filter */}
            <div className="w-full xl:w-auto space-y-3">
              <label className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                <Layers size={14} className="text-indigo-600" /> Filter Taxonomy
              </label>
              <div className="relative group">
                  <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full xl:min-w-[320px] bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl p-5 text-sm font-black text-slate-900 dark:text-white outline-none appearance-none transition-all shadow-inner"
                  >
                  <option value="">All Primary Stocks</option>
                  <option value="Masale">Premium Masale</option>
                  <option value="Powders">Organic Powders</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
              </div>
            </div>

            {/* Search Engine */}
            <div className="w-full xl:w-[450px] space-y-3">
              <label className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                <Search size={14} className="text-indigo-600" /> Deep Lookup
              </label>
              <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={22} />
                  <input
                  type="text"
                  placeholder="Scan product ID or SKU identity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1rem] font-bold text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 shadow-inner"
                  />
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner mt-4 xl:mt-0">
              <button className="p-4 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Sync Ledger"><RotateCw size={22} /></button>
              <button className="p-4 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Grid Config"><Grid size={22} /></button>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-3" />
              <button className="p-4 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Export Manifest"><Download size={22} /></button>
              
              <div className="relative group">
                <button className="p-4 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl transition-all shadow-sm active:scale-90"><MoreVertical size={22} /></button>
                <div className="absolute right-0 mt-6 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl hidden group-hover:block z-50 overflow-hidden ring-8 ring-black/5 p-8 animate-in zoom-in-95 duration-200">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6">Column Protocols</p>
                  <div className="space-y-3">
                    {Object.keys(visibleColumns).map(col => (
                      <label key={col} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                        <div className="relative flex items-center justify-center">
                           <input type="checkbox" checked={visibleColumns[col]} onChange={() => toggleColumn(col)} className="peer sr-only" />
                           <div className="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-800 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all" />
                           <Box size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">{col === 'variantId' ? 'LOGICAL_ID' : col}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- DATA MATRIX --- */}
        <section className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-50 dark:border-slate-800/50">
                  {visibleColumns.variantId && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Logical Hash</th>}
                  {visibleColumns.name && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Nomenclature</th>}
                  {visibleColumns.image && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Asset Visual</th>}
                  {visibleColumns.stock && <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-center">Available Units</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-40 text-center">
                        <Loader2 className="animate-spin h-14 w-14 mx-auto text-indigo-600 mb-8 opacity-40" />
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Scanning Master Inventory Nodes...</p>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-40 text-center">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-950 rounded-full mx-auto mb-8 flex items-center justify-center text-slate-200 dark:text-slate-800 border-4 border-dashed border-slate-100 dark:border-slate-800">
                           <Package size={40} />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Zero Inventory Matching Logic</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={product.variantId} className="group hover:bg-slate-50/30 dark:hover:bg-slate-950/30 transition-all duration-500">
                        {visibleColumns.variantId && (
                          <td className="px-10 py-8 font-black text-indigo-600 dark:text-indigo-500 text-sm tracking-tighter">
                             <div className="flex items-center gap-3">
                                <span className="opacity-30">#</span>{product.variantId}
                             </div>
                          </td>
                        )}
                        {visibleColumns.name && (
                          <td className="px-10 py-8">
                             <div className="text-[1rem] font-black text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-indigo-600 transition-colors">{product.name}</div>
                             <div className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] mt-1">{product.category || 'GENERAL_STK'}</div>
                          </td>
                        )}
                        {visibleColumns.image && (
                          <td className="px-10 py-8">
                            <div className="h-20 w-20 p-2 bg-slate-50 dark:bg-slate-950 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-700">
                               <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                          </td>
                        )}
                        {visibleColumns.stock && (
                            <td className="px-10 py-8 text-center">
                                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black tracking-tight border shadow-sm ${
                                    product.stock > 10 
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10' 
                                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10 animate-pulse'
                                }`}>
                                   {product.stock <= 10 && <AlertCircle size={14} />}
                                   {product.stock || '0'} UNITS
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
          <footer className="p-10 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex items-center gap-5 text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.4em]">
                Registry Integrity: <span className="text-indigo-600 dark:text-indigo-400 text-sm">{filteredProducts.length}</span> Active Nodes
             </div>
             <p className="text-[8px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.6em] hidden xl:block">SYSTEM-INVENTORY-PROTOCOL-v9.2</p>
          </footer>
        </section>
      </main>
    </div>
  );
}