import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Layers, RefreshCw, Save, 
  GripVertical, Image as ImageIcon, ArrowLeft, ArrowUpDown
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

  // Note: Fetch logic can be uncommented/implemented as needed
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
    <div className="min-h-screen bg-[#F8FAFC] p-[1.5rem] md:p-[2rem]">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[1rem] mb-[2rem]">
        <div className="space-y-[0.25rem]">
          <h1 className="text-[1.875rem] font-black text-gray-900 tracking-tight flex items-center gap-[0.75rem]">
            <ArrowUpDown className="text-primary" size={28} />
            Sequence Manager
          </h1>
          <div className="flex items-center gap-[0.5rem] text-[0.875rem] text-gray-500 font-medium">
            <span>Admin</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-primary-light">Category Ordering</span>
          </div>
        </div>
        
        <div className="flex items-center gap-[0.75rem] bg-white p-[0.5rem] rounded-[1rem] shadow-sm border border-gray-100">
          <button 
            className="p-[0.5rem] text-gray-400 hover:text-primary hover:bg-primary-light/10 rounded-[0.75rem] transition-all"
          >
            <RefreshCw size={20} className={fetching ? 'animate-spin' : ''} />
          </button>
          <div className="w-[1px] h-[1.5rem] bg-gray-100" />
          <button 
            onClick={handleSaveOrder}
            disabled={loading}
            className="flex items-center gap-[0.5rem] px-[1.25rem] py-[0.5rem] bg-primary text-white rounded-[0.75rem] font-black text-[0.875rem] shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50"
          >
            <Save size={16} /> {loading ? 'SYNCING...' : 'SAVE SEQUENCE'}
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[45rem] mx-auto"
      >
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="p-[1.5rem] border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-[1rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.75rem]">
              <Layers size={18} className="text-primary-light" />
              Active Categories
            </h3>
            <span className="text-[0.75rem] font-bold text-primary bg-primary/5 px-[0.75rem] py-[0.25rem] rounded-full">
              {categories.length} Items Listed
            </span>
          </div>

          <div className="p-[1.5rem]">
            <p className="text-[0.875rem] text-gray-500 mb-[2rem] font-medium italic">
              Drag the items using the handle on the right to adjust their display priority on the storefront.
            </p>

            <Reorder.Group 
              axis="y" 
              values={categories} 
              onReorder={setCategories}
              className="space-y-[1rem]"
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
                    <div className="flex items-center gap-[1rem] p-[1rem] bg-white border border-gray-100 rounded-[1.25rem] hover:border-primary/30 hover:shadow-md transition-all cursor-default">
                      {/* Order Indicator */}
                      <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center bg-gray-50 text-gray-400 text-[0.75rem] font-black rounded-[0.75rem] border border-gray-100 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        {index + 1}
                      </div>

                      {/* Image Placeholder/Thumbnail */}
                      <div className="w-[3.5rem] h-[3.5rem] rounded-[1rem] overflow-hidden border border-gray-50 bg-gray-50 flex items-center justify-center text-gray-300">
                        {cat.image ? (
                          <img 
                            src={cat.image} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="opacity-40" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 text-[1rem] leading-tight mb-[0.125rem]">
                          {cat.name}
                        </h4>
                        <span className="text-[0.6875rem] font-bold text-gray-400 uppercase tracking-widest">
                          ID: {cat.id}
                        </span>
                      </div>

                      {/* Drag Handle */}
                      <div className="p-[0.5rem] text-gray-300 group-hover:text-primary cursor-grab active:cursor-grabbing transition-colors">
                        <GripVertical size={20} />
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </div>

          <div className="p-[1.5rem] bg-gray-50/50 border-t border-gray-50 flex justify-between items-center text-[0.75rem] font-bold text-gray-400">
            <div className="flex items-center gap-[0.5rem]">
              <div className="w-[0.5rem] h-[0.5rem] bg-secondary rounded-full animate-pulse" />
              PRIORITY ENGINE ACTIVE
            </div>
            <span>ORDER ID: CAT-SEQ-X1</span>
          </div>
        </div>
      </motion.div>

      {/* --- FOOTER HINT --- */}
      <div className="mt-[3rem] text-center">
        <p className="text-[0.8125rem] text-gray-400 font-medium">
          Note: Changes won't take effect on the storefront until you click <span className="text-primary font-black uppercase">Save Sequence</span>.
        </p>
      </div>
    </div>
  );
}