import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Layers, RefreshCw, Save, 
  GripVertical, Image as ImageIcon, ArrowLeft, ArrowUpDown,
  Activity, Shield
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import api from '../../../lib/api.js';

export default function CategoriesOrder() {
  const [categories, setCategories] = useState([
    { id: 111, name: 'Ready Mix Masala', display_order: 0 },
    { id: 113, name: 'Khada Masala', display_order: 1 },
    { id: 112, name: 'Spices Powders', display_order: 2 },
  ]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Note: Fetch logic can be implemented as needed
  /*
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setFetching(true);
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.categories.sort((a,b) => a.display_order - b.display_order));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };
  */

  const handleSaveOrder = async () => {
    try {
      setLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 800));
      alert("Custom sequence synchronized successfully!");
    } catch (err) {
      console.error("Error saving order:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <ArrowUpDown size={16} className="text-primary animate-bounce" />
            <span>Priority Calibration Protocol</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Sequence Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <button 
            onClick={handleSaveOrder}
            disabled={loading}
            className="flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-black transition-all disabled:opacity-50 active:scale-95"
          >
            <Save size={18} /> {loading ? 'Syncing...' : 'Deploy Sequence'}
          </button>
        </div>
      </header>

      {/* --- MAIN MATRIX --- */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all group">
          <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-background-site/30 dark:bg-slate-950/30 flex justify-between items-center">
             <div className="flex items-center gap-6">
                <div className="p-4 bg-primary/10 text-primary rounded-[1.5rem]">
                    <Layers size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Active Topology</h3>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mt-1">Storefront Display Order</p>
                </div>
             </div>
             <div className="px-6 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
               {categories.length} Core Nodes
             </div>
          </div>

          <div className="p-12">
            <div className="flex items-center gap-4 p-6 bg-primary/5 dark:bg-primary-light/5 rounded-[2rem] border border-primary/10 mb-10">
               <Shield size={20} className="text-primary" />
               <p className="text-sm text-text-pri/70 dark:text-white/60 font-medium italic">
                 Drag and drop the interface nodes to reconfigure the global display priority.
               </p>
            </div>

            <Reorder.Group 
              axis="y" 
              values={categories} 
              onReorder={setCategories}
              className="space-y-6"
            >
              <AnimatePresence>
                {categories.map((cat, index) => (
                  <Reorder.Item
                    key={cat.id}
                    value={cat}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center gap-6 p-8 bg-background-site dark:bg-slate-950 border-2 border-transparent hover:border-primary/20 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 cursor-default group/item">
                      {/* Order Indicator */}
                      <div className="w-16 h-16 flex items-center justify-center bg-surface dark:bg-slate-900 text-slate-300 dark:text-slate-700 text-xl font-black rounded-3xl border border-slate-100 dark:border-slate-800 group-hover/item:text-primary group-hover/item:border-primary/20 transition-all duration-500 shadow-inner">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center p-2 shadow-xl group-hover/item:shadow-2xl transition-all duration-700 grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100">
                        {cat.image ? (
                          <img 
                            src={cat.image} 
                            alt="" 
                            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/item:scale-125"
                          />
                        ) : (
                          <ImageIcon size={28} className="text-slate-200 dark:text-slate-800" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-2">
                        <h4 className="text-xl font-black text-text-pri dark:text-white tracking-tight uppercase">
                          {cat.name}
                        </h4>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">HASH:</span>
                            <code className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-xl border border-primary/10">{cat.id}</code>
                        </div>
                      </div>

                      {/* Drag Handle */}
                      <div className="p-6 text-slate-200 dark:text-slate-800 group-hover/item:text-primary transition-all duration-500 cursor-grab active:cursor-grabbing hover:scale-125">
                        <GripVertical size={32} />
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </div>

          <footer className="p-10 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.4em]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              INTEGRITY VERIFIED: CAT-MATRIX-v2.1
            </div>
            <div className="flex items-center gap-2">
              <Activity size={14} /> SYS-PRIORITY-ENG
            </div>
          </footer>
        </section>
      </motion.main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="mt-16 text-center max-w-2xl mx-auto p-10 border-t border-slate-100 dark:border-slate-800/10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
          Node adjustments reflect globally across storefront endpoints. <br/>Ensure <span className="text-primary">Deployment</span> to persist architecture state.
        </p>
      </footer>
    </div>
  );
}