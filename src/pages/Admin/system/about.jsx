import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { Save, RefreshCw, AlertCircle, CheckCircle, Image as ImageIcon, X, Search, Info, ChevronRight, Info as InfoIcon, Activity, Database, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutSettings() {
  const [formData, setFormData] = useState({
    about_title: '',
    about_description: '',
    about_image: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [aboutImagePreview, setAboutImagePreview] = useState(null);

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
        about_title: data.about_title || '',
        about_description: data.about_description || '',
        about_image: data.about_image || '',
      });
      setAboutImagePreview(data.about_image);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to synchronize identity data' });
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
      console.error('Failed to index media registry:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${baseUrl}/${(item.sub_directory + item.name).replace(/^\/+/, '')}`;
    setAboutImagePreview(imageUrl);
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
      reader.onload = () => setAboutImagePreview(reader.result);
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
      form.append('about_title', formData.about_title);
      form.append('about_description', formData.about_description);

      const aboutFile = document.querySelector('input[name="about_image"]')?.files[0];
      if (aboutFile) {
        form.append('about_image', aboutFile);
      } else if (selectedMediaId) {
        form.append('aboutImageMediaId', selectedMediaId);
      }

      await api.post('/admin/site-content', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'Identity Protocol committed successfully!' });
      fetchContent();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to commit changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-site dark:bg-slate-950 gap-6">
        <RefreshCw className="animate-spin h-16 w-16 text-primary opacity-20" />
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Identity Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span>Identity Protocol v4.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">About Registry</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Protocol Status: ACTIVE
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
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

        <form onSubmit={handleSubmit} className="space-y-16">
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface dark:bg-slate-900 p-12 md:p-20 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-700 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="space-y-16 relative z-10">
              {/* Narrative Header Field */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ml-2">Narrative Identity</label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    name="about_title" 
                    value={formData.about_title} 
                    onChange={handleChange} 
                    className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-xl font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 shadow-inner"
                    placeholder="e.g. THE CORE PHILOSOPHY"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-primary opacity-20 group-focus-within/input:opacity-100 transition-opacity">
                      <Sparkles size={24} />
                  </div>
                </div>
              </div>

              {/* Mission Statement Field */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ml-2">Mission Vector Matrix</label>
                <div className="relative group/input">
                  <textarea 
                    name="about_description" 
                    value={formData.about_description} 
                    onChange={handleChange} 
                    rows={10} 
                    className="w-full px-10 py-10 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[3rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all leading-relaxed placeholder:text-slate-200 dark:placeholder:text-slate-800 shadow-inner resize-none font-sans"
                    placeholder="Articulate the organizational vision, core values, and strategic trajectory within the digital ecosystem..."
                  />
                </div>
              </div>

              {/* Visual Identity Asset Cluster */}
              <div className="space-y-8">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] ml-2">Visual Protocol Token</label>
                <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-center p-12 bg-background-site/30 dark:bg-slate-950/30 rounded-[4rem] border border-slate-100 dark:border-slate-800/10 shadow-inner relative group/asset">
                  <div className="relative group w-full lg:w-72 aspect-square rounded-[3.5rem] overflow-hidden bg-surface dark:bg-slate-900 border-8 border-surface dark:border-slate-800 shadow-3xl transition-all duration-700 hover:scale-105 hover:rotate-2">
                    {aboutImagePreview ? (
                      <img src={aboutImagePreview} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-95 group-hover:scale-100" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-100 dark:text-slate-800">
                        <ImageIcon size={64} />
                        <span className="text-[10px] font-black mt-4 uppercase tracking-[0.5em]">NULL_ASSET</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Activity size={48} className="text-white animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-8 flex flex-col justify-center w-full">
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                      <button 
                        type="button" 
                        onClick={() => setShowMediaModal(true)}
                        className="flex items-center gap-4 px-10 py-5 bg-surface dark:bg-slate-900 text-slate-400 hover:text-primary rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-95 transition-all"
                      >
                        <Database size={20} /> Repository Hub
                      </button>
                      <label className="group/btn flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] cursor-pointer hover:bg-black transition-all active:scale-95 shadow-2xl shadow-primary/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                        <RefreshCw size={20} className="relative z-10" /> <span className="relative z-10">Ingest Vector</span>
                        <input type="file" name="about_image" accept="image/*" onChange={handleFile} className="hidden" />
                      </label>
                    </div>
                    <div className="bg-surface/50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/20 text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.2em] leading-relaxed italic">
                      Protocol: Cinematic 16:9 recommended <br/>
                      Limit: 10MB Ingestion | Format: AR-WebP preferred
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commit Controller Console */}
            <div className="mt-20 pt-12 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-4 text-slate-300 dark:text-slate-700">
                <InfoIcon size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Identity commit pending server handshake</span>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="group/submit w-full sm:w-auto flex items-center justify-center gap-5 px-16 py-6 bg-primary text-white rounded-[3rem] font-black text-[12px] uppercase tracking-[0.5em] shadow-3xl shadow-primary/40 hover:bg-black hover:-translate-y-2 transition-all active:scale-95 disabled:opacity-50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/submit:translate-x-0 transition-transform duration-700" />
                {saving ? (
                  <>
                    <RefreshCw className="animate-spin" size={24} />
                    <span>SYNCHRONIZING...</span>
                  </>
                ) : (
                  <>
                    <Save size={24} className="relative z-10" />
                    <span className="relative z-10">COMMIT_PROTOCOL</span>
                  </>
                )}
              </button>
            </div>
          </motion.section>
        </form>
      </div>

      {/* --- MEDIA MODAL MATRIX --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowMediaModal(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="p-10 md:p-12 border-b border-primary/10 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-primary text-white rounded-3xl shadow-2xl">
                    <Database size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Repository Matrix</h3>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-1">Select identity visual asset</p>
                  </div>
                </div>
                <button onClick={() => setShowMediaModal(false)} className="w-16 h-16 flex items-center justify-center bg-background-site dark:bg-slate-950 text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90">
                  <X size={28} />
                </button>
              </div>

              <div className="p-10 bg-background-site/30 dark:bg-slate-950/30 border-b border-primary/5">
                <div className="relative group/search max-w-2xl mx-auto">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
                  <input
                    type="text"
                    placeholder="Scan Matrix Filename..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-20 pr-8 py-6 bg-surface dark:bg-slate-900 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                {mediaLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-10">
                    <RefreshCw className="animate-spin h-24 w-24 text-primary opacity-20" />
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Asset Nodes...</p>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-8 text-slate-200 dark:text-slate-800">
                    <ImageIcon size={100} className="opacity-10" />
                    <p className="text-2xl font-black uppercase tracking-[0.6em]">VACUUM_STATE</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 pb-12">
                    {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                      const imageUrl = item.thumbnail || `${baseUrl}/${(item.sub_directory + item.name).replace(/^\/+/, '')}`;
                      const isSelected = selectedMediaId === item.id;

                      return (
                        <motion.div 
                          key={item.id}
                          whileHover={{ scale: 1.05, y: -5 }}
                          onClick={() => selectMediaItem(item)}
                          className={`group/item relative aspect-square cursor-pointer rounded-[2.5rem] overflow-hidden border-4 transition-all duration-500 shadow-xl ${
                            isSelected ? 'border-primary ring-8 ring-primary/10 bg-primary/5' : 'border-background-site dark:border-slate-800 bg-background-site/50 dark:bg-slate-950/50 grayscale hover:grayscale-0'
                          }`}
                        >
                          <img src={imageUrl} alt={item.name} className="w-full h-full object-cover p-2 scale-90 group-hover/item:scale-110 transition-transform duration-700" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                              <CheckCircle size={48} className="text-white" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <p className="text-white text-[9px] font-black truncate uppercase tracking-[0.2em]">{item.name}</p>
                          </div>
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

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="max-w-4xl mx-auto mt-32 text-center border-t border-slate-100 dark:border-slate-800/10 pt-16 flex flex-col items-center gap-8 relative z-10">
        <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000 cursor-default">
            <Shield size={24} className="text-primary" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Database size={24} className="text-primary" />
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.8em]">
          Corporate Identity Registry: <span className="text-primary italic">ID-CORP-INFO-SIGMA</span>
        </p>
      </footer>
    </div>
  );
}
