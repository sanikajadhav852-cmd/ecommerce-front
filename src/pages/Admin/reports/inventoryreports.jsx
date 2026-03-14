import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  Grid, List, Loader2, Package, AlertTriangle, TrendingUp,
  Box, Eye, Activity, Shield, ChevronRight, Layers, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InventoryReport() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    productName: true,
    variantId: true,
    unitOfMeasure: true,
    totalUnitsSold: true,
    totalSales: true
  });

  // Simulate data loading (replace with real API later)
  useEffect(() => {
    setTimeout(() => {
      setInventory([
        { productName: 'Cotton Saree - Red', variantId: 'VAR-101', unitOfMeasure: 'Pieces', totalUnitsSold: 145, totalSales: 435000 },
        { productName: 'Silk Kurta - Blue', variantId: 'VAR-102', unitOfMeasure: 'Pieces', totalUnitsSold: 89, totalSales: 133500 },
        { productName: 'Designer Lehenga', variantId: 'VAR-103', unitOfMeasure: 'Pieces', totalUnitsSold: 24, totalSales: 360000 },
        { productName: 'Mens Formal Shirt', variantId: 'VAR-104', unitOfMeasure: 'Pieces', totalUnitsSold: 210, totalSales: 210000 },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredInventory = inventory.filter(item => {
    return (
      searchTerm === '' ||
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variantId?.toString().includes(searchTerm) ||
      item.unitOfMeasure?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Box size={16} className="text-primary animate-pulse" />
            <span>Warehouse Matrix v8.1</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Stock Telemetry</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Logistics Pulse: OPTIMAL
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Inventory Report</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* Analytics Hub Controls */}
        <section className="bg-surface dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="flex flex-col xl:flex-row gap-10 items-center justify-between relative z-10">
            <div className="relative group/search w-full xl:w-[500px]">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
              <input
                type="text"
                placeholder="Scan Inventory Vectors..."
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
        </section>

        {/* Inventory Spectrum Section */}
        <section className="bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all group overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-12 relative z-10">
            <div className="overflow-x-auto rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800/10 shadow-sm bg-background-site/30 dark:bg-slate-950/20">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
                  <tr>
                    {Object.keys(visibleColumns).map(col => visibleColumns[col] && (
                      <th key={col} className={`px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] border-r border-slate-100/30 dark:border-slate-800/20 last:border-0 ${col.includes('total') ? 'text-right' : ''}`}>
                        {col.replace(/([A-Z])/g, ' $1')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/10">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-10 py-60 text-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
                             <Database size={400} />
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-8">
                            <Loader2 className="animate-spin h-24 w-24 text-primary opacity-20" />
                            <div className="space-y-4">
                              <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">SCANNING GRID</p>
                              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] animate-pulse">Awaiting Warehouse Matrix Synchronization...</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-10 py-60 text-center relative overflow-hidden">
                           <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="w-24 h-24 bg-background-site dark:bg-slate-950 rounded-[2.5rem] flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner">
                              <Search size={48} className="text-slate-100 dark:text-slate-800" />
                            </div>
                           <p className="text-4xl font-black text-slate-200 dark:text-slate-800 uppercase tracking-[0.6em]">NULL_RESULTS</p>
                           <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Query Logic identified zero matching clusters</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map((item, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={item.variantId || idx} 
                          className="group hover:bg-background-site/50 dark:hover:bg-slate-800/50 transition-all duration-500"
                        >
                          {visibleColumns.productName && (
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-background-site dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 shadow-inner transition-transform group-hover:scale-110 group-hover:text-primary">
                                  <Package size={22} />
                                </div>
                                <span className="text-sm font-black text-text-pri dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">{item.productName}</span>
                              </div>
                            </td>
                          )}
                          {visibleColumns.variantId && (
                            <td className="px-10 py-8 text-[11px] font-black text-primary dark:text-primary-light tracking-widest bg-primary/5 dark:bg-primary-light/5 border-x border-primary/5">
                               <div className="flex items-center gap-2">
                                  <Shield size={12} className="opacity-30" /> {item.variantId}
                               </div>
                            </td>
                          )}
                          {visibleColumns.unitOfMeasure && (
                            <td className="px-10 py-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.unitOfMeasure || '—'}</td>
                          )}
                          {visibleColumns.totalUnitsSold && (
                            <td className="px-10 py-8 text-right font-black text-lg text-text-pri dark:text-white tracking-tighter">
                               {item.totalUnitsSold?.toLocaleString() || '0'}
                               <span className="text-[9px] text-slate-300 ml-2 uppercase tracking-widest">Units</span>
                            </td>
                          )}
                          {visibleColumns.totalSales && (
                            <td className="px-10 py-8 text-right font-black text-xl text-primary dark:text-primary-light font-mono tracking-tighter">
                               ₹{item.totalSales?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}
                            </td>
                          )}
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {!loading && filteredInventory.length > 0 && (
              <div className="mt-12 p-8 bg-background-site/50 dark:bg-slate-950/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-8">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">
                  Registry Index: <span className="text-primary italic">1</span> to <span className="text-primary italic">{filteredInventory.length}</span> / {inventory.length} NODES
                </span>
                <div className="flex items-center gap-4">
                  <button disabled className="w-14 h-14 bg-surface dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-200 cursor-not-allowed transition-all">
                     <ChevronRight size={24} className="rotate-180" />
                  </button>
                  <div className="px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/30">
                     MATRIX_PAGE_01
                  </div>
                  <button disabled className="w-14 h-14 bg-surface dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-200 cursor-not-allowed transition-all">
                     <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-auto p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.5em]">
              <span className="flex items-center gap-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                TELEMETRY_LINK: SECURED
              </span>
              <div className="flex items-center gap-4">
                 <Shield size={18} /> DATA_INTEGRITY_v8
              </div>
          </footer>
        </section>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-12 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           Stock telemetry provides a <span className="text-primary italic">multi-dimensional</span> view of warehouse logistics. <br/>All data streams are finalized and cryptographically verified at the edge.
        </p>
      </footer>
    </div>
  );
}