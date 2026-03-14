// src/pages/admin/AboutEditor.jsx
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { 
  Save, RotateCcw, AlertCircle, CheckCircle, Edit2,
  Image as ImageIcon, Loader2, X, Search, ChevronRight, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  // Media modal states
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/about');
      setFormData(res.data.about || { title: '', description: '', image: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load About data');
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
      console.error('Media fetch error:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const openMediaModal = () => {
    setMediaSearch('');
    setShowMediaModal(true);
  };

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${item.path}${item.name}`;
    const fullUrl = imageUrl.startsWith('http')
      ? imageUrl
      : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;

    setFormData(prev => ({ ...prev, image: fullUrl }));
    setShowMediaModal(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image || null
      };

      await api.put('/about', payload);
      setSuccess('About page updated successfully!');
      fetchAboutData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update About data');
    } finally {
      setSaving(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Edit2 size={14} className="animate-pulse" />
            <span>Identity Architecture</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">About Editor</h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={fetchAboutData}
            disabled={saving}
            className="p-4 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-2xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <RotateCcw size={20} />
          </button>
          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Synchronize Data
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-rose-500/10 border-2 border-rose-500/20 rounded-[2rem] flex items-center gap-4 text-rose-500">
              <AlertCircle size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-[2rem] flex items-center gap-4 text-emerald-500">
              <CheckCircle size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Visual Identity Context */}
            <div className="lg:col-span-12 space-y-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Brand Manifesto Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => handleChange('title', e.target.value)} 
                  placeholder="Master Protocol Overview"
                  className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1.125rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Mission Narrative</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => handleChange('description', e.target.value)} 
                  rows={10}
                  placeholder="Initialize brand story..."
                  className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-[2.5rem] text-[1rem] font-bold text-slate-900 dark:text-white transition-all outline-none shadow-inner resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Identity Visual Component</label>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-950 rounded-[2.5rem] border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-inner group">
                    {formData.image ? (
                      <img src={formData.image} alt="Identity Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-slate-300 dark:text-slate-800">
                        <ImageIcon size={64} strokeWidth={1} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Null Reference Sensor</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <div className="p-8 bg-slate-50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 space-y-4">
                       <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Asset Injection Protocol</h4>
                       <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 leading-relaxed uppercase tracking-tight">Inject a high-fidelity visual from the media vault to accompany the brand manifesto.</p>
                       <button
                         type="button"
                         onClick={openMediaModal}
                         className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                       >
                         <Search size={16} /> Central Media Vault
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SYSTEM FOOTER --- */}
        <footer className="text-center opacity-10 pointer-events-none pb-10">
          <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
            <Zap size={14} /> CONTENT-INTERFACE-MANIFEST-V4.2 [STABLE]
          </p>
        </footer>
      </main>

      {/* --- MEDIA MODAL --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMediaModal(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col" >
              <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                <span>Central Media Vault</span>
                <button onClick={() => setShowMediaModal(false)} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800/50 relative">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" placeholder="Query matrix by filename..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1rem] font-bold outline-none transition-all text-slate-900 dark:text-white shadow-inner" />
              </div>
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {mediaLoading ? ( 
                  <div className="h-full flex flex-col items-center justify-center space-y-6"> 
                    <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin" /> 
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Indexing Assets...</p> 
                  </div> 
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {filteredMedia.map(item => {
                      const imageUrl = item.thumbnail || `${item.path}${item.name}`;
                      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                      const isSelected = formData.image === fullUrl;
                      return (
                        <motion.div key={item.id} whileHover={{ scale: 1.05 }} onClick={() => selectMediaItem(item)} className={`relative aspect-square cursor-pointer rounded-[2rem] overflow-hidden border-4 transition-all shadow-sm ${isSelected ? 'border-indigo-600 ring-8 ring-indigo-500/10 shadow-2xl' : 'border-white dark:border-slate-800 grayscale hover:grayscale-0'}`} >
                          <img src={fullUrl} alt={item.name} className="w-full h-full object-cover" />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="p-10 border-t border-slate-50 dark:border-slate-800/50 bg-white dark:bg-slate-900 flex justify-end gap-6">
                 <button onClick={() => setShowMediaModal(false)} className="px-14 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95">Select Asset</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}