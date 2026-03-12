// src/pages/admin/AboutEditor.jsx
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { 
  Save, RotateCcw, AlertCircle, CheckCircle, Edit2,
  Image as ImageIcon, Loader2, X
} from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
          <p className="text-gray-600 font-medium">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-gray-50 min-h-screen space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">About Page Editor</h1>
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={fetchAboutData}
              disabled={saving || loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button 
              type="submit"
              disabled={saving || loading}
              className={`flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium ${saving ? 'opacity-60' : ''}`}
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        {/* Basic About Content */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-bold text-gray-700 uppercase tracking-tight flex items-center gap-2">
            <Edit2 size={18} className="text-purple-600" />
            About Content
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => handleChange('title', e.target.value)} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea 
              value={formData.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            {formData.image ? (
              <div className="flex items-center gap-4">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/128?text=No+Image'}
                />
                <button
                  type="button"
                  onClick={openMediaModal}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openMediaModal}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <ImageIcon size={32} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 font-medium">Select from Media Library</span>
              </button>
            )}
          </div>
        </div>
      </form>

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
              <h3 className="text-xl font-semibold text-gray-800">
                Select Image from Media Library
              </h3>
              <button
                onClick={() => setShowMediaModal(false)}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <SearchIcon 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                  size={18} 
                />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={mediaSearch}
                  onChange={(e) => setMediaSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                    const isSelected = formData.image === fullUrl;

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
                            <CheckCircle2 size={64} className="text-white drop-shadow-2xl" />
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
    </>
  );
}