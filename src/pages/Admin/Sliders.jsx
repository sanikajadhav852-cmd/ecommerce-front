// src/pages/admin/Sliders.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Trash2, Loader2, Plus, Minus, X, CheckCircle, 
  Image as ImageIcon, RotateCcw 
} from 'lucide-react';
import api from '../../lib/api';

export default function Sliders() {
  const [sliders, setSliders] = useState([]);          // Left: current selection/preparation
  const [liveSliders, setLiveSliders] = useState([]);  // Right: what is actually live on home page
  const [sliderCount, setSliderCount] = useState(3);   // Max allowed on home
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [countLoading, setCountLoading] = useState(true);

  // Media modal states
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSliderCount();
    fetchExistingSliders();   // left side: your current working set
    fetchLiveSliders();       // right side: what's actually live on home
  }, []);

  // Fetch max slider count from settings
  const fetchSliderCount = async () => {
    try {
      setCountLoading(true);
      const res = await api.get('/admin/settings/slider-count');
      setSliderCount(res.data.slider_count || 3);
    } catch (err) {
      console.error('Failed to load slider count:', err);
    } finally {
      setCountLoading(false);
    }
  };

  // Update max slider count
  const updateSliderCount = async (newCount) => {
    if (newCount < 1 || newCount > 10) return;
    try {
      await api.put('/admin/settings/slider-count', { slider_count: newCount });
      setSliderCount(newCount);
      alert(`Home page will now show up to ${newCount} slider(s)`);
      fetchLiveSliders(); // refresh right side
    } catch (err) {
      alert('Failed to update slider count');
    }
  };

  // Fetch your current working sliders (left side - what you're editing)
  const fetchExistingSliders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/sliders');
      const loaded = res.data.sliders.map(slider => ({
        mediaId: null, // not needed for display
        preview: slider.image_url || 'https://via.placeholder.com/128?text=No+Preview'
      }));
      setSliders(loaded.slice(0, sliderCount));
    } catch (err) {
      console.error('Failed to load existing sliders:', err);
      setError('Failed to load your current slider selection');
    } finally {
      setLoading(false);
    }
  };

  // Fetch live sliders shown on home page (right side preview)
  const fetchLiveSliders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/sliders');
      const loaded = res.data.sliders.map(slider => ({
        ...slider,
        image_url: slider.image_url || 'https://via.placeholder.com/160x96?text=No+Image'
      }));
      setLiveSliders(loaded);
    } catch (err) {
      console.error('Failed to load live sliders:', err);
      setError('Failed to load current home page sliders');
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
      console.error('Failed to load media:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const openMediaSelector = () => {
    if (sliders.length >= sliderCount) {
      alert(`You can only prepare up to ${sliderCount} sliders. Increase limit if needed.`);
      return;
    }
    setShowMediaModal(true);
    setMediaSearch('');
  };

const selectMediaItem = (item) => {
  // Log full object so we see real structure
  console.log('MEDIA ITEM SELECTED:', item);

  // Common ID fields in APIs
  const idValue = item.id || item._id || item.media_id || item.MediaID || item.ID || null;
  const mediaId = Number(idValue);

  if (isNaN(mediaId) || mediaId <= 0) {
    console.error('INVALID OR MISSING ID IN MEDIA ITEM:', item);
    alert('This image has no valid ID. Cannot add it. Check console.');
    return;
  }

  console.log('SUCCESS - Media ID:', mediaId);

  // Build preview path correctly
  let previewPath = '';
  if (item.thumbnail) previewPath = item.thumbnail;
  else if (item.sub_directory && item.name) {
    previewPath = `/${item.sub_directory.replace(/^\/+/, '')}${item.name}${item.extension ? '.' + item.extension : ''}`;
  } else if (item.path) {
    previewPath = item.path;
  }

  const fullPreview = previewPath.startsWith('http')
    ? previewPath
    : `${baseUrl}/${previewPath.replace(/^\/+/, '')}`;

  setSliders(prev => [
    ...prev,
    { mediaId, preview: fullPreview }
  ]);

  setShowMediaModal(false);
};

  const removeImage = (index) => {
    setSliders(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sliders.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setSubmitting(true);

    try {
     const rawMediaIds = sliders.map(img => img.mediaId);
console.log('Raw media IDs before cleaning:', rawMediaIds);

const cleanedMediaIds = rawMediaIds
  .filter(id => {
    const num = Number(id);
    return !isNaN(num) && num > 0;
  })
  .map(Number);

console.log('Cleaned media IDs:', cleanedMediaIds);

if (cleanedMediaIds.length === 0) {
  alert('No valid image IDs found after cleaning. Check console for raw IDs.');
  return;
}

      const payload = {
        type: 'default',
        media_ids: cleanedMediaIds
      };

      console.log('DEBUG - Final payload being sent:', payload);

      const response = await api.post('/admin/sliders', payload);

      console.log('Backend response:', response.data);

      alert(`Successfully added ${sliders.length} slider(s)!`);
      setSliders([]);              // clear left selection
      fetchExistingSliders();      // refresh left side
      fetchLiveSliders();          // refresh right side (live preview)
    } catch (err) {
      console.error('Full submit error:', err.response?.data, err);
      alert(err.response?.data?.message || 'Failed to add sliders');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Manage Home Page Sliders
        </h2>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Home / <span style={{ color: 'var(--text-primary)' }}>Sliders</span>
        </div>
      </div>

      {/* Slider Count Control */}
      <div 
        className="p-6 rounded-lg shadow-sm border"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--gray-light)',
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              Number of Sliders on Home Page
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Allowed: <strong>{sliderCount}</strong> • Live now: <strong>{liveSliders.length}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => updateSliderCount(sliderCount - 1)}
              disabled={sliderCount <= 1 || countLoading}
              className="p-2 rounded-full transition-colors disabled:opacity-50"
              style={{ backgroundColor: 'var(--gray-medium)', color: 'white' }}
            >
              <Minus size={20} />
            </button>
            <span className="text-xl font-bold w-10 text-center" style={{ color: 'var(--text-primary)' }}>
              {sliderCount}
            </span>
            <button
              onClick={() => updateSliderCount(sliderCount + 1)}
              disabled={sliderCount >= 10 || countLoading}
              className="p-2 rounded-full transition-colors disabled:opacity-50"
              style={{ backgroundColor: 'var(--gray-medium)', color: 'white' }}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Selection / Editing Area */}
        <div className="lg:col-span-4">
          <div 
            className="p-6 rounded-lg shadow-sm border"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--gray-light)',
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Prepare Slider Images ({sliders.length} / {sliderCount})
            </h3>

            {/* Current Selection Preview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {sliders.map((img, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                  <img
                    src={img.preview}
                    alt="Selected preview"
                    className="w-full h-32 object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/128?text=Preview+Missing'}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {sliders.length < sliderCount && (
                <button
                  type="button"
                  onClick={openMediaSelector}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  style={{ backgroundColor: 'var(--gray-light)' }}
                >
                  <Plus size={32} className="text-gray-500 mb-2" />
                  <span className="text-sm text-gray-600">Add Image</span>
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSliders([])}
                className="flex-1 py-2.5 rounded font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--gray-medium)',
                  color: 'white',
                }}
              >
                Reset Selection
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || sliders.length === 0}
                className="flex-1 py-2.5 rounded font-medium transition-colors disabled:opacity-60"
                style={{
                  backgroundColor: 'var(--secondary, #10b981)',
                  color: 'white',
                }}
              >
                {submitting ? 'Saving...' : `Save ${sliders.length} Slider(s)`}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Home Page Sliders Preview */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="p-12 rounded-lg shadow-sm border text-center bg-white">
              <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4 text-purple-600" />
              <p className="text-gray-600">Loading live home page sliders...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-lg text-center border bg-red-50 border-red-200">
              <p className="text-red-700">{error}</p>
            </div>
          ) : liveSliders.length === 0 ? (
            <div className="p-12 rounded-lg shadow-sm border text-center bg-white">
              <p className="text-gray-600">
                No sliders are currently live on the home page.<br />
                Save some from the left side to make them appear here and on home.
              </p>
            </div>
          ) : (
            <div className="rounded-lg shadow-sm border overflow-hidden bg-white">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  Currently Live on Home Page ({liveSliders.length} / {sliderCount})
                </h3>
                <button 
                  onClick={fetchLiveSliders}
                  disabled={loading}
                  className="p-2 rounded hover:bg-gray-200 transition-colors"
                  title="Refresh live sliders"
                >
                  <RotateCcw size={18} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-sm uppercase bg-gray-50">
                      <th className="px-6 py-4 font-semibold border-b">ID</th>
                      <th className="px-6 py-4 font-semibold border-b">Type</th>
                      <th className="px-6 py-4 font-semibold border-b">Image</th>
                      <th className="px-6 py-4 font-semibold border-b text-center">Home Preview</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {liveSliders.map((slider) => (
                      <tr key={slider.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">#{slider.id}</td>
                        <td className="px-6 py-4 text-gray-600">{slider.type || 'default'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {slider.image_url ? (
                              <img
                                src={slider.image_url}
                                alt="Slider"
                                className="h-16 w-32 object-cover rounded border border-gray-200 shadow-sm"
                                onError={(e) => {
                                  console.log('Live slider image failed:', slider.image_url);
                                  e.target.src = 'https://via.placeholder.com/128x64?text=Image+Missing';
                                }}
                              />
                            ) : (
                              <div className="h-16 w-32 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                No Image
                              </div>
                            )}
                            <span className="text-xs text-gray-500 truncate max-w-[180px]">
                              {slider.image_url?.split('/').pop() || 'No file'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {slider.image_url ? (
                            <div className="inline-block w-40 h-24 bg-gray-100 rounded overflow-hidden border border-gray-200 shadow-inner">
                              <img
                                src={slider.image_url}
                                alt="Live home preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.log('Live preview failed:', slider.image_url);
                                  e.target.src = 'https://via.placeholder.com/160x96?text=Preview+Missing';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="inline-block w-40 h-24 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                              No Preview
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 text-sm text-center text-gray-500 bg-gray-50">
                These are the exact sliders visitors see on the home page right now
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Media Selection Modal */}
      {showMediaModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowMediaModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">Select Image from Media Library</h3>
              <button
                onClick={() => setShowMediaModal(false)}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={mediaSearch}
                  onChange={(e) => setMediaSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
              {mediaLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <RotateCcw size={32} className="animate-spin mb-3 text-purple-600" />
                  <p className="text-gray-600">Loading media library...</p>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ImageIcon size={64} className="mb-4 opacity-50" />
                  <p>{mediaSearch ? 'No matching images found' : 'No images uploaded yet'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map(item => {
                    const imageUrl = item.thumbnail || `${item.path}${item.name}`;
                    const fullUrl = imageUrl.startsWith('http')
                      ? imageUrl
                      : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;

                    const isSelected = sliders.some(img => img.mediaId === item.id);

                    return (
                      <div 
                        key={item.id}
                        onClick={() => selectMediaItem(item)}
                        className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg hover:border-purple-400 ${
                          isSelected 
                            ? 'border-purple-600 shadow-xl ring-2 ring-purple-500 ring-offset-2 scale-[1.02]' 
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={fullUrl}
                          alt={item.name}
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;utf8,<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="150" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="%239ca3af">No Image</text></svg>';
                          }}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center">
                            <CheckCircle size={64} className="text-white drop-shadow-2xl" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <p className="text-white text-xs truncate font-medium">{item.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-4 bg-gray-50">
              <button
                onClick={() => setShowMediaModal(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowMediaModal(false)}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
                disabled={mediaLoading}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}