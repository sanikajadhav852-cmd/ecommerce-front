import React, { useState, useEffect } from 'react';
import { 
  Upload, CheckCircle, AlertCircle, Calendar, 
  DollarSign, Hash, Percent, User, Users,
  Globe, Info, Image as ImageIcon, Sparkles,
  ChevronRight, Save, RotateCcw, Search, X,
  ChevronDown, Activity, Shield, Box, Database, Loader2
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

  const InputField = ({ label, name, type = 'text', icon: Icon, placeholder, required = false, min, ...props }) => (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative group/input">
        {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-primary transition-all" size={20} />}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          min={min}
          className={`w-full ${Icon ? 'pl-16' : 'px-8'} pr-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner`}
          {...props}
        />
      </div>
    </div>
  );

  const SelectField = ({ label, name, options, required = false }) => (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative group/select">
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
          className="w-full px-8 py-5 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-surface dark:bg-slate-900">{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={20} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-hover/select:text-primary pointer-events-none transition-all" />
      </div>
    </div>
  );

  const Switch = ({ label, name, description }) => (
    <div className="flex items-center justify-between p-8 bg-background-site/50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 transition-all hover:bg-surface dark:hover:bg-slate-900 hover:shadow-xl group/switch">
      <div className="space-y-2">
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{label}</span>
        {description && <p className="text-[10px] text-slate-300 dark:text-slate-700 font-black uppercase tracking-tighter italic">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => handleToggle(name)}
        className={`relative w-20 h-10 rounded-full transition-all duration-700 flex items-center px-1 ${
          formData[name] === 1 ? 'bg-primary shadow-2xl shadow-primary/30' : 'bg-slate-200 dark:bg-slate-800 shadow-inner'
        }`}
      >
        <motion.div 
          animate={{ x: formData[name] === 1 ? '2.5rem' : '0rem' }}
          className="w-8 h-8 bg-white rounded-full shadow-2xl relative z-10"
        >
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${formData[name] === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
        </motion.div>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span>Reward Engineering v4.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Registry Vector</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Protocol: INITIALIZING
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Admin <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase text-[10px]">Add Promo Code</span>
          </button>
        </div>
      </header>

      {/* --- FORM VECTOR --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-700 overflow-hidden relative group"
      >
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="p-12 md:p-20 space-y-20 relative z-10">
          
          {/* Section: Basic Identity */}
          <div className="space-y-12">
            <div className="flex items-center gap-6 pb-6 border-b border-primary/10">
                <div className="p-4 bg-primary/10 text-primary rounded-3xl shadow-inner">
                    <Shield size={28} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Token Specification</h3>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">Initialize Core Reward Parameters</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InputField label="Promo Identity" name="promo_code" icon={Hash} placeholder="e.g. WINTER_FORGE_50" required />
              <InputField label="Matrix Status Message" name="message" icon={Info} placeholder="e.g. 50% Efficiency Boost" required />
            </div>
          </div>

          {/* Section: Temporal Constraints */}
          <div className="space-y-12">
            <div className="flex items-center gap-6 pb-6 border-b border-primary/10">
                <div className="p-4 bg-primary/10 text-primary rounded-3xl shadow-inner">
                    <Calendar size={28} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Temporal Grid</h3>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">Configure Validity Windows</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InputField label="Sync Activation" name="start_date" type="date" icon={Calendar} required />
              <InputField label="Protocol Termination" name="end_date" type="date" icon={Calendar} required />
            </div>
          </div>

          {/* Section: Fiscal Logic */}
          <div className="space-y-12">
            <div className="flex items-center gap-6 pb-6 border-b border-primary/10">
                <div className="p-4 bg-primary/10 text-primary rounded-3xl shadow-inner">
                    <DollarSign size={28} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Reward Logic</h3>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">Configure Financial Multipliers</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <SelectField 
                label="Logic Mode" 
                name="discount_type" 
                options={[
                  { label: 'Ratio Mapping (%)', value: 'percentage' },
                  { label: 'Fixed Deduction (₹)', value: 'fixed' }
                ]} 
              />
              <InputField label="Magnitude" name="discount" type="number" icon={formData.discount_type === 'percentage' ? Percent : DollarSign} placeholder="0.00" required />
              <InputField label="Max Threshold" name="max_discount_amount" type="number" icon={DollarSign} placeholder="0.00" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InputField label="Entry Threshold" name="minimum_order_amount" type="number" icon={DollarSign} placeholder="0.00" required />
              <InputField label="Node Capacity" name="no_of_users" type="number" icon={Users} placeholder="Max Cluster Size" required />
            </div>
          </div>

          {/* Section: Visual Assets */}
          <div className="space-y-12">
            <div className="flex items-center gap-6 pb-6 border-b border-primary/10">
                <div className="p-4 bg-primary/10 text-primary rounded-3xl shadow-inner">
                    <ImageIcon size={28} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Asset Ingestion</h3>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-1">Map Visual Protocol Token</p>
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-12 bg-background-site/30 dark:bg-slate-950/30 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800/10">
              <AnimatePresence mode="wait">
                {imagePreview ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="relative group w-60 h-60 rounded-[3.5rem] overflow-hidden border-4 border-primary/20 bg-surface dark:bg-slate-900 p-4 shadow-2xl transition-all duration-700 hover:border-primary"
                  >
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 scale-90 group-hover:scale-100" />
                    <button 
                      type="button" 
                      onClick={() => { setImagePreview(null); setImageFile(null); setSelectedMediaId(null); }}
                      className="absolute top-6 right-6 p-4 bg-red-500 text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-90 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-60 h-60 rounded-[3.5rem] border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-100 dark:text-slate-800"
                    >
                        <ImageIcon size={64} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Vector</span>
                    </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  type="button" 
                  onClick={() => setShowMediaModal(true)}
                  className="flex items-center gap-4 px-10 py-5 bg-surface dark:bg-slate-900 text-slate-400 hover:text-primary rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all shadow-sm active:scale-95"
                >
                  <Database size={20} /> Repository Hub
                </button>
                <label className="group/btn flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] cursor-pointer hover:bg-black transition-all active:scale-95 shadow-2xl shadow-primary/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                  <Upload size={20} className="relative z-10" /> <span className="relative z-10">Ingest Vector</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Section: System Toggles */}
          <div className="space-y-12 pt-12 border-t border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Switch label="Exclusive Target" name="is_specific_users" description="Cluster specific" />
              <Switch label="Cashback Protocol" name="is_cashback" description="Credit re-routing" />
              <Switch label="Index Discovery" name="list_promocode" description="Matrix visibility" />
            </div>
          </div>

          {/* Feedback Matrix */}
          <AnimatePresence>
            {feedback.message && (
              <motion.div 
                initial={{ height: 0, opacity: 0, y: 10 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 10 }}
                className={`p-8 rounded-[2.5rem] flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] border-2 shadow-2xl ${
                  feedback.type === 'success' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10' : 'bg-red-500/5 text-red-500 border-red-500/10'
                }`}
              >
                {feedback.type === 'success' ? <CheckCircle size={28} className="animate-bounce" /> : <AlertCircle size={28} />}
                <div className="flex-1">{feedback.message}</div>
                <button onClick={() => setFeedback({type:'', message:''})} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controller Console */}
          <div className="flex flex-col sm:flex-row items-center gap-8 pt-12 border-t border-primary/10">
            <button
              type="submit"
              disabled={loading}
              className="group/submit flex-1 w-full flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-2xl shadow-primary/40 hover:bg-black hover:-translate-y-2 transition-all active:scale-95 disabled:opacity-50 relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/submit:translate-x-0 transition-transform duration-700" />
               <Save size={22} className="relative z-10" />
               <span className="relative z-10">{loading ? 'STREAMS_ACTIVE...' : 'DEPLOY_REWARD_VECTOR'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-4 px-12 py-6 bg-background-site dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-slate-100 dark:border-slate-700/50 hover:border-red-500/20 transition-all active:scale-95 shadow-sm"
            >
              <RotateCcw size={22} />
              ABORT_PROTOCOL
            </button>
          </div>
        </form>
      </motion.div>

      {/* --- MEDIA MODAL MATRIX --- */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowMediaModal(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="p-10 md:p-12 border-b border-primary/10 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-primary text-white rounded-3xl shadow-2xl">
                        <Database size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Repository Matrix</h3>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-1">Select logic token visual</p>
                    </div>
                </div>
                <button onClick={() => setShowMediaModal(false)} className="w-16 h-16 flex items-center justify-center bg-background-site dark:bg-slate-950 text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90">
                  <X size={28} />
                </button>
              </div>

              <div className="p-10 bg-background-site/30 dark:bg-slate-950/30 border-b border-primary/5">
                <div className="relative group/search max-w-2xl mx-auto">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-all" size={24} />
                  <input
                    type="text"
                    placeholder="Scan Matrix Filename..."
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    className="w-full pl-20 pr-8 py-6 bg-surface dark:bg-slate-900 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                {mediaLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-10">
                    <Loader2 className="animate-spin h-24 w-24 text-primary opacity-20" />
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Asset Nodes...</p>
                  </div>
                ) : mediaItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center gap-8 text-slate-200 dark:text-slate-800">
                    <Box size={100} className="opacity-10" />
                    <p className="text-2xl font-black uppercase tracking-[0.6em]">VACUUM_STATE</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 pb-12">
                    {mediaItems.filter(i => i.name.toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
                      const imageUrl = item.thumbnail || `${item.sub_directory}/${item.name}`;
                      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;
                      const isSelected = selectedMediaId === item.id;

                      return (
                        <motion.div 
                          key={item.id}
                          whileHover={{ scale: 1.05, y: -5 }}
                          onClick={() => selectMediaItem(item)}
                          className={`group/item relative aspect-square cursor-pointer rounded-[2.5rem] overflow-hidden border-4 transition-all duration-500 shadow-xl ${
                            isSelected ? 'border-primary ring-8 ring-primary/10 bg-primary/5' : 'border-background-site dark:border-slate-800 bg-background-site/50 dark:bg-slate-950/50 grayscale hover:grayscale-0'
                          }`}
                        >
                          <img src={fullUrl} alt={item.name} className="w-full h-full object-cover p-2 scale-90 group-hover/item:scale-110 transition-transform duration-700" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                              <CheckCircle size={48} className="text-white" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <p className="text-white text-[9px] font-black truncate uppercase tracking-[0.2em]">{item.name}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="max-w-7xl mx-auto mt-24 text-center border-t border-slate-100 dark:border-slate-800/10 p-12">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] leading-relaxed">
           Reward vectors define the <span className="text-primary italic">incentive-topology</span> of the storefront matrix. <br/>All deployment tokens are cryptographically logged for lifecycle transparency.
        </p>
      </footer>
    </div>
  );
}
