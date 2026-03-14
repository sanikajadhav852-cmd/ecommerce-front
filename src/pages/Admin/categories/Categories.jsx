import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, Upload, MoreVertical, RotateCcw, 
  X, CheckCircle, AlertCircle, Image as ImageIcon,
  Download, Grid, List, Edit, Trash2, ChevronRight, Layers, Layout, 
  Settings, Activity, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../lib/api.js';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', parent: '' });
  const [categoryType, setCategoryType] = useState('main');

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [mainSelectedMediaId, setMainSelectedMediaId] = useState(null);

  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerSelectedMediaId, setBannerSelectedMediaId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectingFor, setSelectingFor] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setFetching(true);
      const res = await api.get('/categories?include_inactive=true&include_subcategories=false');
      if (res.data.success) {
        setCategories(res.data.categories || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setFeedback({ type: 'error', message: 'Failed to load categories' });
    } finally {
      setTimeout(() => setFetching(false), 800);
    }
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, status: newStatus } : cat
      )
    );

    try {
      await api.put(`/categories/${categoryId}/status`, { status: newStatus });
      setFeedback({
        type: 'success',
        message: `Category ${newStatus === 1 ? 'shown' : 'hidden'} successfully`
      });
    } catch (err) {
      console.error('Status toggle failed:', err);
      setCategories(prev =>
        prev.map(cat =>
          cat.id === categoryId ? { ...cat, status: currentStatus } : cat
        )
      );
      setFeedback({ type: 'error', message: 'Failed to update status' });
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.delete(`/categories/${categoryId}`);
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      setFeedback({ type: 'success', message: 'Category deleted successfully' });
    } catch (err) {
      console.error('Delete failed:', err);
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to delete category'
      });
    }
  };

  const editCategory = (category) => {
    alert(`Edit functionality for "${category.name}" - coming in next update!`);
  };

  useEffect(() => {
    if (showMediaModal) fetchMediaItems();
  }, [showMediaModal]);

  const fetchMediaItems = async () => {
    setMediaLoading(true);
    try {
      const res = await api.get('/media');
      if (res.data.success) {
        setMediaItems(res.data.data.filter(item => 
          item.type?.startsWith('image/') || 
          ['jpg','jpeg','png','webp','gif'].includes(item.extension?.toLowerCase())
        ));
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const openMediaSelector = (forField) => {
    setSelectingFor(forField);
    setShowMediaModal(true);
    setMediaSearch('');
  };

  const selectMediaItem = (item) => {
    const imageUrl = `${baseUrl}/${item.thumbnail || (item.sub_directory + item.name + '.' + item.extension)}`;
    if (selectingFor === 'main') {
      setMainPreview(imageUrl);
      setMainSelectedMediaId(item.id);
      setMainImageFile(null);
    } else if (selectingFor === 'banner') {
      setBannerPreview(imageUrl);
      setBannerSelectedMediaId(item.id);
      setBannerImageFile(null);
    }
    setShowMediaModal(false);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDirectMainUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setMainImageFile(file);
    setMainPreview(URL.createObjectURL(file));
    setMainSelectedMediaId(null);
  };

  const handleDirectBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setBannerImageFile(file);
    setBannerPreview(URL.createObjectURL(file));
    setBannerSelectedMediaId(null);
  };

  const resetForm = () => {
    setFormData({ name: '', parent: '' });
    setCategoryType('main');
    setMainImageFile(null); setMainPreview(null); setMainSelectedMediaId(null);
    setBannerImageFile(null); setBannerPreview(null); setBannerSelectedMediaId(null);
    setFeedback({ type: '', message: '' });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFeedback({ type: 'error', message: 'Category name is required' });
      return;
    }
    if (!mainPreview) {
      setFeedback({ type: 'error', message: 'Main image is required' });
      return;
    }
    if (categoryType === 'sub' && !formData.parent) {
      setFeedback({ type: 'error', message: 'Parent category is required for subcategories' });
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      if (categoryType === 'sub' && formData.parent) {
        payload.append('parent_id', formData.parent);
      }
      if (mainSelectedMediaId) payload.append('mainMediaId', mainSelectedMediaId);
      else if (mainImageFile) payload.append('image', mainImageFile);
      if (bannerSelectedMediaId) payload.append('bannerMediaId', bannerSelectedMediaId);
      else if (bannerImageFile) payload.append('banner', bannerImageFile);

      const response = await api.post('/categories', payload);
      setFeedback({ type: 'success', message: response.data.message || 'Category created!' });
      resetForm();
      fetchCategories();
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed' });
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Layers size={16} className="text-primary animate-pulse" />
            <span>Catalog Architecture v4.0</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Category Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <Activity size={18} /> Network Integrity: 100%
          </div>
          <button 
            onClick={fetchCategories}
            className="p-4 text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-background-site dark:hover:bg-slate-800 rounded-2xl transition-all"
          >
            <RefreshCw size={22} className={fetching ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* --- FORM PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-8 transition-all group">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-background-site/30 dark:bg-slate-950/30 flex items-center gap-6">
                <div className="p-4 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20">
                    <Layout size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Identity Forge</h2>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mt-1">Node Construction</p>
                </div>
            </div>

            <form onSubmit={handleAddCategory} className="p-12 space-y-10">
              {/* Category Type Toggle */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                  Topological Protocol
                </label>
                <div className="grid grid-cols-2 gap-4 p-2 bg-background-site dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-inner">
                  <button
                    type="button"
                    onClick={() => setCategoryType('main')}
                    className={`py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      categoryType === 'main' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 dark:text-slate-600 hover:text-primary'
                    }`}
                  >
                    Main Nexus
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryType('sub')}
                    className={`py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      categoryType === 'sub' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 dark:text-slate-600 hover:text-primary'
                    }`}
                  >
                    Sub Node
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                    Identity Label
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleTextChange}
                    placeholder="Registry Name..."
                    className="w-full bg-background-site dark:bg-slate-100/5 border-2 border-transparent focus:border-primary/20 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner"
                    required
                  />
                </div>

                {categoryType === 'sub' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                      Origin Nexus
                    </label>
                    <div className="relative group/select">
                        <select
                        name="parent"
                        value={formData.parent}
                        onChange={handleTextChange}
                        className="w-full bg-background-site dark:bg-slate-100/5 border-2 border-transparent focus:border-primary/20 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none transition-all appearance-none cursor-pointer shadow-inner"
                        required
                        >
                        <option value="">Select Origin...</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/select:text-primary transition-colors pointer-events-none rotate-90" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Image Uploads */}
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                    Primary Visual Descriptor
                  </label>
                  {mainPreview ? (
                    <div className="relative group rounded-[3rem] overflow-hidden border-4 border-primary/20 bg-background-site dark:bg-slate-950 aspect-video flex items-center justify-center p-4 shadow-2xl">
                      <img src={mainPreview} alt="Descriptor" className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                      <button 
                        type="button" 
                        onClick={() => { setMainPreview(null); setMainImageFile(null); setMainSelectedMediaId(null); }}
                        className="absolute top-6 right-6 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-rose-600 rounded-2xl shadow-xl hover:scale-110 transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <button type="button" onClick={() => openMediaSelector('main')} className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-background-site/50 dark:bg-slate-950/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all group">
                        <ImageIcon size={32} className="text-slate-200 dark:text-slate-800 group-hover:text-primary transition-all duration-500 mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">Vault</span>
                      </button>
                      <label className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-background-site/50 dark:bg-slate-950/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 cursor-pointer transition-all group">
                        <Upload size={32} className="text-slate-200 dark:text-slate-800 group-hover:text-primary transition-all duration-500 mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">Upload</span>
                        <input type="file" accept="image/*" onChange={handleDirectMainUpload} className="hidden" />
                      </label>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
                    Panoramic Buffer (Optional)
                  </label>
                  {bannerPreview ? (
                    <div className="relative group rounded-[3rem] overflow-hidden border-4 border-primary/20 bg-background-site dark:bg-slate-950 aspect-[21/9] flex items-center justify-center p-4 shadow-2xl">
                      <img src={bannerPreview} alt="Banner" className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                      <button 
                        type="button" 
                        onClick={() => { setBannerPreview(null); setBannerImageFile(null); setBannerSelectedMediaId(null); }}
                        className="absolute top-6 right-6 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-rose-600 rounded-2xl shadow-xl hover:scale-110 transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <button type="button" onClick={() => openMediaSelector('banner')} className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-background-site/50 dark:bg-slate-950/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all group">
                        <ImageIcon size={32} className="text-slate-200 dark:text-slate-800 group-hover:text-primary transition-all duration-500 mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">Vault</span>
                      </button>
                      <label className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-background-site/50 dark:bg-slate-950/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 cursor-pointer transition-all group">
                        <Upload size={32} className="text-slate-200 dark:text-slate-800 group-hover:text-primary transition-all duration-500 mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">Upload</span>
                        <input type="file" accept="image/*" onChange={handleDirectBannerUpload} className="hidden" />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Message */}
              <AnimatePresence>
                {feedback.message && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`p-6 rounded-[2rem] flex items-center gap-4 text-[10px] font-black uppercase tracking-widest ${
                      feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/10'
                    }`}
                  >
                    {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-6 pt-10">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-6 bg-background-site dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-400 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                >
                  Clear Node
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-6 bg-primary text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 hover:bg-black dark:hover:bg-primary-dark transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-4"
                >
                  {loading ? <RotateCcw size={18} className="animate-spin" /> : 'Deploy Node'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* --- LIST PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group transition-all">
            {/* Table Search & Tools */}
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-8 bg-background-site/20 dark:bg-slate-950/20">
              <div className="relative group/search w-full">
                <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Scan Registry Map..."
                  className="w-full pl-16 pr-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
                />
              </div>
              
              <div className="flex bg-background-site dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shrink-0">
                 <button className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 transition-all"><List size={18} /></button>
                 <button className="p-4 text-slate-400 hover:text-primary rounded-2xl transition-all"><Grid size={18} /></button>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto min-h-[600px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/50">
                    <th className="px-12 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Nexus Core</th>
                    <th className="px-12 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] hidden xl:table-cell">Topology</th>
                    <th className="px-12 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] text-center">State</th>
                    <th className="px-12 py-8 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] text-right">Ops</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                  {fetching ? (
                    <tr>
                      <td colSpan="4" className="py-60 text-center">
                        <div className="relative inline-block">
                           <RotateCcw size={80} className="text-primary opacity-10 animate-spin" />
                        </div>
                        <p className="mt-10 text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 animate-pulse">Synchronizing Core Registry...</p>
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-60 text-center opacity-10">
                        <Layers size={120} className="mx-auto mb-10" />
                        <p className="text-4xl font-black uppercase tracking-[0.6em]">Registry Void</p>
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat, idx) => (
                      <motion.tr 
                        key={cat.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="group hover:bg-background-site/30 dark:hover:bg-slate-800/30 transition-all duration-500"
                      >
                        <td className="px-12 py-8">
                          <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-white dark:border-slate-800 bg-background-site dark:bg-slate-950 group-hover:border-primary/20 transition-all duration-700 shadow-xl group-hover:shadow-2xl flex items-center justify-center p-2">
                              <img 
                                src={`${baseUrl}${cat.image}`} 
                                alt="" 
                                className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000"
                                onError={e => e.target.src = 'https://placehold.co/100x100?text=VOID'}
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-lg font-black text-text-pri dark:text-white leading-tight uppercase tracking-tight">{cat.name}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">ID:</span>
                                <code className="text-[9px] text-primary font-mono tracking-tighter bg-primary/5 dark:bg-primary-light/5 px-3 py-1 rounded-[0.75rem] border border-primary/10">{cat.id}</code>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-8 hidden xl:table-cell">
                          {cat.parent_id ? (
                            <span className="inline-flex items-center gap-3 px-6 py-2 bg-amber-500/10 text-amber-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/10">
                              <Layers size={14} /> Subordinate Node
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary dark:text-primary-light rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/10">
                              <Shield size={14} /> Core Origin
                            </span>
                          )}
                        </td>
                        <td className="px-12 py-8 text-center">
                          <button 
                            onClick={() => toggleCategoryStatus(cat.id, cat.status)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ring-offset-4 dark:ring-offset-slate-950 focus:ring-4 focus:ring-primary/20 outline-none group/toggle ${
                              cat.status === 1 ? 'bg-emerald-500 shadow-xl shadow-emerald-500/30' : 'bg-slate-200 dark:bg-slate-800'
                            }`}
                          >
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all shadow-2xl ${
                              cat.status === 1 ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </button>
                        </td>
                        <td className="px-12 py-8 text-right relative">
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === cat.id ? null : cat.id)}
                            className="w-12 h-12 inline-flex items-center justify-center text-slate-300 hover:text-primary bg-background-site/50 dark:bg-slate-950/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                          >
                            <MoreVertical size={22} />
                          </button>
                          
                          <AnimatePresence>
                            {openMenuId === cat.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-12 mt-4 w-56 bg-surface dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-4 z-50 overflow-hidden ring-8 ring-black/5"
                              >
                                <button onClick={() => { editCategory(cat); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-text-pri dark:text-slate-300 hover:bg-background-site dark:hover:bg-slate-950 rounded-2xl transition-all">
                                  <Edit size={16} className="text-primary" /> Modify Segment
                                </button>
                                <div className="h-px bg-slate-50 dark:bg-slate-800 my-2" />
                                <button onClick={() => { deleteCategory(cat.id); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-2xl transition-all">
                                  <Trash2 size={16} /> Destruct Node
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <footer className="p-12 bg-background-site/30 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 dark:text-slate-700 flex justify-between items-center tracking-[0.5em] uppercase">
              <span className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                INTELLIGENT TOPOLOGY ACTIVE
              </span>
              <span>REGISTRY NODES: {categories.length}</span>
            </footer>
          </div>
        </motion.div>
      </div>

      {/* --- MEDIA MODAL --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl transition-all duration-500 overflow-hidden">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-surface dark:bg-slate-900 rounded-[5rem] shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-16 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-surface dark:bg-slate-900 relative">
                <div className="absolute top-0 left-16 w-40 h-1 bg-primary" />
                <div className="space-y-3">
                  <h3 className="text-4xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Asset Vault</h3>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">Select Cluster Descriptor</p>
                </div>
                <button 
                  onClick={() => setShowMediaModal(false)} 
                  className="p-6 bg-background-site dark:bg-slate-950 text-slate-300 hover:text-rose-600 rounded-[2.5rem] transition-all hover:rotate-90 active:scale-90 border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  <X size={32}/>
                </button>
              </div>

              <div className="px-16 py-10 bg-surface dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="relative group/search">
                  <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-colors" size={28} />
                  <input 
                    type="text" 
                    placeholder="Scan file matrix..." 
                    value={mediaSearch} 
                    onChange={e => setMediaSearch(e.target.value)}
                    className="w-full pl-24 pr-12 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[3rem] text-lg font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 shadow-inner" 
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-16 bg-surface dark:bg-slate-900 custom-scrollbar">
                {mediaLoading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-10">
                    <div className="relative">
                       <RotateCcw size={100} className="animate-spin text-primary opacity-10" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 animate-pulse text-center">Decrypting Files...</p>
                  </div>
                ) : filteredMedia.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-10 py-40">
                    <ImageIcon size={160} />
                    <p className="text-4xl font-black uppercase tracking-[0.8em]">Vault Empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
                    {filteredMedia.map(item => {
                      const imageUrl = item.thumbnail || `${item.sub_directory}/${item.name}.${item.extension}`;
                      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                      const isSelected = (selectingFor === 'main' && mainSelectedMediaId === item.id) || (selectingFor === 'banner' && bannerSelectedMediaId === item.id);

                      return (
                        <div 
                          key={item.id}
                          onClick={() => selectMediaItem(item)}
                          className={`relative aspect-square cursor-pointer rounded-[3rem] overflow-hidden border-8 transition-all duration-700 hover:-translate-y-4 ${
                            isSelected ? 'border-primary ring-[12px] ring-primary/20 scale-95 shadow-2xl ring-offset-8 dark:ring-offset-slate-900' : 'border-white dark:border-slate-800 shadow-sm hover:shadow-2xl'
                          }`}
                        >
                          <img src={fullUrl} alt={item.name} className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-125" />
                          <div className={`absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                             <div className="bg-white text-primary p-6 rounded-[2rem] shadow-2xl animate-in zoom-in-50">
                                <CheckCircle size={40} />
                             </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-[9px] font-black truncate uppercase tracking-widest text-center">{item.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <footer className="p-16 border-t border-slate-100 dark:border-slate-800 bg-surface dark:bg-slate-900 flex justify-end gap-10">
                <button onClick={() => setShowMediaModal(false)} className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] hover:bg-background-site dark:hover:bg-slate-950 rounded-[2rem] transition-all border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800">Abort</button>
                <button onClick={() => setShowMediaModal(false)} className="px-16 py-6 bg-primary text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/30 hover:bg-black active:scale-95">Verify Registry</button>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}