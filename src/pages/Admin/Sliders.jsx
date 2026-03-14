// src/pages/admin/Sliders.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, Minus, X, CheckCircle, 
  Image as ImageIcon, RotateCcw , ChevronRight, Zap, Play, Settings, Loader2, Trash2 
} from 'lucide-react';
import api from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sliders() {
  const [sliders, setSliders] = useState([]);          
  const [liveSliders, setLiveSliders] = useState([]);  
  const [sliderCount, setSliderCount] = useState(3);   
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [countLoading, setCountLoading] = useState(true);

  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSliderCount();
    fetchExistingSliders();   
    fetchLiveSliders();       
  }, []);

  const fetchSliderCount = async () => {
    try {
      setCountLoading(true);
      const res = await api.get('/admin/settings/slider-count');
      setSliderCount(res.data.slider_count || 3);
    } catch (err) {
      console.error('Failed to load slider count:', err);
    } finally {
      setCountLoading(false);
    }
  };

  const updateSliderCount = async (newCount) => {
    if (newCount < 1 || newCount > 10) return;
    try {
      await api.put('/admin/settings/slider-count', { slider_count: newCount });
      setSliderCount(newCount);
      fetchLiveSliders(); 
    } catch (err) {
      alert('Failed to update slider count');
    }
  };

  const fetchExistingSliders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/sliders');
      const loaded = res.data.sliders.map(slider => ({
        mediaId: null, 
        preview: slider.image_url || 'https://via.placeholder.com/128?text=No+Preview'
      }));
      setSliders(loaded.slice(0, sliderCount));
    } catch (err) {
      console.error('Failed to load existing sliders:', err);
      setError('Failed to load your current slider selection');
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveSliders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/sliders');
      const loaded = res.data.sliders.map(slider => ({
        ...slider,
        image_url: slider.image_url || 'https://via.placeholder.com/160x96?text=No+Image'
      }));
      setLiveSliders(loaded);
    } catch (err) {
      console.error('Failed to load live sliders:', err);
      setError('Failed to load current home page sliders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showMediaModal) {
      fetchMediaItems();
    }
  }, [showMediaModal]);

  const fetchMediaItems = async () => {
    setMediaLoading(true);
    try {
      const res = await api.get('/media');
      if (res.data.success) {
        const imagesOnly = res.data.data.filter(item => 
          item.type?.startsWith('image/') || 
          ['jpg','jpeg','png','webp','gif'].includes(item.extension?.toLowerCase())
        );
        setMediaItems(imagesOnly);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const openMediaSelector = () => {
    if (sliders.length >= sliderCount) {
      alert(`Capacity reached (${sliderCount}).`);
      return;
    }
    setShowMediaModal(true);
    setMediaSearch('');
  };

  const selectMediaItem = (item) => {
    const idValue = item.id || item._id || item.media_id || item.MediaID || item.ID || null;
    const mediaId = Number(idValue);

    if (isNaN(mediaId) || mediaId <= 0) {
      alert('Invalid Media Node Interface.');
      return;
    }

    let previewPath = '';
    if (item.thumbnail) previewPath = item.thumbnail;
    else if (item.sub_directory && item.name) {
      previewPath = `/${item.sub_directory.replace(/^\/+/, '')}${item.name}${item.extension ? '.' + item.extension : ''}`;
    } else if (item.path) {
      previewPath = item.path;
    }

    const fullPreview = previewPath.startsWith('http')
      ? previewPath
      : `${baseUrl}/${previewPath.replace(/^\/+/, '')}`;

    setSliders(prev => [
      ...prev,
      { mediaId, preview: fullPreview }
    ]);

    setShowMediaModal(false);
  };

  const removeImage = (index) => {
    setSliders(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sliders.length === 0) return;
    setSubmitting(true);
    try {
      const cleanedMediaIds = sliders
        .map(img => Number(img.mediaId))
        .filter(id => !isNaN(id) && id > 0);

      if (cleanedMediaIds.length === 0) {
        alert('Universal data corruption. No valid IDs detected.');
        return;
      }

      await api.post('/admin/sliders', { type: 'default', media_ids: cleanedMediaIds });
      setSliders([]);              
      fetchExistingSliders();      
      fetchLiveSliders();          
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to sync sliders');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Play size={14} className="animate-pulse" />
            <span>Interactive Visual Systems</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Sliders</h1>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span>Home</span> <ChevronRight size={14} className="text-slate-300" /> <span className="text-indigo-600 dark:text-indigo-400">Hero Modules</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">
        
        {/* --- CAPACITY CONTROL NODE --- */}
        <section className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left space-y-3">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                 <Settings size={20} className="text-indigo-600" />
                 Environmental Capacity
              </h3>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="px-4 py-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-indigo-500/20">System Cap: {sliderCount} Units</div>
                  <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-500/20">Active Nodes: {liveSliders.length}</div>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-slate-50 dark:bg-slate-950 p-3 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner">
              <button
                onClick={() => updateSliderCount(sliderCount - 1)}
                disabled={sliderCount <= 1}
                className="w-16 h-16 flex items-center justify-center bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-[1.5rem] shadow-sm hover:text-indigo-600 active:scale-90 disabled:opacity-20 transition-all border border-slate-100 dark:border-slate-800"
              >
                <Minus size={24} />
              </button>
              <span className="text-4xl font-black text-slate-900 dark:text-white w-12 text-center tabular-nums tracking-tighter">
                {sliderCount}
              </span>
              <button
                onClick={() => updateSliderCount(sliderCount + 1)}
                disabled={sliderCount >= 10}
                className="w-16 h-16 flex items-center justify-center bg-indigo-600 text-white rounded-[1.5rem] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-90 disabled:opacity-20 transition-all"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT: Staging Buffer Area */}
          <div className="lg:col-span-4">
            <section className="bg-white dark:bg-slate-900 p-10 rounded-[4rem] shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-600 mb-10 uppercase tracking-[0.3em] flex items-center gap-4">
                <Zap size={18} />
                Staging Matrix 
                <span className="ml-auto text-indigo-600 dark:text-indigo-400">{sliders.length} / {sliderCount}</span>
              </h3>

              <div className="grid grid-cols-1 gap-6 mb-12">
                {sliders.map((img, index) => (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={index} className="group relative aspect-[16/8] rounded-[2rem] overflow-hidden border-4 border-slate-50 dark:border-slate-950 shadow-sm transition-all hover:shadow-2xl hover:scale-[1.02]">
                    <img src={img.preview} alt="Staged" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => removeImage(index)} className="bg-rose-500 text-white p-4 rounded-2xl hover:bg-rose-600 shadow-2xl transition-transform active:scale-90"><Trash2 size={24} /></button>
                    </div>
                  </motion.div>
                ))}

                {sliders.length < sliderCount && (
                  <button
                    type="button"
                    onClick={openMediaSelector}
                    className="aspect-[16/8] border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                  >
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 text-slate-300 dark:text-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:text-indigo-600 transition-colors shadow-inner">
                       <Plus size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 group-hover:text-indigo-400 transition-colors">Append Slide Node</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-6 mt-auto">
                <button onClick={() => setSliders([])} className="w-full py-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-rose-500 transition-all active:scale-95">Purge Matrix</button>
                <button onClick={handleSubmit} disabled={submitting || sliders.length === 0} className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-4">
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
                  Synchronize Live Environment
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT: Live Production Manifest */}
          <div className="lg:col-span-8">
            <section className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden h-full flex flex-col">
              <div className="p-10 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/30 dark:bg-slate-950/30">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                  Home Production View 
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     Live Status
                  </div>
                </h3>
                <button onClick={fetchLiveSliders} className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-600 rounded-[1.25rem] hover:text-indigo-600 transition-all shadow-sm active:scale-90 flex items-center justify-center">
                  <RotateCcw size={24} className={loading ? "animate-spin text-indigo-600" : ""} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 border-b border-slate-50 dark:border-slate-800/50">
                      <th className="p-10">Logic ID</th>
                      <th className="p-10">Asset Identification</th>
                      <th className="p-10 text-center">Home Visualization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
                    {liveSliders.map((slider) => (
                      <tr key={slider.id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-950/30 transition-colors">
                        <td className="p-10 font-black text-indigo-600 dark:text-indigo-400 text-lg tracking-tighter">#{slider.id}</td>
                        <td className="p-10">
                          <div className="flex items-center gap-6">
                            <div className="w-20 h-14 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-500">
                              <img src={slider.image_url} alt="Slider" className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="space-y-1">
                               <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Hero Node</p>
                               <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest truncate max-w-[120px]">{slider.type || 'DEFAULT_LAYER'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-10 text-center">
                           <div className="inline-block relative w-[300px] aspect-[16/8] bg-slate-100 dark:bg-slate-950 p-3 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-inner group-hover:scale-[1.05] transition-transform duration-700 overflow-hidden">
                              <img src={slider.image_url} alt="Live preview" className="w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-8 text-center bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-50 dark:border-slate-800/50">
                 <p className="text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">SYSTEM-INTEGRITY-PROTOCOL-v4.2-STABLE</p>
              </div>
            </section>
          </div>
        </div>

      </main>

      {/* --- ASSET VAULT MODAL --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMediaModal(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-10 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50">
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                         <ImageIcon size={24} className="text-indigo-600" />
                         Slider Vault Access
                      </h3>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">Select high-fidelity visual assets for production</p>
                   </div>
                   <button onClick={() => setShowMediaModal(false)} className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-full flex items-center justify-center transition-all shadow-sm">
                      <X size={28} />
                   </button>
                </div>

                <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 px-10 relative">
                   <Search size={20} className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700" />
                   <input type="text" placeholder="Scan asset dictionary..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} className="w-full pl-20 pr-10 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1rem] font-bold text-slate-900 dark:text-white outline-none transition-all shadow-inner placeholder:text-slate-400" />
                </div>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                   {mediaLoading ? (
                     <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-40">
                        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin" />
                        <p className="text-[11px] font-black uppercase tracking-widest">Hydrating Staging Assets...</p>
                     </div>
                   ) : filteredMedia.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
                        <ImageIcon size={80} strokeWidth={1} />
                        <p className="text-[11px] font-black uppercase tracking-widest">No Matches Identified</p>
                     </div>
                   ) : (
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {filteredMedia.map(item => {
                          const imageUrl = item.thumbnail || `${item.path}${item.name}`;
                          const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                          const isSelected = sliders.some(img => img.mediaId === item.id);
                          return (
                            <motion.div key={item.id} whileHover={{ scale: 1.05 }} onClick={() => selectMediaItem(item)} className={`relative aspect-square cursor-pointer rounded-[2rem] overflow-hidden border-4 transition-all duration-300 shadow-sm ${isSelected ? 'border-indigo-600 ring-8 ring-indigo-500/10 shadow-2xl z-10' : 'border-white dark:border-slate-800 grayscale hover:grayscale-0'}`}>
                               <img src={fullUrl} alt={item.name} className="w-full h-full object-cover" />
                               {isSelected && (
                                 <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-white text-indigo-600 p-3 rounded-full shadow-2xl scale-110 animate-in zoom-in-0 duration-500">
                                       <CheckCircle size={32} />
                                    </div>
                                 </div>
                               )}
                               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                                  <p className="text-white text-[9px] font-black uppercase tracking-widest truncate">{item.name}</p>
                               </div>
                            </motion.div>
                          );
                        })}
                     </div>
                   )}
                </div>

                <div className="p-10 border-t border-slate-50 dark:border-slate-800/50 flex justify-end gap-6 bg-slate-50/30 dark:bg-slate-950/30">
                   <button onClick={() => setShowMediaModal(false)} className="px-14 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all">Resolve Matrix</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}