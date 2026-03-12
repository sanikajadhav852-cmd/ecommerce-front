
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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ListOrdered className="text-purple-600" />
            Arrange Offer Sections
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Drag-style ordering: Use arrows to define the sequence sections appear on the homepage.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchSections}
            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            title="Refresh list"
          >
            <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <button
            onClick={handleSaveOrder}
            disabled={saving || sections.length === 0}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all ${
              saving 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95'
            }`}
          >
            {saving ? 'Saving...' : (
              <>
                <Save size={18} />
                Save New Order
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border animate-in fade-in slide-in-from-top-2 ${
          message.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
            : 'bg-rose-50 border-rose-100 text-rose-700'
        }`}>
          <CheckCircle2 size={20} />
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Sections List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-medium">Loading your sections...</p>
          </div>
        ) : sections.length === 0 ? (
          <div className="p-20 text-center">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Layout size={32} />
            </div>
            <p className="text-slate-500 font-medium text-lg">No sections found to order</p>
            <p className="text-slate-400 text-sm">Add sections in Offer Slider settings first.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                className="group flex items-center p-4 hover:bg-slate-50/80 transition-colors"
              >
                {/* Grip Visual */}
                <div className="mr-4 text-slate-300 group-hover:text-purple-300 transition-colors">
                  <GripVertical size={20} />
                </div>

                {/* Counter */}
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs mr-4">
                  {index + 1}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">
                    {section.style || 'Default Style'} Section
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">ID: #{section.id}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                    <span className="text-xs text-purple-500 font-medium">
                      {section.media_ids?.length || 0} Images
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className={`p-2 rounded-lg border transition-all ${
                      index === 0 
                        ? 'bg-slate-50 text-slate-200 border-slate-100 cursor-not-allowed' 
                        : 'bg-white text-slate-600 border-slate-200 hover:text-purple-600 hover:border-purple-200 hover:shadow-sm'
                    }`}
                  >
                    <ArrowUp size={18} />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === sections.length - 1}
                    className={`p-2 rounded-lg border transition-all ${
                      index === sections.length - 1 
                        ? 'bg-slate-50 text-slate-200 border-slate-100 cursor-not-allowed' 
                        : 'bg-white text-slate-600 border-slate-200 hover:text-purple-600 hover:border-purple-200 hover:shadow-sm'
                    }`}
                  >
                    <ArrowDown size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-purple-50 rounded-2xl border border-purple-100 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm flex-shrink-0">
          <Layout size={20} />
        </div>
        <div>
          <h5 className="font-bold text-purple-900 leading-tight">Pro Tip</h5>
          <p className="text-purple-700 text-sm mt-1 leading-relaxed">
            The order set here is reflected instantly on the website. Use "Style 1" for large carousels and "Style 2" for compact grid displays to keep the homepage dynamic.
          </p>
        </div>
      </div>
    </div>
  );
}
