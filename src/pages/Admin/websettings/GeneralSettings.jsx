// src/pages/admin/GeneralSettings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../lib/api';
import { 
  Save, Upload, RefreshCw, AlertCircle, CheckCircle, 
  Palette, Search, X, Image as ImageIcon, Settings, 
  Layout, Bell, Globe, Mail, Phone, MapPin, Share2, 
  Smartphone, Monitor, Zap, Activity, Database, Sparkles, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeneralSettings() {
  const [formData, setFormData] = useState({
    site_title: '',
    support_number: '',
    support_email: '',
    copyright_details: '',
    address: '',
    short_description: '',
    map_iframe: '',
    meta_keywords: '',
    meta_description: '',
    twitter: '',
    instagram: '',
    youtube: '',
    whatsapp: '',
    linkedin: '',
    tiktok: '',
    playstore_url: '',
    applestore_url: '',
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Media Library States
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectedLogoMediaId, setSelectedLogoMediaId] = useState(null);
  const [selectedFaviconMediaId, setSelectedFaviconMediaId] = useState(null);
  const [mediaTarget, setMediaTarget] = useState('logo'); // 'logo', 'favicon'

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      console.error('Failed to index asset registry:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${baseUrl}/${(item.sub_directory + item.name).replace(/^\/+/, '')}`;
    
    if (mediaTarget === 'logo') {
      setLogoPreview(imageUrl);
      setSelectedLogoMediaId(item.id);
      const logoInput = document.querySelector('input[name="logo"]');
      if (logoInput) logoInput.value = '';
    } else if (mediaTarget === 'favicon') {
      setFaviconPreview(imageUrl);
      setSelectedFaviconMediaId(item.id);
      const faviconInput = document.querySelector('input[name="favicon"]');
      if (faviconInput) faviconInput.value = '';
    }
    
    setShowMediaModal(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/site-content');
      const data = res.data.data || {};
      setFormData(data);
      setLogoPreview(data.logo);
      setFaviconPreview(data.favicon);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to synchronize manifest' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFile = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setter(reader.result);
      reader.readAsDataURL(file);
      if (e.target.name === 'logo') {
        setSelectedLogoMediaId(null);
      } else if (e.target.name === 'favicon') {
        setSelectedFaviconMediaId(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      const logoFile = document.querySelector('input[name="logo"]')?.files[0];
      const faviconFile = document.querySelector('input[name="favicon"]')?.files[0];

      if (logoFile) {
        form.append('logo', logoFile);
      } else if (selectedLogoMediaId) {
        form.append('logoMediaId', selectedLogoMediaId);
      }

      if (faviconFile) {
        form.append('favicon', faviconFile);
      } else if (selectedFaviconMediaId) {
        form.append('faviconMediaId', selectedFaviconMediaId);
      }

      await api.post('/admin/site-content', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'Master configuration committed successfully!' });
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
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Master Interface...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Monitor size={16} className="text-primary animate-pulse" />
            <span>Master Interface Configuration v6.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">General Settings</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Interface Health: STABLE
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

        <form onSubmit={handleSubmit} className="space-y-16 pb-24">
          
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Branding & Basics */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Site Basics Section */}
              <motion.section 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 p-12 md:p-16 shadow-sm transition-all duration-700 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h2 className="text-[10px] font-black mb-12 text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] flex items-center gap-5">
                   <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                        <Settings size={20} />
                   </div>
                   Core Brand Context
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Site Global Identity Title</label>
                    <div className="relative group/input">
                        <input type="text" name="site_title" value={formData.site_title || ''} onChange={handleChange} className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-[1.1rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner placeholder:text-slate-200 dark:placeholder:text-slate-800" placeholder="e.g. NEXUS GLOBAL" />
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-primary opacity-20 group-focus-within/input:opacity-100 transition-opacity">
                            <Sparkles size={20} />
                        </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Support Hot-Channel</label>
                    <div className="relative group/input">
                      <Phone size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" />
                      <input type="text" name="support_number" value={formData.support_number || ''} onChange={handleChange} className="w-full pl-20 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-[1rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px) font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Administrative Hub Email</label>
                    <div className="relative group/input">
                      <Mail size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" />
                      <input type="email" name="support_email" value={formData.support_email || ''} onChange={handleChange} className="w-full pl-20 pr-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-[1rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner" placeholder="dispatch@nexus-core.io" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Copyright Regulatory Manifest</label>
                    <div className="relative group/input">
                        <input type="text" name="copyright_details" value={formData.copyright_details || ''} onChange={handleChange} className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner" placeholder="© 2026 Nexus Global Industries" />
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 opacity-20 group-focus-within/input:opacity-100 transition-opacity">
                            <Shield size={20} />
                        </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Global Headquarters Geospatial Vector</label>
                    <div className="relative group/input">
                      <MapPin size={22} className="absolute left-8 top-8 text-slate-300 dark:text-slate-800 transition-colors group-focus-within/input:text-primary" />
                      <textarea name="address" value={formData.address || ''} onChange={handleChange} rows={3} className="w-full pl-20 pr-8 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white transition-all outline-none shadow-inner resize-none leading-relaxed placeholder:text-slate-200 dark:placeholder:text-slate-800" placeholder="Map the physical coordinates..." />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Social Dynamics Section */}
              <motion.section 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 p-12 md:p-16 shadow-sm transition-all duration-700 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h2 className="text-[10px] font-black mb-12 text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] flex items-center gap-5">
                   <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl shadow-inner">
                        <Share2 size={20} />
                   </div>
                   Network Connectivity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                  {['twitter', 'instagram', 'youtube', 'whatsapp', 'linkedin', 'tiktok', 'playstore_url', 'applestore_url'].map((field) => (
                    <div key={field} className="space-y-4">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">{field.replace('_', ' ')} Vector</label>
                      <div className="relative group/input">
                        <input
                            type="url"
                            name={field}
                            value={formData[field] || ''}
                            onChange={handleChange}
                            placeholder={`https://${field.split('_')[0]}.interface/...`}
                            className="w-full px-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[1.5rem] text-[0.9rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 opacity-20 group-focus-within/input:opacity-100 transition-opacity">
                            <Zap size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Engagement Protocol Section */}
              <motion.section 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 p-12 md:p-16 shadow-sm transition-all duration-700 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h2 className="text-[10px] font-black mb-12 text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] flex items-center gap-5">
                   <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl shadow-inner">
                        <Bell size={20} />
                   </div>
                   Engagement Protocol
                </h2>
                <div className="space-y-10 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Newsletter Directive Cluster Title</label>
                    <div className="relative group/input">
                        <input type="text" name="newsletter_title" value={formData.newsletter_title || ''} onChange={handleChange} className="w-full px-8 py-6 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-[1.1rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner placeholder:text-slate-200 dark:placeholder:text-slate-800" placeholder="e.g. JOIN THE VANGUARD" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Engagement Global Brief</label>
                    <div className="relative group/input">
                        <textarea name="newsletter_description" value={formData.newsletter_description || ''} onChange={handleChange} rows={4} className="w-full px-10 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-[1rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner resize-none leading-relaxed placeholder:text-slate-200 dark:placeholder:text-slate-800" placeholder="Define the subscription mission brief..." />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] ml-2">Trigger Command Label</label>
                    <div className="relative group/input">
                        <input type="text" name="subscribe_button_text" value={formData.subscribe_button_text || ''} onChange={handleChange} className="w-full px-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[1.5rem] text-[1rem] font-black text-text-pri dark:text-white transition-all outline-none shadow-inner" placeholder="INITIALIZE_SYNC" />
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column: Visual Identity Cluster */}
            <div className="lg:col-span-4 space-y-12">
              
              {/* Image Matrix Module */}
              <motion.section 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-950 rounded-[4.5rem] p-12 md:p-14 shadow-3xl relative overflow-hidden group border-4 border-primary/10 transition-all duration-700 hover:border-primary/30"
              >
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-primary/20 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
                
                <h3 className="text-2xl font-black mb-12 relative z-10 text-white uppercase tracking-tighter flex items-center justify-between">
                    Visual Manifest
                    <ImageIcon size={28} className="text-primary animate-pulse" />
                </h3>
                
                <div className="space-y-16 relative z-10">
                  {/* Logo Display Module */}
                  <div className="space-y-6">
                    <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] ml-2">Brand Signature (Logo)</label>
                    <div className="aspect-[16/10] w-full bg-slate-900 overflow-hidden border-8 border-white/5 shadow-inner transition-all duration-1000 hover:scale-[1.02] hover:rotate-1 relative group/logo">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-[80%] h-[80%] m-auto object-contain grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-1000 scale-105 group-hover/logo:scale-100" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/10 gap-4">
                          <ImageIcon size={64} />
                          <span className="text-[10px] font-black uppercase tracking-[0.5em]">NULL_SIGNATURE</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <Activity size={48} className="text-white animate-pulse" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => { setMediaTarget('logo'); setShowMediaModal(true); }} className="flex items-center justify-center gap-3 bg-white text-slate-950 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95 group/btn overflow-hidden relative">
                         <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                         <Database size={16} className="relative z-10" /> <span className="relative z-10">Vault</span>
                      </button>
                      <label className="flex items-center justify-center gap-3 bg-white/5 border-2 border-white/10 text-white py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all cursor-pointer active:scale-95">
                        <RefreshCw size={16} /> Sync
                        <input type="file" name="logo" accept="image/*" onChange={(e) => handleFile(e, setLogoPreview)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Favicon Display Module */}
                  <div className="space-y-6">
                    <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] ml-2">Process Node Icon (Favicon)</label>
                    <div className="flex items-center gap-8">
                      <div className="w-28 h-28 bg-slate-900 rounded-[2rem] border-4 border-white/5 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl group/favicon relative">
                        {faviconPreview ? (
                          <img src={faviconPreview} alt="Favicon" className="w-[60%] h-[60%] object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                        ) : (
                          <Sparkles size={32} className="text-white/10 animate-pulse" />
                        )}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/favicon:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <button type="button" onClick={() => { setMediaTarget('favicon'); setShowMediaModal(true); }} className="bg-white/90 text-slate-950 py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] shadow-xl hover:bg-white transition-all active:scale-95">Registry Hub</button>
                        <label className="bg-white/5 border border-white/10 text-white py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] text-center cursor-pointer hover:bg-white/10 active:scale-95 transition-all">
                          Local Vector
                          <input type="file" name="favicon" accept="image/*" onChange={(e) => handleFile(e, setFaviconPreview)} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Style Engine Module */}
              <motion.section 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm overflow-hidden group hover:border-primary/20 transition-all duration-700"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h3 className="text-[10px] font-black mb-8 text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] flex items-center gap-4">
                   <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                        <Palette size={18} />
                   </div>
                   Style Engine
                </h3>
                <div className="p-8 bg-background-site/50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/30 space-y-8 relative z-10 transition-all group-hover:bg-background-site dark:group-hover:bg-slate-950">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tight leading-relaxed italic border-l-4 border-primary/20 pl-6">Customize the high-fidelity palette across the frontend ecosystem nodes.</p>
                  <Link 
                    to="/admin/theme-editor"
                    className="group/styler w-full flex items-center justify-center gap-4 px-8 py-6 bg-primary text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-3xl shadow-primary/30 hover:bg-black hover:-translate-y-2 transition-all active:scale-95 relative overflow-hidden"
                  >
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/styler:translate-x-0 transition-transform duration-700" />
                        <span className="relative z-10 uppercase tracking-[0.8em]">Launch_Styler</span>
                        <Zap size={16} className="relative z-10 animate-pulse" />
                  </Link>
                </div>
              </motion.section>

              {/* Commit Console Controller */}
              <button
                type="submit"
                disabled={saving}
                className="group/submit w-full py-8 bg-primary text-white rounded-[3.5rem] font-black text-[12px] uppercase tracking-[0.6em] shadow-3xl shadow-primary/40 hover:bg-black hover:-translate-y-3 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/submit:translate-x-0 transition-transform duration-700" />
                {saving ? (
                  <><RefreshCw className="animate-spin" size={28} /> <span>STREAMS_ACTIVE...</span></>
                ) : (
                  <><Save size={28} className="relative z-10" /> <span className="relative z-10">COMMIT_MASTER_MANIFEST</span></>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* --- MEDIA MODAL MATRIX --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMediaModal(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col" >
              <div className="p-10 md:p-12 border-b border-primary/10 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-primary text-white rounded-3xl shadow-2xl">
                    <Database size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Registry Matrix</h3>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-1">Select visual identity asset</p>
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
                      const isSelected = mediaTarget === 'logo' ? selectedLogoMediaId === item.id : selectedFaviconMediaId === item.id;
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
      <footer className="max-w-7xl mx-auto mt-32 text-center border-t border-slate-100 dark:border-slate-800/10 pt-16 flex flex-col items-center gap-10 relative z-10 opacity-30">
        <div className="flex items-center gap-8 filter grayscale hover:grayscale-0 transition-all duration-1000">
            <Shield size={28} className="text-primary" />
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Activity size={28} className="text-primary animate-pulse" />
        </div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.8em]">
           Master Manifest Control Layer: <span className="text-primary italic">SIGMA-WEB-V5</span>
        </p>
      </footer>
    </div>
  );
}