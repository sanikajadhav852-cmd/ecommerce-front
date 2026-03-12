// src/pages/admin/Brands.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, ListFilter, Download, 
  Upload, MoreVertical, Trash2, Edit, X, CheckCircle, Image as ImageIcon, RotateCcw 
} from 'lucide-react';
import api from '../../lib/api';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMediaId, setSelectedMediaId] = useState(null); // ← new

  // Modal states (copied from Categories/Sliders)
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/brands');
      setBrands(response.data || []);
    } catch (err) {
      console.error("Error fetching brands:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch media when modal opens
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
    setShowMediaModal(true);
    setMediaSearch('');
  };

  const selectMediaItem = (item) => {
    const imageUrl = item.thumbnail || `${item.path}${item.name}`;
    const fullUrl = imageUrl.startsWith('http')
      ? imageUrl
      : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;

    setImagePreview(fullUrl);
    setSelectedMediaId(item.id);
    setShowMediaModal(false);
  };

  const handleDirectUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedMediaId(null); // clear media ID if direct upload
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setSelectedMediaId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Brand name is required');
      return;
    }

    if (!imagePreview) {
      alert('Brand image is required');
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());

      if (selectedMediaId) {
        payload.append('media_id', selectedMediaId); // ← send media ID
      } else {
        // If direct upload was used, append file (optional fallback)
        const fileInput = document.getElementById('brandImage');
        if (fileInput?.files?.[0]) {
          payload.append('image', fileInput.files[0]);
        }
      }

      await api.post('/admin/brands', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Brand added successfully!');
      setFormData({ name: '' });
      setImagePreview(null);
      setSelectedMediaId(null);
      fetchBrands(); // refresh list
    } catch (err) {
      console.error('Error adding brand:', err);
      alert(err.response?.data?.message || 'Failed to add brand');
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-700">Manage Brands</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-purple-600">Brands</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: Add Brand Form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Brand Name"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Main Image <span className="text-red-500">*</span> 
                  <span className="text-[10px] lowercase font-normal ml-1">(Recommended Size : 131 x 131 pixels)</span>
                </label>

                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-gray-300">
                    <img
                      src={imagePreview}
                      alt="Brand preview"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={openMediaSelector}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors"
                    >
                      <Upload size={24} className="mx-auto text-gray-500 mb-2" />
                      <span className="text-sm text-gray-600">Select from Media</span>
                    </button>

                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors">
                      <Upload size={24} className="mx-auto text-gray-500 mb-2" />
                      <span className="text-sm text-gray-600">Upload</span>
                      <input
                        type="file"
                        id="brandImage"
                        accept="image/*"
                        hidden
                        onChange={handleDirectUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm"
                  onClick={() => {
                    setFormData({ name: '' });
                    setImagePreview(null);
                    setSelectedMediaId(null);
                  }}
                >
                  Reset
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#6BCB44] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors shadow-sm"
                >
                  {loading ? 'Adding...' : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: Brands Table */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-700">Brands</h3>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 outline-none w-full md:w-64"
                  />
                </div>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button onClick={fetchBrands} className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-all shadow-sm">
                    <RefreshCw size={18} />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-all shadow-sm flex items-center gap-1">
                    <ListFilter size={18} />
                    <span className="text-[10px] font-bold">▼</span>
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-all shadow-sm flex items-center gap-1">
                    <Download size={18} />
                    <span className="text-[10px] font-bold">▼</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 border-r last:border-r-0">
                      ID <span className="text-[10px] ml-1">▼</span>
                    </th>
                    <th className="px-6 py-4 border-r last:border-r-0">
                      NAME <span className="text-[10px] ml-1">⇅</span>
                    </th>
                    <th className="px-6 py-4 border-r last:border-r-0 text-center">
                      IMAGE
                    </th>
                    <th className="px-6 py-4 border-r last:border-r-0">
                      STATUS
                    </th>
                    <th className="px-6 py-4 text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {brands.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center text-gray-400 italic">
                        No matching records found
                      </td>
                    </tr>
                  ) : (
                    brands.map((brand) => (
                      <tr key={brand.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-purple-600 font-medium">#{brand.id}</td>
                        <td className="px-6 py-4 font-semibold text-slate-700">{brand.name}</td>
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                            {brand.image ? (
                              <img src={brand.image} alt={brand.name} className="object-cover w-full h-full" />
                            ) : (
                              <span className="text-[8px] text-gray-400">NO IMAGE</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={brand.status} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== MEDIA SELECTION MODAL (Same as Categories/Sliders) ====================== */}
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

                    const isSelected = selectedMediaId === item.id;

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