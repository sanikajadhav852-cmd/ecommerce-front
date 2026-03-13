import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, Upload, MoreVertical, RotateCcw, 
  X, CheckCircle, AlertCircle, Image as ImageIcon,
  Download, Grid, List, Edit, Trash2, ChevronRight, Layers, Layout
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
      setFetching(false);
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
    <div className="min-h-screen bg-[#F8FAFC] p-[1.5rem] md:p-[2rem]">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[1rem] mb-[2rem]">
        <div className="space-y-[0.25rem]">
          <h1 className="text-[1.875rem] font-black text-gray-900 tracking-tight flex items-center gap-[0.75rem]">
            <Layers className="text-primary" size={28} />
            Categories
          </h1>
          <div className="flex items-center gap-[0.5rem] text-[0.875rem] text-gray-500 font-medium">
            <span>Admin</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-primary-light">Catalog Management</span>
          </div>
        </div>
        
        <div className="flex items-center gap-[0.75rem] bg-white p-[0.5rem] rounded-[1rem] shadow-sm border border-gray-100">
          <button 
            onClick={fetchCategories}
            className="p-[0.5rem] text-gray-400 hover:text-primary hover:bg-primary-light/10 rounded-[0.75rem] transition-all"
          >
            <RefreshCw size={20} className={fetching ? 'animate-spin' : ''} />
          </button>
          <div className="w-[1px] h-[1.5rem] bg-gray-100" />
          <button className="flex items-center gap-[0.5rem] px-[1rem] py-[0.5rem] bg-gray-900 text-white rounded-[0.75rem] font-bold text-[0.875rem] hover:bg-black transition-all">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2rem]">
        {/* --- FORM PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4"
        >
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden sticky top-[2rem]">
            <div className="p-[1.5rem] border-b border-gray-50 bg-gray-50/50">
              <h3 className="text-[1.125rem] font-bold text-gray-800 flex items-center gap-[0.5rem]">
                <Layout size={20} className="text-primary" />
                Add New Category
              </h3>
            </div>

            <form onSubmit={handleAddCategory} className="p-[1.5rem] space-y-[1.5rem]">
              {/* Category Type Toggle */}
              <div>
                <label className="block text-[0.75rem] font-black text-gray-400 uppercase tracking-widest mb-[1rem]">
                  Type Configuration
                </label>
                <div className="grid grid-cols-2 gap-[0.75rem] p-[0.25rem] bg-gray-100 rounded-[1rem]">
                  <button
                    type="button"
                    onClick={() => setCategoryType('main')}
                    className={`py-[0.75rem] rounded-[0.875rem] text-[0.875rem] font-bold transition-all ${
                      categoryType === 'main' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Main
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryType('sub')}
                    className={`py-[0.75rem] rounded-[0.875rem] text-[0.875rem] font-bold transition-all ${
                      categoryType === 'sub' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Subcategory
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-[1.25rem]">
                <div>
                  <label className="block text-[0.75rem] font-black text-gray-400 uppercase tracking-widest mb-[0.5rem]">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleTextChange}
                    placeholder="e.g. Organic Spices"
                    className="w-full bg-gray-50 border border-transparent rounded-[1rem] px-[1.25rem] py-[0.875rem] text-[0.9375rem] font-medium focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    required
                  />
                </div>

                {categoryType === 'sub' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                    <label className="block text-[0.75rem] font-black text-gray-400 uppercase tracking-widest mb-[0.5rem]">
                      Parent Category
                    </label>
                    <select
                      name="parent"
                      value={formData.parent}
                      onChange={handleTextChange}
                      className="w-full bg-gray-50 border border-transparent rounded-[1rem] px-[1.25rem] py-[0.875rem] text-[0.9375rem] font-medium focus:bg-white focus:border-primary/30 transition-all outline-none appearance-none"
                      required
                    >
                      <option value="">Select a parent...</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </motion.div>
                )}
              </div>

              {/* Image Uploads */}
              <div className="grid grid-cols-1 gap-[1.5rem]">
                <div>
                  <label className="block text-[0.75rem] font-black text-gray-400 uppercase tracking-widest mb-[0.75rem]">
                    Main Icon
                  </label>
                  {mainPreview ? (
                    <div className="relative group rounded-[1.25rem] overflow-hidden border-2 border-primary/20 bg-primary/5">
                      <img src={mainPreview} alt="Icon" className="w-full h-[10rem] object-cover" />
                      <button 
                        type="button" 
                        onClick={() => { setMainPreview(null); setMainImageFile(null); setMainSelectedMediaId(null); }}
                        className="absolute top-[0.75rem] right-[0.75rem] p-[0.5rem] bg-white/90 backdrop-blur text-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-[0.75rem]">
                      <button type="button" onClick={() => openMediaSelector('main')} className="flex flex-col items-center justify-center p-[1rem] border-2 border-dashed border-gray-100 rounded-[1.25rem] bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all group">
                        <ImageIcon size={24} className="text-gray-300 group-hover:text-primary mb-[0.5rem]" />
                        <span className="text-[0.75rem] font-bold text-gray-500 group-hover:text-primary">Library</span>
                      </button>
                      <label className="flex flex-col items-center justify-center p-[1rem] border-2 border-dashed border-gray-100 rounded-[1.25rem] bg-gray-50/50 hover:bg-white hover:border-primary/30 cursor-pointer transition-all group">
                        <Upload size={24} className="text-gray-300 group-hover:text-primary mb-[0.5rem]" />
                        <span className="text-[0.75rem] font-bold text-gray-500 group-hover:text-primary">Upload</span>
                        <input type="file" accept="image/*" onChange={handleDirectMainUpload} className="hidden" />
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[0.75rem] font-black text-gray-400 uppercase tracking-widest mb-[0.75rem]">
                    Banner Image (Optional)
                  </label>
                  {bannerPreview ? (
                    <div className="relative group rounded-[1.25rem] overflow-hidden border-2 border-primary/20 bg-primary/5">
                      <img src={bannerPreview} alt="Banner" className="w-full h-[10rem] object-cover" />
                      <button 
                        type="button" 
                        onClick={() => { setBannerPreview(null); setBannerImageFile(null); setBannerSelectedMediaId(null); }}
                        className="absolute top-[0.75rem] right-[0.75rem] p-[0.5rem] bg-white/90 backdrop-blur text-red-500 rounded-full shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-[0.75rem]">
                      <button type="button" onClick={() => openMediaSelector('banner')} className="flex flex-col items-center justify-center p-[1rem] border-2 border-dashed border-gray-100 rounded-[1.25rem] bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all group">
                        <ImageIcon size={24} className="text-gray-300 group-hover:text-primary mb-[0.5rem]" />
                        <span className="text-[0.75rem] font-bold text-gray-500 group-hover:text-primary">Library</span>
                      </button>
                      <label className="flex flex-col items-center justify-center p-[1rem] border-2 border-dashed border-gray-100 rounded-[1.25rem] bg-gray-50/50 hover:bg-white hover:border-primary/30 cursor-pointer transition-all group">
                        <Upload size={24} className="text-gray-300 group-hover:text-primary mb-[0.5rem]" />
                        <span className="text-[0.75rem] font-bold text-gray-500 group-hover:text-primary">Upload</span>
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
                    className={`p-[1rem] rounded-[1rem] flex items-center gap-[0.75rem] text-[0.875rem] font-bold ${
                      feedback.type === 'success' ? 'bg-secondary/10 text-secondary' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {feedback.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-[1rem] pt-[1rem]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-[1.5rem] py-[1rem] bg-gray-100 text-gray-600 rounded-[1.125rem] font-black text-[0.875rem] hover:bg-gray-200 transition-all"
                >
                  RESET
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-[1.5rem] py-[1rem] bg-primary text-white rounded-[1.125rem] font-black text-[0.875rem] shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
                >
                  {loading ? 'ADDING...' : 'ADD CATEGORY'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* --- LIST PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8"
        >
          <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            {/* Table Search & Tools */}
            <div className="p-[1.25rem] md:p-[1.5rem] border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-[1rem]">
              <div className="relative w-full md:w-[20rem]">
                <Search size={18} className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Quick search categories..."
                  className="w-full pl-[2.75rem] pr-[1rem] py-[0.75rem] bg-gray-50 border-none rounded-[1rem] text-[0.875rem] font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              
              <div className="flex items-center gap-[0.5rem] p-[0.25rem] bg-gray-50 rounded-[0.75rem] border border-gray-100">
                <button className="p-[0.5rem] bg-white text-primary rounded-[0.5rem] shadow-sm"><List size={18} /></button>
                <button className="p-[0.5rem] text-gray-400 hover:text-gray-600"><Grid size={18} /></button>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FBFBFF]">
                  <tr>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Details</th>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {fetching ? (
                    <tr>
                      <td colSpan="4" className="py-[10rem] text-center">
                        <div className="inline-flex flex-col items-center gap-[1rem]">
                          <RotateCcw size={40} className="text-primary/20 animate-spin" />
                          <span className="text-[0.875rem] font-bold text-gray-400">Syncing with server...</span>
                        </div>
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-[10rem] text-center">
                        <div className="inline-flex flex-col items-center gap-[1rem]">
                          <div className="w-[4rem] h-[4rem] bg-gray-50 rounded-full flex items-center justify-center">
                            <Layers size={30} className="text-gray-200" />
                          </div>
                          <span className="text-[1rem] font-bold text-gray-400">Library is empty</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat, idx) => (
                      <motion.tr 
                        key={cat.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-primary/[0.01] transition-colors"
                      >
                        <td className="px-[1.5rem] py-[1.25rem]">
                          <div className="flex items-center gap-[1rem]">
                            <div className="w-[3.5rem] h-[3.5rem] rounded-[1rem] overflow-hidden border border-gray-100 bg-white group-hover:scale-105 transition-transform duration-300">
                              <img 
                                src={`${baseUrl}${cat.image}`} 
                                alt="" 
                                className="w-full h-full object-cover"
                                onError={e => e.target.src = 'https://placehold.co/100x100?text=No+Img'}
                              />
                            </div>
                            <div>
                              <p className="font-black text-gray-900 leading-tight mb-[0.125rem]">{cat.name}</p>
                              <code className="text-[0.6875rem] text-gray-400 font-mono tracking-tighter bg-gray-50 px-[0.375rem] py-[0.125rem] rounded">ID {cat.id}</code>
                            </div>
                          </div>
                        </td>
                        <td className="px-[1.5rem] py-[1.25rem] hidden md:table-cell">
                          {cat.parent_id ? (
                            <div className="inline-flex items-center gap-[0.375rem] px-[0.625rem] py-[0.25rem] bg-orange-50 text-orange-600 rounded-[0.5rem] text-[0.75rem] font-bold">
                              <Layers size={12} /> Sub-category
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-[0.375rem] px-[0.625rem] py-[0.25rem] bg-primary-light/10 text-primary rounded-[0.5rem] text-[0.75rem] font-bold">
                              <Layout size={12} /> Root Category
                            </div>
                          )}
                        </td>
                        <td className="px-[1.5rem] py-[1.25rem] text-center">
                          <button 
                            onClick={() => toggleCategoryStatus(cat.id, cat.status)}
                            className={`relative inline-flex h-[1.375rem] w-[2.75rem] items-center rounded-full transition-all ring-offset-2 focus:ring-2 focus:ring-primary/20 ${
                              cat.status === 1 ? 'bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block w-[1rem] h-[1rem] transform rounded-full bg-white transition-all shadow-md ${
                              cat.status === 1 ? 'translate-x-[1.5rem]' : 'translate-x-[0.25rem]'
                            }`} />
                          </button>
                        </td>
                        <td className="px-[1.5rem] py-[1.25rem] text-right relative">
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === cat.id ? null : cat.id)}
                            className="w-[2.25rem] h-[2.25rem] inline-flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-[0.75rem] transition-all"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          <AnimatePresence>
                            {openMenuId === cat.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-[1.5rem] mt-[0.5rem] w-[11rem] bg-white rounded-[1rem] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-gray-100 p-[0.375rem] z-30"
                              >
                                <button onClick={() => { editCategory(cat); setOpenMenuId(null); }} className="w-full flex items-center gap-[0.625rem] px-[0.75rem] py-[0.625rem] text-[0.8125rem] font-bold text-gray-700 hover:bg-gray-50 rounded-[0.625rem] transition-all">
                                  <Edit size={16} className="text-primary-light" /> Edit Category
                                </button>
                                <div className="h-[1px] bg-gray-50 my-[0.25rem]" />
                                <button onClick={() => { deleteCategory(cat.id); setOpenMenuId(null); }} className="w-full flex items-center gap-[0.625rem] px-[0.75rem] py-[0.625rem] text-[0.8125rem] font-bold text-red-600 hover:bg-red-50 rounded-[0.625rem] transition-all">
                                  <Trash2 size={16} /> Mark Deletion
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
            
            <div className="p-[1rem] md:p-[1.5rem] bg-gray-50/50 border-t border-gray-50 text-[0.75rem] font-bold text-gray-400 flex justify-between items-center">
              <span>ACTIVE CLUSTER: IND-WEST-1</span>
              <span>TOTAL ITEMS: {categories.length}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- MEDIA MODAL (Glassmorphism) --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[1rem] md:p-[2rem]">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowMediaModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-[65rem] max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-[1.5rem] border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-[1.25rem] font-black text-gray-900 leading-tight">Media Library</h3>
                  <p className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest mt-1">Select assets for {selectingFor === 'main' ? 'Icon' : 'Banner'}</p>
                </div>
                <button onClick={() => setShowMediaModal(false)} className="w-[3rem] h-[3rem] flex items-center justify-center bg-gray-50 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                  <X size={24} />
                </button>
              </div>

              <div className="p-[1.25rem] bg-white border-b border-gray-50">
                <div className="relative group">
                  <Search className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Filter by filename..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-[3.25rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[0.9375rem] font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-[1.5rem] bg-gray-50/30">
                {mediaLoading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-[1rem]">
                    <div className="w-[4rem] h-[4rem] border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-[0.875rem] font-bold text-gray-400">Indexing assets...</p>
                  </div>
                ) : filteredMedia.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon size={64} className="mb-[1.5rem] opacity-20" />
                    <p className="text-[1.125rem] font-black">{mediaSearch ? 'No matches found' : 'Vault is empty'}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[1.25rem]">
                    {filteredMedia.map(item => {
                      const imageUrl = item.thumbnail || `${item.sub_directory}/${item.name}.${item.extension}`;
                      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                      const isSelected = (selectingFor === 'main' && mainSelectedMediaId === item.id) || (selectingFor === 'banner' && bannerSelectedMediaId === item.id);

                      return (
                        <motion.div 
                          key={item.id}
                          whileHover={{ y: -5 }}
                          onClick={() => selectMediaItem(item)}
                          className={`relative aspect-square cursor-pointer rounded-[1.5rem] overflow-hidden border-4 transition-all ${
                            isSelected ? 'border-primary shadow-xl ring-4 ring-primary/20 scale-95' : 'border-white shadow-sm hover:shadow-lg'
                          }`}
                        >
                          <img src={fullUrl} alt={item.name} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 bg-primary/60 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                            <CheckCircle size={40} className="text-white drop-shadow-lg" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-[0.75rem] bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-[0.625rem] font-black truncate uppercase tracking-widest">{item.name}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-[1.5rem] border-t border-gray-100 bg-white flex justify-end gap-[1rem]">
                <button onClick={() => setShowMediaModal(false)} className="px-[1.5rem] py-[0.875rem] font-black text-[0.8125rem] text-gray-500 hover:text-gray-900 transition-all">DISCARD</button>
                <button onClick={() => setShowMediaModal(false)} className="px-[1.5rem] py-[0.875rem] bg-primary text-white rounded-[1rem] font-black text-[0.8125rem] shadow-lg shadow-primary/20">SELECT ASSET</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}