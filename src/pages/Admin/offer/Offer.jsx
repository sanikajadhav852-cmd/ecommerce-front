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

  const filteredOffers = offers.filter(offer => 
    activeTab === 'Offers' ? !offer.isActivePopup : offer.isActivePopup
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-[1.5rem] lg:p-[2rem] font-sans">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-[1rem] mb-[2.5rem]">
        <div>
          <h1 className="text-[1.75rem] font-bold text-slate-900 tracking-tight">Marketing Offers</h1>
          <p className="text-slate-500 text-[0.875rem] mt-[0.25rem]">Manage promotional banners and popup advertisements</p>
        </div>
        <div className="flex items-center gap-[0.75rem] text-[0.875rem]">
          <span className="text-slate-400">Dashboard</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-indigo-600">Offers</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-[2rem]">
        {/* LEFT: Management Form */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-[1.25rem] shadow-sm border border-slate-200 overflow-hidden sticky top-[2rem]">
            <div className="p-[1.5rem] border-b border-slate-100 bg-slate-50/50">
              <h2 className="flex items-center gap-[0.5rem] font-semibold text-slate-800">
                <Plus size={18} className="text-indigo-600" />
                Create New Offer
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-[1.5rem] space-y-[1.25rem]">
              {error && (
                <div className="p-[0.75rem] bg-red-50 border border-red-100 text-red-600 rounded-[0.5rem] text-[0.813rem] flex items-center gap-2">
                  <X size={14} /> {error}
                </div>
              )}

              <div className="space-y-[0.5rem]">
                <label className="text-[0.813rem] font-semibold text-slate-700 uppercase tracking-wider">Campaign Category</label>
                <select 
                  name="offerType" required value={formData.offerType} onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[0.75rem] p-[0.75rem] text-[0.875rem] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="categories">Category Highlight</option>
                  <option value="products">Product Spotlight</option>
                  <option value="orders">Checkout Offers</option>
                </select>
              </div>

              <div className="space-y-[0.5rem]">
                <label className="text-[0.813rem] font-semibold text-slate-700 uppercase tracking-wider">Target identifier</label>
                <input
                  name="type" required type="text" value={formData.type} onChange={handleInputChange}
                  placeholder="e.g. SUMMER_SALE_2024"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[0.75rem] p-[0.75rem] text-[0.875rem] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-[0.5rem]">
                <label className="text-[0.813rem] font-semibold text-slate-700 uppercase tracking-wider">Banner Creative</label>
                <div className="relative group">
                  {formData.preview ? (
                    <div className="relative rounded-[1rem] overflow-hidden border border-slate-200 shadow-inner">
                      <img src={formData.preview} className="w-full h-[12rem] object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, mediaId: null, preview: null }))}
                          className="bg-white/20 backdrop-blur-md text-white p-[0.5rem] rounded-full hover:bg-red-500 transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setShowMediaModal(true)}
                      className="w-full h-[10rem] border-2 border-dashed border-slate-200 rounded-[1rem] flex flex-col items-center justify-center gap-[0.5rem] bg-slate-50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all group">
                      <div className="p-[0.75rem] bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                        <Upload size={24} className="text-indigo-600" />
                      </div>
                      <span className="text-[0.813rem] text-slate-500 font-medium">Browse Media Gallery</span>
                    </button>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-[0.75rem] p-[1rem] bg-slate-50 rounded-[0.75rem] cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" name="isActivePopup" checked={formData.isActivePopup} onChange={handleInputChange}
                  className="w-[1.125rem] h-[1.125rem] rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-[0.875rem] font-medium text-slate-700">Display as Popup</span>
                  <span className="text-[0.75rem] text-slate-500">Enable this to show as an overlay on site entry</span>
                </div>
              </label>

              <button type="submit" disabled={submitting || !formData.mediaId}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-[0.875rem] rounded-[0.75rem] font-semibold text-[0.875rem] transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2">
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                Publish Offer
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Table & Tabs */}
        <div className="xl:col-span-8 space-y-[1.5rem]">
          <div className="bg-white rounded-[1.25rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center p-[1rem] gap-[1rem] border-b border-slate-100">
              <div className="flex bg-slate-100 p-[0.25rem] rounded-[0.75rem]">
                {['Offers', 'Popup offers'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-[1.25rem] py-[0.5rem] rounded-[0.625rem] text-[0.813rem] font-semibold transition-all ${
                      activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}>
                    {tab === 'Offers' ? 'Standard Banners' : 'Active Popups'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-[0.75rem] w-full sm:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-[0.75rem] top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Filter campaigns..." 
                    className="pl-[2.25rem] pr-[1rem] py-[0.5rem] border border-slate-200 rounded-[0.625rem] text-[0.875rem] w-full focus:ring-2 focus:ring-indigo-500/10 outline-none" />
                </div>
                <button onClick={fetchOffers} className="p-[0.625rem] bg-white border border-slate-200 rounded-[0.625rem] text-slate-600 hover:bg-slate-50 transition-colors">
                  <RotateCw size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 text-left">
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-bold text-slate-500 uppercase tracking-wider">Campaign Info</th>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-bold text-slate-500 uppercase tracking-wider">Visual Asset</th>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-bold text-slate-500 uppercase tracking-wider">Configuration</th>
                    <th className="px-[1.5rem] py-[1rem] text-[0.75rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan="4" className="py-[5rem] text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" /></td></tr>
                  ) : filteredOffers.length === 0 ? (
                    <tr><td colSpan="4" className="py-[5rem] text-center text-slate-400">No active campaigns found in this category.</td></tr>
                  ) : filteredOffers.map((offer) => (
                    <tr key={offer.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-[1.5rem] py-[1.25rem]">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-[0.938rem]">#{offer.id}</span>
                          <span className="text-[0.75rem] text-indigo-600 font-medium bg-indigo-50 w-fit px-2 py-0.5 rounded mt-1 uppercase tracking-tighter">
                            {offer.offerType}
                          </span>
                        </div>
                      </td>
                      <td className="px-[1.5rem] py-[1.25rem]">
                        <img src={`${baseUrl}${offer.image_url}`} className="h-[3.5rem] w-[7rem] object-cover rounded-[0.5rem] border border-slate-200 shadow-sm" alt="Offer" />
                      </td>
                      <td className="px-[1.5rem] py-[1.25rem]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[0.813rem] text-slate-600">
                            <Tag size={12} /> {offer.type}
                          </div>
                          <div className={`text-[0.75rem] font-medium ${offer.isActivePopup ? 'text-green-600' : 'text-slate-400'}`}>
                            {offer.isActivePopup ? '• Active Popup' : '• Banner Display'}
                          </div>
                        </div>
                      </td>
                      <td className="px-[1.5rem] py-[1.25rem] text-right">
                        <div className="flex justify-end gap-[0.5rem]">
                          <button className="p-[0.5rem] text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-[0.5rem] transition-all">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(offer.id)} className="p-[0.5rem] text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-[0.5rem] transition-all">
                            <Trash2 size={18} />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[1rem]">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMediaModal(false)} />
          <div className="relative bg-white rounded-[1.5rem] shadow-2xl w-full max-w-[65rem] max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-[1.5rem] border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-[1.25rem] font-bold text-slate-800">Media Library</h3>
              <button onClick={() => setShowMediaModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-[1rem] border-b">
              <div className="relative">
                <Search className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search images..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)}
                  className="w-full pl-[3rem] pr-[1rem] py-[0.75rem] bg-slate-100 border-none rounded-[0.75rem] focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-[1.5rem] bg-slate-50">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[1rem]">
                {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                  const isSelected = formData.mediaId === item.id;
                  const imageUrl = item.thumbnail || `${item.path}${item.name}`;
                  const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                  
                  return (
                    <div key={item.id} onClick={() => selectMediaItem(item)}
                      className={`relative aspect-square rounded-[1rem] overflow-hidden cursor-pointer group transition-all ${
                        isSelected ? 'ring-4 ring-indigo-500 ring-offset-2 scale-[0.98]' : 'hover:scale-[1.02] shadow-sm'
                      }`}>
                      <img src={fullUrl} className="w-full h-full object-cover" alt={item.name} />
                      <div className={`absolute inset-0 bg-indigo-600/20 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <CheckCircle className="text-white drop-shadow-md" size={32} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-[0.625rem] truncate font-medium">{item.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-[1.25rem] border-t bg-white flex justify-end gap-[1rem]">
              <button onClick={() => setShowMediaModal(false)} className="px-[1.5rem] py-[0.625rem] text-slate-600 font-semibold hover:bg-slate-100 rounded-[0.75rem] transition-all">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}