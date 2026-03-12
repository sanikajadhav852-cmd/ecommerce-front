import React, { useState, useEffect } from 'react';
import { 
  Upload, CheckCircle, AlertCircle, Calendar, 
  DollarSign, Hash, Percent, User, Users,
  Globe, Info, Image as ImageIcon, Sparkles,
  ChevronRight, Save, RotateCcw, Search, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../lib/api.js';

export default function AddPromocode() {
  const [formData, setFormData] = useState({
    promo_code: '',
    message: '',
    start_date: '',
    end_date: '',
    is_specific_users: 0,
    no_of_users: '',
    minimum_order_amount: '',
    discount: '',
    discount_type: 'percentage', // percentage or fixed
    max_discount_amount: '',
    repeat_usage: 0, // 0 for One time, 1 for Multiple
    no_of_repeat_usage: 1,
    status: 1, // 1 for Active, 0 for Deactive
    is_cashback: 0,
    list_promocode: 1,
    users_id: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

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
    setImagePreview(imageUrl);
    setSelectedMediaId(item.id);
    setImageFile(null);
    setShowMediaModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleToggle = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name] === 1 ? 0 : 1
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setSelectedMediaId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      } else if (selectedMediaId) {
        data.append('mediaId', selectedMediaId);
      }

      const res = await api.post('/promocodes', data);
      
      if (res.data.success) {
        setFeedback({ type: 'success', message: 'Promo code added successfully!' });
        // Optionally reset form
        // setFormData({...initialState});
        // setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
      setFeedback({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to add promo code' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-[1.5rem] md:p-[2rem]">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[1rem] mb-[2rem]">
        <div className="space-y-[0.25rem]">
          <h1 className="text-[1.875rem] font-black text-gray-900 tracking-tight flex items-center gap-[0.75rem]">
            <Sparkles className="text-primary" size={28} />
            Add Promo Code
          </h1>
          <div className="flex items-center gap-[0.5rem] text-[0.875rem] text-gray-500 font-medium">
            <span>Home</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-primary-light">Promo Code</span>
          </div>
        </div>
      </div>

      {/* --- FORM CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[70rem] mx-auto bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-[2rem] md:p-[3rem] space-y-[2.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[3rem] gap-y-[2rem]">
            
            {/* Promo Code */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Promo Code <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Hash className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  name="promo_code"
                  value={formData.promo_code}
                  onChange={handleInputChange}
                  placeholder="Enter Promo Code"
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Message <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Info className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Promo message for users"
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Calendar className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Calendar className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* For Specific Users Toggle */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest">
                For specific users?
              </label>
              <div className="flex items-center gap-[1rem]">
                <button
                  type="button"
                  onClick={() => handleToggle('is_specific_users')}
                  className={`relative w-[4.5rem] h-[2.25rem] rounded-[1rem] transition-all p-[0.25rem] ${
                    formData.is_specific_users === 1 ? 'bg-secondary' : 'bg-red-500'
                  }`}
                >
                  <div className={`absolute top-[0.4rem] ${formData.is_specific_users === 1 ? 'right-[0.5rem]' : 'left-[0.5rem]'} text-[0.6rem] font-black text-white uppercase`}>
                    {formData.is_specific_users === 1 ? 'ON' : 'OFF'}
                  </div>
                  <motion.div 
                    animate={{ x: formData.is_specific_users === 1 ? '2.25rem' : '0rem' }}
                    className="w-[1.75rem] h-[1.75rem] bg-white rounded-[0.75rem] shadow-sm"
                  />
                </button>
              </div>
            </div>

            {/* No. Of Users */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                No. Of Users <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <Users className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="number"
                  name="no_of_users"
                  value={formData.no_of_users}
                  onChange={handleInputChange}
                  placeholder="Total users limit"
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Minimum Order Amount */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Minimum Order Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <DollarSign className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="number"
                  name="minimum_order_amount"
                  value={formData.minimum_order_amount}
                  onChange={handleInputChange}
                  placeholder="Min order for promo"
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Discount */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Discount <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                {formData.discount_type === 'percentage' ? (
                  <Percent className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                ) : (
                  <DollarSign className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                )}
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Discount value"
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Discount Type */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select
                name="discount_type"
                value={formData.discount_type}
                onChange={handleInputChange}
                className="w-full px-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none"
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            {/* Max Discount Amount */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Max Discount Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <DollarSign className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="number"
                  name="max_discount_amount"
                  value={formData.max_discount_amount}
                  onChange={handleInputChange}
                  placeholder="Maximum cap"
                  className="w-full pl-[3.5rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Repeat Usage */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Repeat Usage <span className="text-red-500">*</span>
              </label>
              <select
                name="repeat_usage"
                value={formData.repeat_usage}
                onChange={handleInputChange}
                className="w-full px-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none"
                required
              >
                <option value={0}>One Time Usage</option>
                <option value={1}>Multiple Times Usage</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest flex items-center gap-[0.5rem]">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[1rem] font-bold outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none"
                required
              >
                <option value={1}>Active</option>
                <option value={0}>Deactive</option>
              </select>
            </div>
          </div>

          {/* Main Image Upload */}
          <div className="space-y-[1.25rem]">
            <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest">
              Main Image <span className="text-gray-300 font-medium">(Recommended Size : 80 x 80 pixels)</span>
            </label>
            <div className="flex flex-col items-start gap-[1.5rem]">
              {imagePreview && (
                <div className="relative group w-[10rem] h-[10rem] rounded-[1.5rem] overflow-hidden border-2 border-primary/20 bg-primary/5">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => { setImagePreview(null); setImageFile(null); setSelectedMediaId(null); }}
                    className="absolute top-[0.75rem] right-[0.75rem] p-[0.5rem] bg-white/90 backdrop-blur text-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-[1rem]">
                <button 
                  type="button" 
                  onClick={() => setShowMediaModal(true)}
                  className="flex items-center gap-[0.75rem] px-[1.5rem] py-[0.875rem] bg-secondary/10 text-secondary border border-secondary/20 rounded-[1rem] font-black text-[0.875rem] hover:bg-secondary/20 transition-all"
                >
                  <ImageIcon size={18} />
                  CHOOSE FROM LIBRARY
                </button>
                <label className="flex items-center gap-[0.75rem] px-[1.5rem] py-[0.875rem] bg-primary text-white rounded-[1rem] font-black text-[0.875rem] cursor-pointer hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                  <Upload size={18} />
                  UPLOAD NEW IMAGE
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Cashback & List Toggles */}
          <div className="flex flex-wrap items-center gap-[4rem] pt-[1rem]">
            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest">
                Is Cashback?
              </label>
              <button
                type="button"
                onClick={() => handleToggle('is_cashback')}
                className={`relative w-[4.5rem] h-[2.25rem] rounded-[1rem] transition-all p-[0.25rem] ${
                  formData.is_cashback === 1 ? 'bg-secondary' : 'bg-red-500'
                }`}
              >
                 <div className={`absolute top-[0.4rem] ${formData.is_cashback === 1 ? 'right-[0.5rem]' : 'left-[0.5rem]'} text-[0.6rem] font-black text-white uppercase`}>
                    {formData.is_cashback === 1 ? 'ON' : 'OFF'}
                  </div>
                <motion.div 
                  animate={{ x: formData.is_cashback === 1 ? '2.25rem' : '0rem' }}
                  className="w-[1.75rem] h-[1.75rem] bg-white rounded-[0.75rem] shadow-sm"
                />
              </button>
            </div>

            <div className="space-y-[0.75rem]">
              <label className="text-[0.875rem] font-black text-gray-400 uppercase tracking-widest">
                List Promocode?
              </label>
              <button
                type="button"
                onClick={() => handleToggle('list_promocode')}
                className={`relative w-[4.5rem] h-[2.25rem] rounded-[1rem] transition-all p-[0.25rem] ${
                  formData.list_promocode === 1 ? 'bg-secondary' : 'bg-red-500'
                }`}
              >
                <div className={`absolute top-[0.4rem] ${formData.list_promocode === 1 ? 'right-[0.5rem]' : 'left-[0.5rem]'} text-[0.6rem] font-black text-white uppercase`}>
                    {formData.list_promocode === 1 ? 'ON' : 'OFF'}
                  </div>
                <motion.div 
                  animate={{ x: formData.list_promocode === 1 ? '2.25rem' : '0rem' }}
                  className="w-[1.75rem] h-[1.75rem] bg-white rounded-[0.75rem] shadow-sm"
                />
              </button>
            </div>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback.message && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`p-[1.25rem] rounded-[1.25rem] flex items-center gap-[0.75rem] text-[0.9375rem] font-bold ${
                  feedback.type === 'success' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-red-50 text-red-600 border border-red-100'
                }`}
              >
                {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Buttons */}
          <div className="flex items-center gap-[1.5rem] pt-[2rem]">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 max-w-[15rem] flex items-center justify-center gap-[0.75rem] px-[2rem] py-[1.25rem] bg-primary text-white rounded-[1.5rem] font-black text-[1rem] shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0"
            >
              <Save size={20} />
              {loading ? 'PROCESSING...' : 'SAVE PROMO CODE'}
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-[0.75rem] px-[2rem] py-[1.25rem] bg-gray-100 text-gray-500 rounded-[1.5rem] font-black text-[1rem] hover:bg-gray-200 transition-all active:scale-95"
            >
              <RotateCcw size={20} />
              DISCARD
            </button>
          </div>
        </form>
      </motion.div>

      {/* --- FOOTER INFO --- */}
      <div className="mt-[3rem] text-center border-t border-gray-100 pt-[2rem]">
        <p className="text-[0.875rem] text-gray-400 font-medium">
          Cluster Node: <span className="font-bold text-gray-600 uppercase">IND-WEST-PROMO-1</span>
        </p>
      </div>

      {/* --- MEDIA MODAL --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-[1rem] md:p-[2rem]">
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
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-[65rem] max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-[1.5rem] border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-[1.25rem] font-black text-gray-900 leading-tight">Media Library</h3>
                  <p className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest mt-1">Select an asset for your promo code</p>
                </div>
                <button onClick={() => setShowMediaModal(false)} className="w-[3rem] h-[3rem] flex items-center justify-center bg-gray-50 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                  <X size={24} />
                </button>
              </div>

              <div className="p-[1.25rem] bg-white border-b border-gray-50">
                <div className="relative group">
                  <Search className="absolute left-[1.25rem] top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Filter by filename..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-[3.25rem] pr-[1.25rem] py-[1rem] bg-gray-50 border-none rounded-[1.25rem] text-[0.9375rem] font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-[1.5rem] bg-gray-50/30">
                {mediaLoading ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-[1rem]">
                    <div className="w-[4rem] h-[4rem] border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-[0.875rem] font-bold text-gray-400">Indexing assets...</p>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon size={64} className="mb-[1.5rem] opacity-20" />
                    <p className="text-[1.125rem] font-black">Vault is empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[1.25rem]">
                    {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                      const imageUrl = item.thumbnail || `${item.sub_directory}/${item.name}`;
                      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                      const isSelected = selectedMediaId === item.id;

                      return (
                        <motion.div 
                          key={item.id}
                          whileHover={{ y: -5 }}
                          onClick={() => selectMediaItem(item)}
                          className={`relative aspect-square cursor-pointer rounded-[1.5rem] overflow-hidden border-4 transition-all ${
                            isSelected ? 'border-primary shadow-xl ring-4 ring-primary/20 scale-95' : 'border-white shadow-sm hover:shadow-lg'
                          }`}
                        >
                          <img src={fullUrl} alt={item.name} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 bg-primary/60 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                            <CheckCircle size={40} className="text-white drop-shadow-lg" />
                          </div>
                   <div className="absolute bottom-0 left-0 right-0 p-[0.75rem] bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-[0.625rem] font-black truncate uppercase tracking-widest">{item.name}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-[1.5rem] border-t border-gray-100 bg-white flex justify-end gap-[1rem]">
                <button onClick={() => setShowMediaModal(false)} className="px-[1.5rem] py-[0.875rem] font-black text-[0.8125rem] text-gray-500 hover:text-gray-900 transition-all">DISCARD</button>
                <button onClick={() => setShowMediaModal(false)} className="px-[1.5rem] py-[0.875rem] bg-primary text-white rounded-[1rem] font-black text-[0.8125rem] shadow-lg shadow-primary/20">SELECT ASSET</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
