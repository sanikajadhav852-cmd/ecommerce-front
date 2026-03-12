import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import Loader from '../components/Loader';
import { AlertCircle, ArrowRight, ChevronDown, Sprout, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await api.get('/categories');
        const activeCategories = (res.data.categories || []).filter(cat => cat.status === 1);
        setCategories(activeCategories);
      } catch (err) {
        setError('We couldn’t load the spice collections. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader /></div>;

  return (
    <div className="min-h-screen bg-[#FCFBFA] pb-20">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-orange-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6"
          >
            <Sparkles size={16} className="text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Explore Our Pantry</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-black text-gray-900 mb-6 tracking-tight"
          >
            The <span className="text-orange-600 italic">Spice</span> Library
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Browse our meticulously sourced collections. From sun-dried chillies to hand-ground masalas, find the soul of Indian cooking here.
          </motion.p>
        </div>
      </section>

      {/* --- CATEGORY GRID --- */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-orange-100 transition-all duration-500 overflow-hidden"
            >
              {/* Image Container with Overlay */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={`${IMAGE_BASE_URL}${cat.image || cat.banner || '/placeholder.jpg'}`}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Float Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold">
                   {cat.subcategories?.length || 0} Varieties
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-200 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex gap-3">
                    <Link
                      to={`/category/${cat.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20"
                    >
                      Shop Now <ShoppingBag size={18} />
                    </Link>
                    {cat.subcategories?.length > 0 && (
                      <button 
                        onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                        className="w-14 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl hover:bg-white/40 transition-all"
                      >
                        <ChevronDown size={20} className={`transition-transform duration-300 ${expandedCategory === cat.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Subcategories - App Style */}
              <AnimatePresence>
                {expandedCategory === cat.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-orange-50/50"
                  >
                    <div className="p-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-4">Select Variety</p>
                      <div className="grid grid-cols-1 gap-2">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.id}`}
                            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all group/sub"
                          >
                            {sub.name}
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center opacity-0 group-hover/sub:opacity-100 transition-all">
                              <ArrowRight size={14} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <section className="mt-32 max-w-5xl mx-auto px-6">
        <div className="bg-gray-900 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-400 mb-8">Our master blenders can create custom spice mixes for bulk orders.</p>
          <button className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all">
            Contact Specialist
          </button>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;600;700;900&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
      `}</style>
    </div>
  );
}