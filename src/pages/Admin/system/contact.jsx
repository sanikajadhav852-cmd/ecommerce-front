import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { Save, RefreshCw, AlertCircle, CheckCircle, Image as ImageIcon, X, Search, Info, ChevronRight, Phone, Mail, MapPin, Hash, Activity, Shield, Sparkles, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactSettings() {
  const [formData, setFormData] = useState({
    contact_title: '',
    contact_description: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    contact_map_image: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [contactMapPreview, setContactMapPreview] = useState(null);

  // Media Library States
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectedMediaId, setSelectedMediaId] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (showMediaModal) fetchMediaItems();
  }, [showMediaModal]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/site-content');
      const data = res.data.data || {};
      setFormData({
        contact_title: data.contact_title || '',
        contact_description: data.contact_description || '',
        contact_phone: data.contact_phone || '',
        contact_email: data.contact_email || '',
        contact_address: data.contact_address || '',
        contact_map_image: data.contact_map_image || '',
      });
      setContactMapPreview(data.contact_map_image);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to synchronize communication nodes' });
    } finally {
      setLoading(false);
    }
  };

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
      console.error('Failed to index asset registry:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${baseUrl}/${(item.sub_directory + item.name).replace(/^\/+/, '')}`;
    setContactMapPreview(imageUrl);
    setSelectedMediaId(item.id);
    setShowMediaModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setContactMapPreview(reader.result);
      reader.readAsDataURL(file);
      setSelectedMediaId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      const mapFile = document.querySelector('input[name="contact_map_image"]')?.files[0];
      if (mapFile) {
        form.append('contact_map_image', mapFile);
      } else if (selectedMediaId) {
        form.append('contactMapImageMediaId', selectedMediaId);
      }

      await api.post('/admin/site-content', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'Communication manifest committed successfully!' });
      fetchContent();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to commit manifest' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-site dark:bg-slate-950 gap-6">
        <RefreshCw className="animate-spin h-16 w-16 text-primary opacity-20" />
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Communication Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Phone size={16} className="text-primary animate-pulse" />
            <span>Communications Hub v5.4</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Contact Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Signal Integrity: NOMINAL
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          {message.text && (
            <motion.div 
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className={`p-8 mb-12 rounded-[2.5rem] flex items-center gap-6 border-2 shadow-2xl ${
                message.type === 'success' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'
              }`}
            >
              {message.type === 'success' ? <CheckCircle size={28} className="animate-bounce" /> : <AlertCircle size={28} />}
              <span className="font-black text-[10px] uppercase tracking-[0.3em]">{message.text}</span>
              <button onClick={() => setMessage({type:'', text:''})} className="ml-auto p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Content Configuration */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-12">
              
              {/* Narrative Identity Section */}
              <motion.section 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mb-12 flex items-center gap-5">
                  <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                    <Hash size={20} />
                  </div>
                  Narrative Identity
                </h3>
                <div className="space-y-10 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Portal Identity Title</label>
                    <div className="relative group/input">
                        <input 
                        name="contact_title" 
                        value={formData.contact_title} 
                        onChange={handleChange} 
                        className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-xl font-black text-text-pri dark:text-white transition-all outline-none shadow-inner placeholder:text-slate-200 dark:placeholder:text-slate-800"
                        placeholder="e.g. GET IN TOUCH WITH US"
                        />
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-primary opacity-20 group-focus-within/input:opacity-100 transition-opacity">
                            <Sparkles size={20} />
                        </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Interface Manifest Brief</label>
                    <div className="relative group/input">
                        <textarea 
                        name="contact_description" 
                        value={formData.contact_description} 
                        onChange={handleChange} 
                        rows={5} 
                        className="w-full px-10 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none leading-relaxed shadow-inner resize-none placeholder:text-slate-200 dark:placeholder:text-slate-800"
                        placeholder="Define the primary communication vector objectives..."
                        />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Connection Nodes Section */}
              <motion.section 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mb-12 flex items-center gap-5">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl shadow-inner">
                    <Database size={20} />
                  </div>
                  Connection Nodes
                </h3>
                <div className="space-y-10 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Voice Protocol (Phone)</label>
                      <div className="relative group/input">
                        <Phone size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" />
                        <input 
                          name="contact_phone" 
                          value={formData.contact_phone} 
                          onChange={handleChange} 
                          className="w-full pl-20 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Mail Endpoint (Email)</label>
                      <div className="relative group/input">
                        <Mail size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" />
                        <input 
                          name="contact_email" 
                          value={formData.contact_email} 
                          onChange={handleChange} 
                          className="w-full pl-20 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner"
                          placeholder="dispatch@nexus-core.io"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Physical Vector (Address)</label>
                    <div className="relative group/input">
                      <MapPin size={22} className="absolute left-8 top-8 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" />
                      <textarea 
                        name="contact_address" 
                        value={formData.contact_address} 
                        onChange={handleChange} 
                        rows={4} 
                        className="w-full pl-20 pr-8 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none leading-relaxed shadow-inner resize-none"
                        placeholder="Map the geospatial coordinates of the primary hub..."
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column: Visual Manifest Cluster */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-12">
              <motion.section 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-950 rounded-[4.5rem] p-12 md:p-14 shadow-3xl relative overflow-hidden group border-4 border-primary/10 transition-all duration-700 hover:border-primary/30"
              >
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
                
                <h3 className="text-2xl font-black mb-12 relative z-10 text-white uppercase tracking-tighter flex items-center justify-between">
                    Geospatial Render
                    <MapPin size={28} className="text-primary animate-bounce" />
                </h3>
                
                <div className="space-y-12 relative z-10">
                  <div className="aspect-[16/11] w-full rounded-[3rem] bg-slate-900 overflow-hidden border-8 border-white/5 shadow-inner transition-all duration-1000 hover:scale-[1.02] hover:rotate-1 relative group/map">
                    {contactMapPreview ? (
                      <img src={contactMapPreview} alt="Map" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/10 gap-4">
                        <MapPin size={80} className="mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">NULL_COORDINATES</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Activity size={64} className="text-white animate-pulse" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pb-4">
                    <button 
                      type="button" 
                      onClick={() => setShowMediaModal(true)}
                      className="flex items-center justify-center gap-4 px-8 py-5 bg-white text-slate-950 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95 group/btn overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                        <ImageIcon size={20} className="relative z-10" /> <span className="relative z-10">Matrix Repository</span>
                    </button>
                    <label className="flex items-center justify-center gap-4 px-8 py-5 bg-white/5 border-2 border-white/10 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all cursor-pointer active:scale-95">
                      <RefreshCw size={20} /> <span className="hidden sm:inline">Sync Asset</span>
                      <input type="file" name="contact_map_image" accept="image/*" onChange={handleFile} className="hidden" />
                    </label>
                  </div>
                </div>
              </motion.section>

              <div className="p-10 bg-emerald-500/5 rounded-[3.5rem] border-2 border-emerald-500/10 shadow-2xl shadow-emerald-500/5 group/alert">
                <div className="flex gap-8">
                  <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-[1.5rem] flex items-center justify-center text-emerald-500 shadow-2xl border border-emerald-500/10 shrink-0 group-hover:rotate-12 transition-transform duration-700">
                    <Info size={36} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-emerald-600 text-[11px] uppercase tracking-[0.4em]">Protocol Sync: VALID</h4>
                    <p className="text-[10px] text-emerald-600/60 font-black uppercase tracking-tight leading-relaxed italic">
                      Communication parameters are replicated across public domain nodes. Geospatial Iframe vectors are managed via core database handshake.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="group/submit w-full py-8 bg-primary text-white rounded-[3.5rem] font-black text-[12px] uppercase tracking-[0.6em] shadow-3xl shadow-primary/40 hover:bg-black hover:-translate-y-3 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/submit:translate-x-0 transition-transform duration-700" />
                {saving ? (
                  <><RefreshCw className="animate-spin" size={28} /> <span>STREAMS_ACTIVE...</span></>
                ) : (
                  <><Save size={28} className="relative z-10" /> <span className="relative z-10">COMMIT_COMM_MANIFEST</span></>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* --- MEDIA MODAL MATRIX --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMediaModal(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col" >
              <div className="p-10 md:p-12 border-b border-primary/10 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-primary text-white rounded-3xl shadow-2xl">
                    <Database size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Repository Matrix</h3>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-1">Select communication visual asset</p>
                  </div>
                </div>
                <button onClick={() => setShowMediaModal(false)} className="w-16 h-16 flex items-center justify-center bg-background-site dark:bg-slate-950 text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90">
                  <X size={28} />
                </button>
              </div>
              <div className="p-10 bg-background-site/30 dark:bg-slate-950/30 border-b border-primary/5">
                <div className="relative group/search max-w-2xl mx-auto">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
                  <input type="text" placeholder="Scan Matrix Filename..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} className="w-full pl-20 pr-8 py-6 bg-surface dark:bg-slate-900 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                {mediaLoading ? ( 
                  <div className="h-full flex flex-col items-center justify-center gap-10"> 
                    <RefreshCw className="animate-spin h-24 w-24 text-primary opacity-20" /> 
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Asset Nodes...</p> 
                  </div> 
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 pb-12">
                    {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                      const imageUrl = item.thumbnail || `${baseUrl}/${(item.sub_directory + item.name).replace(/^\/+/, '')}`;
                      const isSelected = selectedMediaId === item.id;
                      return (
                        <motion.div key={item.id} whileHover={{ scale: 1.05, y: -5 }} onClick={() => selectMediaItem(item)} className={`group/item relative aspect-square cursor-pointer rounded-[2.5rem] overflow-hidden border-4 transition-all duration-500 shadow-xl ${isSelected ? 'border-primary ring-8 ring-primary/10 bg-primary/5' : 'border-background-site dark:border-slate-800 bg-background-site/50 dark:bg-slate-950/50 grayscale hover:grayscale-0'}`} >
                          <img src={imageUrl} alt={item.name} className="w-full h-full object-cover p-2 scale-90 group-hover/item:scale-110 transition-transform duration-700" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center transition-all">
                              <CheckCircle size={48} className="text-white drop-shadow-2xl" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FOOTER ARCHITECTURE --- */}
      <footer className="max-w-7xl mx-auto mt-32 text-center border-t border-slate-100 dark:border-slate-800/10 pt-16 flex flex-col items-center gap-10 relative z-10">
        <div className="flex items-center gap-8 opacity-20 filter grayscale hover:grayscale-0 transition-all duration-1000">
            <Shield size={28} className="text-primary" />
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Activity size={28} className="text-primary animate-pulse" />
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.8em]">
           Communications Node: <span className="text-primary italic">HUB-COMM-EPSILON-V5</span>
        </p>
      </footer>
    </div>
  );
}
