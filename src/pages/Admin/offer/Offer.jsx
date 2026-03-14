// src/pages/admin/Offer.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, List, Download, MoreVertical, Upload, Trash2, Edit, Loader2, X, 
  Image as ImageIcon, RotateCcw, CheckCircle, Tag, Plus, Layout
} from 'lucide-react';
import api from '../../../lib/api';

export default function Offer() {
  const [activeTab, setActiveTab] = useState('Offers');
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    offerType: '',
    type: '',
    isActivePopup: false,
    mediaId: null,
    preview: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => { fetchOffers(); }, []);
  useEffect(() => { if (showMediaModal) fetchMediaItems(); }, [showMediaModal]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/offers');
      setOffers(res.data.offers || []);
    } catch (err) {
      setError('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err) { console.error(err); }
    finally { setMediaLoading(false); }
  };

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${item.path}${item.name}`;
    const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
    setFormData(prev => ({ ...prev, mediaId: item.id, preview: fullUrl }));
    setShowMediaModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'isActivePopup' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mediaId) return setError('Please select an image');
    setSubmitting(true);
    try {
      await api.post('/admin/offers', { ...formData, media_id: formData.mediaId });
      setFormData({ offerType: '', type: '', isActivePopup: false, mediaId: null, preview: null });
      fetchOffers();
    } catch (err) { setError('Failed to add offer'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    try {
      await api.delete(`/admin/offers/${id}`);
      fetchOffers();
    } catch (err) { setError('Failed to delete offer'); }
  };

  const filteredOffers = offers.filter(offer => 
    activeTab === 'Offers' ? !offer.isActivePopup : offer.isActivePopup
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500">
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Layout size={14} />
            <span>Marketing Engine</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Offer Matrix</h1>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] border border-indigo-500/20">
          <CheckCircle size={16} className="animate-pulse" />
          Live Campaign Broadcast
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* LEFT: MANAGEMENT FORM */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-6 transition-all duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30">
              <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <Plus size={18} />
                </div>
                Draft Campaign
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3">
                  <X size={16} /> {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-2 tracking-[0.2em]">Campaign Category</label>
                <select 
                  name="offerType" required value={formData.offerType} onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl p-4 text-sm font-bold text-slate-900 dark:text-white outline-none transition-all cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="categories">Category Highlight</option>
                  <option value="products">Product Spotlight</option>
                  <option value="orders">Checkout Offers</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-2 tracking-[0.2em]">Target Identifier</label>
                <input
                  name="type" required type="text" value={formData.type} onChange={handleInputChange}
                  placeholder="e.g. FLASH_2026"
                  className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl p-4 text-sm font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-2 tracking-[0.2em]">Banner Creative</label>
                <div className="group">
                  {formData.preview ? (
                    <div className="relative rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-slate-900 group shadow-lg">
                      <img src={formData.preview} className="w-full h-48 object-cover opacity-80 group-hover:opacity-60 transition-opacity" alt="Preview" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, mediaId: null, preview: null }))}
                          className="bg-rose-500 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                          <X size={24} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setShowMediaModal(true)}
                      className="w-full h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 hover:border-indigo-500/50 transition-all group">
                      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform border border-slate-100 dark:border-slate-800 text-indigo-600 dark:text-indigo-400">
                        <Upload size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Access Global Assets</span>
                    </button>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 cursor-pointer transition-all">
                <div className="relative">
                  <input type="checkbox" name="isActivePopup" checked={formData.isActivePopup} onChange={handleInputChange}
                    className="appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-800 checked:bg-indigo-600 dark:checked:bg-indigo-500 checked:border-transparent transition-all cursor-pointer" />
                  {formData.isActivePopup && <CheckCircle size={14} className="absolute inset-0 m-auto text-white pointer-events-none" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Active Popup Mode</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Overlay on visitor entry</span>
                </div>
              </label>

              <button type="submit" disabled={submitting || !formData.mediaId}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-300 dark:disabled:text-slate-600 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                Deploy Campaign
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: DATA DISPLAY */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20">
              <div className="flex bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                {['Offers', 'Popup offers'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-lg' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
                    }`}>
                    {tab === 'Offers' ? 'Standard Banners' : 'Active Popups'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Filter node..." 
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-xl text-xs font-bold font-mono outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                </div>
                <button onClick={fetchOffers} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                  <RotateCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-950/50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Campaign Node</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Visual DNA</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">Configuration</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {loading ? (
                    <tr><td colSpan="4" className="py-32 text-center"><Loader2 className="animate-spin mx-auto text-indigo-500 h-10 w-10" /></td></tr>
                  ) : filteredOffers.length === 0 ? (
                    <tr><td colSpan="4" className="py-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Zero active protocols found.</td></tr>
                  ) : filteredOffers.map((offer) => (
                    <tr key={offer.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 dark:text-white text-base font-mono tracking-tighter">#{offer.id}</span>
                          <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 w-fit px-2 py-0.5 rounded-lg mt-1 uppercase tracking-widest border border-indigo-500/10">
                            {offer.offerType}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="relative w-32 h-16 rounded-2xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800 group/img bg-slate-900">
                          <img src={`${baseUrl}${offer.image_url}`} className="w-full h-full object-cover opacity-90 group-hover/img:scale-110 transition-transform duration-500" alt="Offer" />
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                            <Tag size={12} className="text-indigo-500" /> {offer.type}
                          </div>
                          <div className={`text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${offer.isActivePopup ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-700'}`}>
                            <div className={`h-1.5 w-1.5 rounded-full ${offer.isActivePopup ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                            {offer.isActivePopup ? 'Active Popup' : 'Banner Static'}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(offer.id)} className="p-3 text-slate-400 hover:text-rose-600 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-transparent hover:border-rose-100 dark:hover:border-rose-950 transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
          <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl w-full max-w-6xl max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Neural Library</h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Select visual DNA for campaign</p>
              </div>
              <button 
                onClick={() => setShowMediaModal(false)} 
                className="p-3 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-2xl transition-all border border-transparent hover:border-rose-500/20"
              >
                <X size={24}/>
              </button>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Query assets..." 
                  value={mediaSearch} 
                  onChange={(e) => setMediaSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl text-[0.9375rem] font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 font-mono" 
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/20 dark:bg-slate-950/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                  const isSelected = formData.mediaId === item.id;
                  const imageUrl = item.thumbnail || `${item.path}${item.name}`;
                  const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                  
                  return (
                    <div key={item.id} onClick={() => selectMediaItem(item)}
                      className={`relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group transition-all duration-300 ${
                        isSelected ? 'ring-[6px] ring-indigo-500 ring-offset-4 dark:ring-offset-slate-900 scale-[0.95]' : 'hover:scale-[1.05]'
                      }`}>
                      <img src={fullUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" alt={item.name} />
                      <div className={`absolute inset-0 bg-indigo-600/40 flex items-center justify-center transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <CheckCircle className="text-white drop-shadow-2xl" size={48} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <p className="text-white text-[10px] font-black uppercase tracking-tighter truncate">{item.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end gap-4">
              <button 
                onClick={() => setShowMediaModal(false)} 
                className="px-8 py-4 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-950 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
              >
                Close Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}