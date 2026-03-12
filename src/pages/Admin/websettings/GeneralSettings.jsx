// src/pages/admin/GeneralSettings.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../lib/api';
import { Save, Upload, RefreshCw, AlertCircle, CheckCircle, Palette, Search, X, Image as ImageIcon } from 'lucide-react';
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
    about_title: '',
    about_description: '',
    contact_title: '',
    contact_description: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
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
  const [aboutImagePreview, setAboutImagePreview] = useState(null);
  const [contactMapPreview, setContactMapPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Media Library States
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectedAboutMediaId, setSelectedAboutMediaId] = useState(null);
  const [selectedContactMediaId, setSelectedContactMediaId] = useState(null);
  const [mediaTarget, setMediaTarget] = useState('about'); // 'about' or 'contact'

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
      console.error('Failed to load media:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  const selectMediaItem = (item) => {
    // If it's a full URL, use as is, otherwise construct from sub_directory and name
    const imageUrl = item.thumbnail || `${baseUrl}/${(item.sub_directory + item.name).replace(/^\/+/, '')}`;
    
    if (mediaTarget === 'about') {
      setAboutImagePreview(imageUrl);
      setSelectedAboutMediaId(item.id);
      const aboutInput = document.querySelector('input[name="about_image"]');
      if (aboutInput) aboutInput.value = '';
    } else {
      setContactMapPreview(imageUrl);
      setSelectedContactMediaId(item.id);
      const contactInput = document.querySelector('input[name="contact_map_image"]');
      if (contactInput) contactInput.value = '';
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
      setAboutImagePreview(data.about_image);
      setContactMapPreview(data.contact_map_image);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load content' });
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
      
      // If it's about image, clear media ID
      if (e.target.name === 'about_image') {
        setSelectedAboutMediaId(null);
      } else if (e.target.name === 'contact_map_image') {
        setSelectedContactMediaId(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const form = new FormData();

      // Append all text/checkbox fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      // Append files if selected
      const logoFile = document.querySelector('input[name="logo"]')?.files[0];
      const faviconFile = document.querySelector('input[name="favicon"]')?.files[0];
      const aboutFile = document.querySelector('input[name="about_image"]')?.files[0];
      const mapFile = document.querySelector('input[name="contact_map_image"]')?.files[0];

      if (logoFile) form.append('logo', logoFile);
      if (faviconFile) form.append('favicon', faviconFile);
      if (aboutFile) {
        form.append('about_image', aboutFile);
      } else if (selectedAboutMediaId) {
        form.append('aboutImageMediaId', selectedAboutMediaId);
      }
      
      if (mapFile) {
        form.append('contact_map_image', mapFile);
      } else if (selectedContactMediaId) {
        form.append('contactMapImageMediaId', selectedContactMediaId);
      }

      await api.post('/admin/site-content', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'All site content saved successfully!' });
      fetchContent(); // refresh form
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save content' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="animate-spin h-10 w-10 text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">General & Site Content Settings</h1>
        <p className="text-gray-600 mb-8">Update site-wide information, About page, Contact page, footer, and more.</p>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* 1. Site & Footer Basics */}
          <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Site & Footer Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                <input type="text" name="site_title" value={formData.site_title || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Number</label>
                <input type="text" name="support_number" value={formData.support_number || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input type="email" name="support_email" value={formData.support_email || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Details</label>
                <input type="text" name="copyright_details" value={formData.copyright_details || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" placeholder="© {year} Jijai Masale" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea name="address" value={formData.address || ''} onChange={handleChange} rows={3} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (Footer/About)</label>
                <textarea name="short_description" value={formData.short_description || ''} onChange={handleChange} rows={4} className="w-full px-4 py-3 border rounded-lg" />
              </div>
            </div>

            {/* Logo & Favicon */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Site Logo</label>
                {logoPreview && <img src={logoPreview} alt="Logo" className="h-24 object-contain mb-4 border rounded" />}
                <input type="file" name="logo" accept="image/*" onChange={(e) => handleFile(e, setLogoPreview)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Favicon</label>
                {faviconPreview && <img src={faviconPreview} alt="Favicon" className="h-16 w-16 object-contain mb-4 border rounded" />}
                <input type="file" name="favicon" accept="image/*" onChange={(e) => handleFile(e, setFaviconPreview)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
              </div>
            </div>
          </section>

          {/* 2. About Page */}
          <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">About Page Content</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Title</label>
                <input type="text" name="about_title" value={formData.about_title || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Description</label>
                <textarea name="about_description" value={formData.about_description || ''} onChange={handleChange} rows={6} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">About Image</label>
                {aboutImagePreview && <img src={aboutImagePreview} alt="About" className="h-48 object-cover mb-4 rounded border" />}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button 
                    type="button" 
                    onClick={() => { setMediaTarget('about'); setShowMediaModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition shadow-sm font-bold text-sm"
                  >
                    <ImageIcon size={18} />
                    CHOOSE FROM LIBRARY
                  </button>
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer font-bold text-sm">
                    <Upload size={18} />
                    UPLOAD NEW
                    <input type="file" name="about_image" accept="image/*" onChange={(e) => handleFile(e, setAboutImagePreview)} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Contact Page */}
          <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Page Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Title</label>
                <input type="text" name="contact_title" value={formData.contact_title || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Description</label>
                <textarea name="contact_description" value={formData.contact_description || ''} onChange={handleChange} rows={4} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="text" name="contact_phone" value={formData.contact_phone || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" name="contact_email" value={formData.contact_email || ''} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <textarea name="contact_address" value={formData.contact_address || ''} onChange={handleChange} rows={3} className="w-full px-4 py-3 border rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Contact/Map Image</label>
                {contactMapPreview && <img src={contactMapPreview} alt="Map" className="h-48 object-cover mb-4 rounded border" />}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button 
                    type="button" 
                    onClick={() => { setMediaTarget('contact'); setShowMediaModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition shadow-sm font-bold text-sm"
                  >
                    <ImageIcon size={18} />
                    CHOOSE FROM LIBRARY
                  </button>
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition cursor-pointer font-bold text-sm">
                    <Upload size={18} />
                    UPLOAD NEW
                    <input type="file" name="contact_map_image" accept="image/*" onChange={(e) => handleFile(e, setContactMapPreview)} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Social & App Links */}
          <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Social Media & App Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['twitter', 'instagram', 'youtube', 'whatsapp', 'linkedin', 'tiktok', 'playstore_url', 'applestore_url'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type="url"
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    placeholder={`https://${field}.com/...`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Inside the form */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Title</label>
  <input
    type="text"
    name="newsletter_title"
    value={formData.newsletter_title || ''}
    onChange={handleChange}
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="Join the Spice Club"
  />
</div>

<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Description</label>
  <textarea
    name="newsletter_description"
    value={formData.newsletter_description || ''}
    onChange={handleChange}
    rows={4}
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="Subscribe to get special offers, free recipes, and once-in-a-lifetime deals."
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Subscribe Button Text</label>
  <input
    type="text"
    name="subscribe_button_text"
    value={formData.subscribe_button_text || ''}
    onChange={handleChange}
    className="w-full px-4 py-3 border rounded-lg"
    placeholder="Subscribe"
  />
</div>

          {/* 5. Theme & Appearance */}
          <section className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
              <Palette className="text-purple-600" size={28} />
              Theme & Appearance
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Dynamic Frontend Colors</h3>
                <p className="text-gray-600">Customize the colors for the user-facing frontend including primary, secondary, and accent colors.</p>
              </div>
              <Link 
                to="/admin/theme-editor"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-md whitespace-nowrap"
              >
                Open Theme Color Manager
              </Link>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-60 transition-colors"
            >
              {saving ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save All Site Content
                </>
              )}
            </button>
          </div>


        </form>
      </div>

      {/* Media Selection Modal */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowMediaModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">Media Library</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Select an asset for your {mediaTarget} page</p>
                </div>
                <button 
                  onClick={() => setShowMediaModal(false)} 
                  className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 bg-white border-b border-gray-100">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Filter by filename..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                {mediaLoading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <RefreshCw className="w-10 h-10 text-purple-600 animate-spin" />
                    <p className="text-sm font-bold text-gray-400">Indexing assets...</p>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-black font-sans uppercase tracking-tight">Vault is empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                      const imageUrl = item.thumbnail || `${item.sub_directory}/${item.name}`;
                      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                      const isSelected = mediaTarget === 'about' ? selectedAboutMediaId === item.id : selectedContactMediaId === item.id;

                      return (
                        <motion.div 
                          key={item.id}
                          whileHover={{ y: -5 }}
                          onClick={() => selectMediaItem(item)}
                          className={`relative aspect-square cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${
                            isSelected ? 'border-purple-600 shadow-xl ring-4 ring-purple-100 scale-95' : 'border-white shadow-sm hover:shadow-lg'
                          }`}
                        >
                          <img src={fullUrl} alt={item.name} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 bg-purple-600/40 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                            <CheckCircle size={32} className="text-white drop-shadow-md" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-[10px] font-bold truncate uppercase tracking-widest">{item.name}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
                <button onClick={() => setShowMediaModal(false)} className="px-6 py-2.5 font-bold text-sm text-gray-500 hover:text-gray-900 transition mb-0">DISCARD</button>
                <button onClick={() => setShowMediaModal(false)} className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-200 hover:bg-purple-700 transition active:scale-95 mb-0">SELECT ASSET</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}