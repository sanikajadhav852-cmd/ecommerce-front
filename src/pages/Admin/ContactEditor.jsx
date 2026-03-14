// src/pages/admin/ContactEditor.jsx
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import {
  Save, RotateCcw, AlertCircle, CheckCircle, Edit2, Image as ImageIcon, Loader2,
  Phone, Mail, MapPin, Clock, Globe, Zap, MessageSquare, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState({
    phone: '',
    email: '',
    address: '',
    business_hours: [
      { days: '', time: '' },
      { days: '', time: '' }
    ],
    response_time: '',
    map_image_url: '',
    hero_title: '',
    hero_description: '',
    form_success_msg: ''
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/contact');
      setData(res.data || {});
    } catch (err) {
      console.error('Contact fetch error:', err);
      setError('Failed to load Contact page data.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value, index = null) => {
    setData(prev => {
      if (index !== null) {
        const updated = [...prev.business_hours];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, business_hours: updated };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      await api.put('/contact', data);
      setSuccess('Contact page updated successfully!');
      fetchContactData();
    } catch (err) {
      setError('Failed to update Contact page.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Globe size={14} className="animate-pulse" />
            <span>Communication Nodes</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Contact Editor</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchContactData}
            className="p-4 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-2xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
            disabled={saving}
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Synchronize Node
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 bg-rose-500/10 border-2 border-rose-500/20 rounded-[2rem] flex items-center gap-4 text-rose-500">
              <AlertCircle size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-[2rem] flex items-center gap-4 text-emerald-500">
              <CheckCircle size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Hero & Narrative */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Hero Configuration */}
            <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
              <h2 className="text-xs font-black mb-10 text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] flex items-center gap-4">
                 <Edit2 size={18} />
                 Front-End Narrative
              </h2>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Landing Hero Title</label>
                  <input
                    value={data.hero_title}
                    onChange={e => handleChange('hero_title', e.target.value)}
                    className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1.125rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner"
                    placeholder="Initialize mission contact protocol..."
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Engagement Description</label>
                  <textarea
                    value={data.hero_description}
                    onChange={e => handleChange('hero_description', e.target.value)}
                    rows={4}
                    className="w-full px-8 py-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-[2.5rem] text-[1rem] font-bold text-slate-900 dark:text-white transition-all outline-none shadow-inner resize-none leading-relaxed"
                    placeholder="Define the primary contact narrative..."
                  />
                </div>
              </div>
            </section>

            {/* Contact Parameters */}
            <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
              <h2 className="text-xs font-black mb-10 text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] flex items-center gap-4">
                 <Mail size={18} />
                 Connection Vectors
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Direct Voice Line</label>
                  <div className="relative group">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      value={data.phone} 
                      onChange={e => handleChange('phone', e.target.value)} 
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Digital Mail Node</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      value={data.email} 
                      onChange={e => handleChange('email', e.target.value)} 
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[1rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner" 
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Physical Coordinate Map</label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-8 text-slate-300 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <textarea 
                      value={data.address} 
                      onChange={e => handleChange('address', e.target.value)} 
                      rows={3} 
                      className="w-full pl-16 pr-8 py-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-[2.5rem] text-[1rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner resize-none leading-relaxed" 
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Temporal & Feedback */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Temporal Availability */}
            <section className="bg-indigo-950 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden group border border-indigo-900">
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-white/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
              <h2 className="text-xl font-black mb-10 text-white uppercase tracking-tight relative z-10 flex items-center gap-3">
                 <Clock size={20} /> Operational Cycle
              </h2>
              <div className="space-y-6 relative z-10">
                {data.business_hours.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                     <label className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] ml-2">Phase {idx + 1}</label>
                     <div className="grid grid-cols-1 gap-3">
                        <input
                          placeholder="DAYS: MON - FRI"
                          value={item.days}
                          onChange={e => handleChange('days', e.target.value, idx)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[0.8rem] font-black text-white uppercase tracking-widest outline-none focus:bg-white/10 transition-colors"
                        />
                        <input
                          placeholder="TIME: 09:00 - 18:00"
                          value={item.time}
                          onChange={e => handleChange('time', e.target.value, idx)}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[0.8rem] font-black text-white uppercase tracking-widest outline-none focus:bg-white/10 transition-colors"
                        />
                     </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Response Mechanics */}
            <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-8">
               <h3 className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-3">
                  <Zap size={16} /> Data Response
               </h3>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Average Response Latency</label>
                  <input 
                    value={data.response_time} 
                    onChange={e => handleChange('response_time', e.target.value)} 
                    placeholder="e.g. 24 HOURS"
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[0.875rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Universal Success Message</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 group-focus-within:text-indigo-500 transition-colors" size={16} />
                    <input 
                      value={data.form_success_msg} 
                      onChange={e => handleChange('form_success_msg', e.target.value)} 
                      placeholder="Message dispatched successfully."
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[0.875rem] font-black text-slate-900 dark:text-white transition-all outline-none shadow-inner" 
                    />
                  </div>
               </div>
            </section>

          </div>

        </div>

        {/* --- MAP INTEGRATION NODE --- */}
        <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm overflow-hidden group">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-4">
                 <MapPin size={18} />
                 Geospatial Visualization Anchor
              </h3>
           </div>
           <div className="relative group/map">
              <ImageIcon size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
              <input 
                value={data.map_image_url} 
                onChange={e => handleChange('map_image_url', e.target.value)} 
                placeholder="Secure Google Maps Static URL Protocol..."
                className="w-full pl-16 pr-8 py-6 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-[2.5rem] text-[1rem] font-bold text-slate-900 dark:text-white transition-all outline-none shadow-inner" 
              />
           </div>
           <div className="mt-8 flex items-center justify-center p-12 bg-slate-50 dark:bg-slate-950/50 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4 text-slate-300 dark:text-slate-700">
                 <Globe size={40} strokeWidth={1} />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Map Visualization Node Standby</span>
              </div>
           </div>
        </section>

      </main>

      {/* --- SITE FOOTER --- */}
      <footer className="text-center opacity-10 pointer-events-none mt-20 pb-10">
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
          CONTACT-MANIFEST-INTERFACE-V4.2 [STABLE]
        </p>
      </footer>

    </div>
  );
}