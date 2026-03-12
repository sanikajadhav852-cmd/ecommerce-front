// src/pages/admin/OfferSlider.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Upload, Trash2, X, CheckCircle, Image as ImageIcon, RotateCcw, ArrowUp, ArrowDown 
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
    console.log('Fetched slider sections:', res.data.sliders);
    setSliderSections(res.data.sliders || []);
  } catch (err) {
    console.error('Failed to fetch slider sections:', err.response?.data || err);
    setSliderSections([]); // clear on error to avoid stale data
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

    // Prevent duplicates
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

    // Send POST request
    const response = await api.post('/admin/offer-sliders', {
      style: formData.style,
      media_ids: mediaIds
    });

    // Log success for debugging
    console.log('Slider section added:', response.data);

    alert('Offer slider section added successfully!');

    // Clear form
    setFormData({ style: '', selectedMedia: [] });

    // Wait a tiny moment (200–500ms) for DB to commit, then refresh
    setTimeout(() => {
      fetchSliderSections();
    }, 500);  // 500ms delay — adjust to 300 or 1000 if needed

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
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700">Manage offer slider</h2>
        <div className="text-sm text-gray-500">
          Home / <span className="text-slate-700">Offer slider</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style <span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-purple-400 outline-none text-sm"
                  value={formData.style}
                  onChange={e => setFormData({...formData, style: e.target.value})}
                  required
                >
                  <option value="">Select Style</option>
                  <option value="Style 1">Style 1</option>
                  <option value="Style 2">Style 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Offers/Sliders <span className="text-red-500">*</span>
                </label>

                <div className="mt-2 space-y-3">
                  {formData.selectedMedia.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {formData.selectedMedia.map((m, i) => (
                        <div key={i} className="relative">
                          <img 
                            src={m.preview} 
                            alt="selected" 
                            className="w-full h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeSelected(m.id)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">No images selected yet</div>
                  )}

                  <button
                    type="button"
                    onClick={openMediaSelector}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 transition-colors"
                  >
                    + Add Slider Image from Media Library
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  type="reset"
                  onClick={() => setFormData({ style: '', selectedMedia: [] })}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Reset
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Add Offer Slider Section
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT: Table */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Offer Slider Sections</h3>
              <button onClick={fetchSliderSections} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <RotateCw size={18} />
              </button>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500">
                <RotateCcw className="animate-spin inline-block mr-2" /> Loading...
              </div>
            ) : sliderSections.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No slider sections yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-xs uppercase text-gray-400 font-bold border-b">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Style</th>
                      <th className="px-6 py-4">Images</th>
                      <th className="px-6 py-4">Created</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliderSections.map((s) => (
                      <tr key={s.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">#{s.id}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
                            {s.style}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <ImageIcon size={14} className="text-gray-400" />
                            <span className="text-sm font-medium">{s.media_ids.length}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex justify-center">
                            <button 
                              onClick={() => handleDelete(s.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors group"
                            >
                              <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                            </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {showMediaModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowMediaModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-semibold">Select Slider Images</h3>
              <button onClick={() => setShowMediaModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={mediaSearch}
                  onChange={e => setMediaSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
              {mediaLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <RotateCcw size={32} className="animate-spin mb-3 text-purple-600" />
                  <p>Loading media...</p>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ImageIcon size={64} className="mb-4 opacity-50" />
                  <p>{mediaSearch ? 'No matching images' : 'No images uploaded'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map(item => {
                    const url = item.thumbnail || `${item.sub_directory}${item.name}`;
                    const full = url.startsWith('http') ? url : `${baseUrl}/${url.replace(/^\/+/, '')}`;
                    const selected = formData.selectedMedia.some(m => m.id === item.id);

                    return (
                      <div 
                        key={item.id}
                        onClick={() => selectMediaItem(item)}
                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selected ? 'border-purple-600 scale-105 shadow-lg' : 'border-gray-200 hover:border-purple-400'
                        }`}
                      >
                        <img src={full} alt={item.name} className="w-full aspect-square object-cover" />
                        {selected && (
                          <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                            <CheckCircle size={48} className="text-white" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end gap-4">
              <button 
                onClick={() => setShowMediaModal(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowMediaModal(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Done ({formData.selectedMedia.length} selected)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}