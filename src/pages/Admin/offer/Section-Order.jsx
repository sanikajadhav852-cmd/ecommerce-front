import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, ArrowDown, Save, RotateCw, Layout, 
  GripVertical, ListOrdered, CheckCircle2 
} from 'lucide-react';
import api from '../../../lib/api';

export default function SectionOrder() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/offer-sliders');
      // Already sorted by row_order from backend
      setSections(res.data.sliders || []);
    } catch (err) {
      console.error('Failed to fetch sections:', err);
    } finally {
      setLoading(false);
    }
  };

  const moveItem = (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setSections(newSections);
  };

  const handleSaveOrder = async () => {
    try {
      setSaving(true);
      const orders = sections.map((s, i) => ({ id: s.id, row_order: i + 1 }));
      await api.put('/admin/offer-sliders/order', { orders });
      
      setMessage({ type: 'success', text: 'Section order updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
      fetchSections();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to update section order.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500">
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <RotateCw size={14} className="animate-spin-slow" />
            <span>Logic Engine</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Sequence Master</h1>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 w-fit rounded-lg border border-slate-200 dark:border-slate-800">
            Node Priority Protocol
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchSections}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
          >
            <RotateCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <button
            onClick={handleSaveOrder}
            disabled={saving || sections.length === 0}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-300 dark:disabled:text-slate-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3"
          >
            {saving ? <RotateCw className="animate-spin" size={16} /> : <Save size={16} />}
            Synchronize Order
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status Message */}
        {message && (
          <div className={`p-5 rounded-2xl border animate-in fade-in slide-in-from-top-4 flex items-center gap-4 ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
          }`}>
            <CheckCircle2 size={20} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">{message.text}</span>
          </div>
        )}

        {/* Sections List */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20 flex items-center gap-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
              <GripVertical size={20} />
            </div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Home Sector Layout</h3>
          </div>

          {loading ? (
            <div className="p-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <RotateCw className="animate-spin inline-block h-10 w-10 mb-6 text-indigo-500" />
              <br />Defragmenting Sequences...
            </div>
          ) : sections.length === 0 ? (
            <div className="p-32 text-center">
              <div className="bg-slate-50 dark:bg-slate-950 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 dark:text-slate-800 border-2 border-dashed border-slate-100 dark:border-slate-900">
                <Layout size={40} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">Zero active layouts detected in sector</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {sections.map((section, index) => (
                <div 
                  key={section.id} 
                  className="group flex items-center px-8 py-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
                >
                  {/* Grip Visual */}
                  <div className="mr-6 text-slate-200 dark:text-slate-800 group-hover:text-indigo-400 transition-colors">
                    <GripVertical size={24} />
                  </div>

                  {/* Counter */}
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs mr-6 border border-indigo-500/10 shadow-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-black text-slate-900 dark:text-white text-base tracking-tight">
                      {section.style || 'Default Node'} Sequence
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 font-mono">
                      <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Core: #{section.id}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <span className="text-[9px] font-black text-indigo-500/70 uppercase tracking-widest">
                        {section.media_ids?.length || 0} Frames Loaded
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className={`p-3 rounded-xl border transition-all ${
                        index === 0 
                          ? 'bg-slate-50 dark:bg-slate-950 text-slate-200 dark:text-slate-800 border-slate-100 dark:border-slate-900 cursor-not-allowed' 
                          : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 shadow-sm'
                      }`}
                    >
                      <ArrowUp size={20} />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === sections.length - 1}
                      className={`p-3 rounded-xl border transition-all ${
                        index === sections.length - 1 
                          ? 'bg-slate-50 dark:bg-slate-950 text-slate-200 dark:text-slate-800 border-slate-100 dark:border-slate-900 cursor-not-allowed' 
                          : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 shadow-sm'
                      }`}
                    >
                      <ArrowDown size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white flex gap-6 items-center shadow-2xl shadow-indigo-600/30 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute left-0 bottom-0 w-24 h-24 bg-indigo-400/10 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shadow-inner flex-shrink-0 backdrop-blur-md border border-white/20">
            <Layout size={28} className="animate-pulse" />
          </div>
          <div className="space-y-1">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">System Protocol Warning</h5>
            <p className="font-bold text-sm leading-relaxed max-lg">
              Sequence adjustments are synchronized in real-time. Ensure "Style 1" occupies primary high-traffic sectors while "Style 2" maintains compact grid distribution for optimal engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
