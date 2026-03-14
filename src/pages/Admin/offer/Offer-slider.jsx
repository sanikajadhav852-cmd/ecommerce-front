// src/pages/admin/OfferSlider.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Upload, Trash2, X, Plus , CheckCircle, Image as ImageIcon, RotateCcw, ArrowUp, ArrowDown 
} from 'lucide-react';
import api from '../../../lib/api';

export default function OfferSlider() {
  const [sliderSections, setSliderSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    style: '',
    selectedMedia: [] // array of {id, preview}
  });

  // Modal states
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSliderSections();
  }, []);

  const fetchSliderSections = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/offer-sliders');
      setSliderSections(res.data.sliders || []);
    } catch (err) {
      console.error('Failed to fetch slider sections:', err.response?.data || err);
      setSliderSections([]); 
    } finally {
      setTimeout(() => setLoading(false), 600);
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
      console.error(err);
    } finally {
      setMediaLoading(false);
    }
  };

  const openMediaSelector = () => setShowMediaModal(true);

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${item.path}${item.name}`;
    const fullUrl = imageUrl.startsWith('http')
      ? imageUrl
      : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;

    if (formData.selectedMedia.some(m => m.id === item.id)) return;

    setFormData(prev => ({
      ...prev,
      selectedMedia: [...prev.selectedMedia, { id: item.id, preview: fullUrl }]
    }));
  };

  const removeSelected = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedMedia: prev.selectedMedia.filter(m => m.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.style || formData.selectedMedia.length === 0) {
      alert('Please select style and at least one image');
      return;
    }

    try {
      const mediaIds = formData.selectedMedia.map(m => m.id);
      await api.post('/admin/offer-sliders', {
        style: formData.style,
        media_ids: mediaIds
      });

      setFormData({ style: '', selectedMedia: [] });
      fetchSliderSections();

    } catch (err) {
      console.error('Failed to add slider section:', err.response?.data || err);
      alert(err.response?.data?.message || 'Failed to add slider section');
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;
    try {
      await api.delete(`/admin/offer-sliders/${id}`);
      fetchSliderSections();
    } catch (err) {
      console.error(err);
      alert('Failed to delete section');
    }
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans">
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <RotateCw size={16} className="animate-spin-slow" />
            <span>Creative Engine Alpha</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Slider Architect</h1>
        </div>
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] flex items-center gap-3 border border-primary/10 dark:border-primary-light/10">
            <ImageIcon size={18} className="animate-pulse" /> Visual Sequence Enabled
          </div>
          <button onClick={fetchSliderSections} className="p-4 text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-background-site dark:hover:bg-slate-800 rounded-2xl transition-all">
            <RotateCw size={22} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        {/* LEFT: MANAGEMENT FORM */}
        <div className="xl:col-span-4 space-y-8">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-10 transition-all group">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-background-site/30 dark:bg-slate-950/30 flex items-center gap-6">
                <div className="p-4 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20">
                    <ArrowUp size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Sequence Forge</h2>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mt-1">Nodal Configuration</p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-12 space-y-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase ml-2 tracking-[0.3em]">Sequence Geometry</label>
                <div className="relative group/select">
                   <select 
                    className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none transition-all cursor-pointer shadow-inner appearance-none"
                    value={formData.style}
                    onChange={e => setFormData({...formData, style: e.target.value})}
                    required
                  >
                    <option value="">Select Geometry</option>
                    <option value="Style 1">Style 1 (Standard Core)</option>
                    <option value="Style 2">Style 2 (Premium Matrix)</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase ml-2 tracking-[0.3em]">Visual Cluster</label>
                
                <div className="space-y-6">
                  {formData.selectedMedia.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.selectedMedia.map((m, i) => (
                        <div key={i} className="relative group/thumb aspect-square bg-slate-100 dark:bg-slate-950 rounded-[1.5rem] overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800">
                          <img 
                            src={m.preview} 
                            alt="selected" 
                            className="w-full h-full object-cover grayscale opacity-80 group-hover/thumb:opacity-40 transition-all duration-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeSelected(m.id)}
                            className="absolute inset-0 m-auto w-10 h-10 flex items-center justify-center bg-rose-600 text-white rounded-xl scale-0 group-hover/thumb:scale-100 transition-transform duration-300 shadow-xl"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-background-site/50 dark:bg-slate-950/50">
                      <ImageIcon size={32} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700 leading-relaxed">Registry Empty<br/>Await Uplink</p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={openMediaSelector}
                    className="w-full py-6 border-2 border-dashed border-primary/30 dark:border-primary-light/20 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] text-primary dark:text-primary-light hover:bg-primary/5 dark:hover:bg-primary-light/5 transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    <Plus size={20} className="group-hover/btn:rotate-90 transition-transform" /> Load Visual DNA
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-10">
                <button 
                  type="reset"
                  onClick={() => setFormData({ style: '', selectedMedia: [] })}
                  className="px-8 py-6 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                >
                  Purge
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-black dark:hover:bg-primary-dark text-white py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                  disabled={formData.selectedMedia.length === 0}
                >
                  Commit Sequence
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* RIGHT: DATA DISPLAY */}
        <div className="xl:col-span-8 space-y-12 h-screen pb-40 scrollbar-hide">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group h-full">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Active Registries</h3>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Visual Sequence Dictionary</p>
              </div>
              <button 
                onClick={fetchSliderSections} 
                className="p-5 bg-background-site dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm active:rotate-180 duration-500"
              >
                <RotateCw size={24} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              {loading ? (
                <div className="p-40 text-center flex flex-col items-center justify-center gap-8">
                  <div className="relative">
                    <Loader2 className="animate-spin h-20 w-20 text-primary opacity-20" />
                    <RotateCw size={32} className="absolute inset-0 m-auto text-primary animate-pulse" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">Syncing Directory Nodes...</p>
                </div>
              ) : sliderSections.length === 0 ? (
                <div className="p-40 text-center opacity-20 flex flex-col items-center">
                    <ImageIcon size={100} className="mb-8" />
                    <p className="text-2xl font-black uppercase tracking-widest">No Sequences Detected</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/50">
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Node Hash</th>
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Geometry</th>
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Payload</th>
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] text-right">Ops</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                    {sliderSections.map((s) => (
                      <tr key={s.id} className="group hover:bg-background-site/30 dark:hover:bg-slate-800/30 transition-all duration-300">
                        <td className="px-12 py-10 font-black text-primary dark:text-primary-light text-base tracking-tighter">
                            <span className="opacity-20 mr-2">#</span>{s.id}
                        </td>
                        <td className="px-12 py-10">
                          <span className="px-5 py-2 bg-primary/10 text-primary dark:text-primary-light rounded-[1rem] text-[10px] font-black uppercase tracking-widest border border-primary/10">
                            {s.style}
                          </span>
                        </td>
                        <td className="px-12 py-10">
                          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-600 group-hover:text-primary transition-colors">
                            <ImageIcon size={18} />
                            <span className="text-sm font-black uppercase tracking-tighter">{s.media_ids?.length || 0} Frames Loaded</span>
                          </div>
                        </td>
                        <td className="px-12 py-10 text-right">
                          <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={() => handleDelete(s.id)}
                              className="p-4 text-rose-600 hover:text-white hover:bg-rose-600 bg-surface dark:bg-slate-950 rounded-2xl shadow-xl transition-all active:scale-90 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/50"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <footer className="p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center text-[9px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.6em]">
                <span>Slider_Architect v4.0.1</span>
                <span>System Pulse: Active</span>
            </footer>
          </section>
        </div>
      </main>

      {/* Media Modal */}
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
                  <h3 className="text-4xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Visual Registry</h3>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">Map clusters to current sequence</p>
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
                    placeholder="Scan asset directory..." 
                    value={mediaSearch} 
                    onChange={e => setMediaSearch(e.target.value)}
                    className="w-full pl-24 pr-12 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[3rem] text-lg font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 shadow-inner" 
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-16 bg-surface dark:bg-slate-900 custom-scrollbar">
                {mediaLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-10">
                    <div className="relative">
                       <RotateCcw size={100} className="animate-spin text-primary opacity-10" />
                       <Activity size={40} className="absolute inset-0 m-auto text-primary animate-pulse" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 animate-pulse text-center">Reconstructing Visual Matrix...</p>
                  </div>
                ) : filteredMedia.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full opacity-10 grayscale py-40">
                    <ImageIcon size={160} className="mb-10 text-slate-900 dark:text-white" />
                    <p className="text-4xl font-black uppercase tracking-[0.8em]">Silent Registry</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
                    {filteredMedia.map(item => {
                      const url = item.thumbnail || `${item.sub_directory}${item.name}`;
                      const full = url.startsWith('http') ? url : `${baseUrl}/${url.replace(/^\/+/, '')}`;
                      const selected = formData.selectedMedia.some(m => m.id === item.id);

                      return (
                        <div 
                          key={item.id}
                          onClick={() => selectMediaItem(item)}
                          className={`relative aspect-square rounded-[3rem] overflow-hidden cursor-pointer group transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl ${
                            selected ? 'ring-[8px] ring-primary ring-offset-8 dark:ring-offset-slate-900 scale-95 shadow-2xl' : 'shadow-sm'
                          }`}
                        >
                          <img src={full} alt={item.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-125" />
                          <div className={`absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                             <div className="bg-white text-primary p-6 rounded-[2rem] shadow-2xl animate-in zoom-in-50">
                                <CheckCircle size={40} />
                             </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{item.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <footer className="p-16 border-t border-slate-100 dark:border-slate-800 bg-surface dark:bg-slate-900 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-6">
                    <div className="flex -space-x-4">
                        {formData.selectedMedia.slice(0, 5).map((m, i) => (
                           <div key={i} className="w-16 h-16 rounded-full border-4 border-surface dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl animate-in fade-in slide-in-from-left-4 transition-all">
                              <img src={m.preview} className="w-full h-full object-cover grayscale" />
                           </div>
                        ))}
                    </div>
                    {formData.selectedMedia.length > 5 && (
                       <span className="text-xs font-black text-primary dark:text-primary-light uppercase tracking-widest">+{formData.selectedMedia.length - 5} More</span>
                    )}
                </div>
                <div className="flex flex-wrap justify-center gap-6 w-full md:w-auto">
                   <button 
                    onClick={() => setShowMediaModal(false)}
                    className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] hover:bg-background-site dark:hover:bg-slate-950 rounded-[2rem] transition-all border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                  >
                    Abort Registry
                  </button>
                  <button 
                    onClick={() => setShowMediaModal(false)}
                    className="px-16 py-6 bg-primary text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/30 hover:bg-black active:scale-95"
                  >
                    Commit {formData.selectedMedia.length} Nodes
                  </button>
                </div>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}