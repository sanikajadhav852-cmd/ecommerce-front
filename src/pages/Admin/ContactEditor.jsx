// src/pages/admin/ContactEditor.jsx
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import {
  Save, RotateCcw, AlertCircle, CheckCircle, Edit2, Image as ImageIcon, Loader2,
  Phone, Mail, MapPin, Clock, Globe
} from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-gray-50 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Contact Page Editor</h1>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={fetchContactData}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border rounded-lg hover:bg-gray-50"
            disabled={saving || loading}
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-60"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3"><AlertCircle /> {error}</div>}
      {success && <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3"><CheckCircle /> {success}</div>}

      {/* Hero Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Edit2 size={18} className="text-purple-600" /> Hero Section</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Hero Title</label>
            <input
              value={data.hero_title}
              onChange={e => handleChange('hero_title', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Description</label>
            <textarea
              value={data.hero_description}
              onChange={e => handleChange('hero_description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Edit2 size={18} className="text-purple-600" /> Contact Details</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input value={data.phone} onChange={e => handleChange('phone', e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={data.email} onChange={e => handleChange('email', e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Full Address</label>
            <textarea value={data.address} onChange={e => handleChange('address', e.target.value)} rows={4} className="w-full px-4 py-3 border rounded-lg" />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock size={18} className="text-purple-600" /> Business Hours</h3>
        {data.business_hours.map((item, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Days (e.g. Mon - Sat)"
              value={item.days}
              onChange={e => handleChange('days', e.target.value, idx)}
              className="px-4 py-3 border rounded-lg"
            />
            <input
              placeholder="Time"
              value={item.time}
              onChange={e => handleChange('time', e.target.value, idx)}
              className="px-4 py-3 border rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Other Fields */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Response Time</label>
          <input value={data.response_time} onChange={e => handleChange('response_time', e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Map Image URL</label>
          <div className="relative">
            <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={data.map_image_url} onChange={e => handleChange('map_image_url', e.target.value)} className="w-full pl-10 px-4 py-3 border rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Form Success Message</label>
          <input value={data.form_success_msg} onChange={e => handleChange('form_success_msg', e.target.value)} className="w-full px-4 py-3 border rounded-lg" />
        </div>
      </div>
    </form>
  );
}