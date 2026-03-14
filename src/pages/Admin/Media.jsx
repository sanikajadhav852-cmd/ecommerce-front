import React, { useState, useEffect } from 'react';
import {
  Upload, Search, RotateCcw, Trash2,
  MoreVertical, Download, Grid, List, Edit3, ChevronRight , Loader2,
  Image as ImageIcon, File, Zap, CloudUpload
} from 'lucide-react';
import api from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get('/media');
      if (res.data.success) {
        setMediaItems(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('No files selected');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setFiles([]);
        fetchMedia();
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete this media file?')) return;
    try {
      await api.delete(`/media/${id}`);
      fetchMedia();
      setOpenMenuId(null);
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected items?`)) return;

    try {
      await Promise.all(selectedIds.map(id => api.delete(`/media/${id}`)));
      setSelectedIds([]);
      fetchMedia();
    } catch (err) {
      alert('Bulk delete failed');
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Zap size={14} className="animate-pulse" />
            <span>Asset Infrastructure</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Media Vault</h1>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Storage: Online</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">
        
        {/* --- UPLOAD ARCHITECTURE --- */}
        <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-14 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
          
          <div
            className={`relative z-10 border-4 border-dashed rounded-[3rem] p-12 md:p-20 flex flex-col items-center justify-center transition-all duration-500 ${
              dragActive ? 'border-indigo-600 bg-indigo-500/5 scale-[0.98]' : 'border-slate-100 dark:border-slate-800 hover:border-indigo-500/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-500">
               <CloudUpload size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Ingest New Assets</h3>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-10">Drop files anywhere or browse local storage</p>

            <label className="cursor-pointer bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all shadow-sm hover:shadow-xl hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95">
              Browse Filesystem
              <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={uploading} />
            </label>

            <AnimatePresence>
              {files.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 p-6 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl w-full max-w-lg">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Pending Sync Matrix</span>
                       <span className="text-[9px] font-black text-slate-400">{files.length} ITEMS</span>
                    </div>
                    <div className="max-h-24 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                       {files.map((f, i) => (
                         <div key={i} className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="truncate max-w-[80%] lowercase">{f.name}</span>
                            <span className="text-[8px] opacity-40 uppercase">{(f.size / 1024).toFixed(0)}KB</span>
                         </div>
                       ))}
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-10 flex justify-end items-center gap-6 relative z-10">
            {files.length > 0 && (
              <button
                onClick={() => setFiles([])}
                disabled={uploading}
                className="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
              >
                Clear Buffer
              </button>
            )}
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
              className="px-14 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-4"
            >
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              Initialize Upload Flow
            </button>
          </div>
        </section>

        {/* --- VAULT INTERFACE --- */}
        <section className="space-y-6 pb-20">
          
          {/* Metadata Controller */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-sm">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <button
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-rose-500/20 active:scale-95 disabled:opacity-30 shrink-0"
              >
                Purge Selection ({selectedIds.length})
              </button>
              <div className="h-8 w-[2px] bg-slate-100 dark:bg-slate-800 mx-2 hidden lg:block" />
              <div className="relative flex-1 lg:w-96">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-700" size={18} />
                <input
                  type="text"
                  placeholder="Query library matrix..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl text-[0.9375rem] font-bold text-slate-900 dark:text-white outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
               <button onClick={fetchMedia} className="p-4 bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-indigo-600 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all">
                  <RotateCcw size={20} className={loading ? 'animate-spin' : ''} />
               </button>
               <div className="flex bg-slate-50 dark:bg-slate-950 rounded-[1.25rem] p-1.5 border border-slate-100 dark:border-slate-800">
                  <button className="p-3 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"><Grid size={18} /></button>
                  <button className="p-3 text-slate-400 dark:text-slate-600 hover:text-indigo-600"><List size={18} /></button>
               </div>
               <button className="px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                  Archival Sync
               </button>
            </div>
          </div>

          {/* Grid Manifest */}
          <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all min-h-[400px]">
            {loading ? (
              <div className="p-40 flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Querying Vault...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-40 flex flex-col items-center justify-center gap-6 opacity-20">
                <ImageIcon size={80} strokeWidth={1} />
                <p className="text-[10px] font-black uppercase tracking-widest">{searchQuery ? 'Manifest Mismatch' : 'Vault Initialized [EMPTY]'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-50 dark:border-slate-800/50 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
                      <th className="p-8 w-10">
                         <div className="w-5 h-5 border-2 border-slate-200 dark:border-slate-800 rounded-md" />
                      </th>
                      <th className="p-8">Identification</th>
                      <th className="p-8 text-center">Visual Component</th>
                      <th className="p-8">Protocol</th>
                      <th className="p-8">Node Vector</th>
                      <th className="p-8">Payload</th>
                      <th className="p-8 text-center">Interface</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
                    {filteredItems.map(item => {
                      const imageUrl = item.thumbnail || `${item.path}${item.name}`;
                      const fullUrl = imageUrl.startsWith('http')
                        ? imageUrl
                        : `${baseUrl}/${imageUrl.replace(/^\/+/, '')}`;

                      const isSelected = selectedIds.includes(item.id);

                      return (
                        <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors">
                          <td className="p-8">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelect(item.id)}
                              className="w-5 h-5 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-transparent text-indigo-600 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
                            />
                          </td>
                          <td className="p-8">
                            <p className="font-black text-slate-900 dark:text-white truncate max-w-[200px] text-[0.9375rem] tracking-tight lowercase">
                               {item.name}
                            </p>
                            <p className="text-[9px] font-black text-indigo-600/40 dark:text-indigo-400/20 uppercase tracking-widest mt-1">HEXA-NODE #{item.id}</p>
                          </td>
                          <td className="p-8">
                            <div className="w-24 h-24 mx-auto bg-slate-50 dark:bg-slate-950 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-500">
                              <img
                                src={fullUrl}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-[1.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml;utf8,<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="150" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="12" font-weight="900" fill="%23334155">X</text></svg>';
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-8">
                             <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-black text-[9px] rounded-lg tracking-[0.2em] uppercase w-fit">
                                {item.extension || 'BIN'}
                             </div>
                          </td>
                          <td className="p-8">
                             <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest truncate max-w-[150px]">
                                {item.path || 'GLOBAL_ROOT'}
                             </p>
                          </td>
                          <td className="p-8">
                             <p className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest">
                                {item.size || '0 KB'}
                             </p>
                          </td>
                          <td className="p-8 text-center relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                              className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all active:scale-90"
                            >
                              <MoreVertical size={20} />
                            </button>

                            <AnimatePresence>
                              {openMenuId === item.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                  <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="absolute right-0 top-20 w-56 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl z-20 overflow-hidden p-3" >
                                    <button className="w-full px-6 py-4 text-left text-[9px] font-black uppercase tracking-widest flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl transition-colors">
                                      <Edit3 size={16} /> Edit Attributes
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item.id)}
                                      className="w-full px-6 py-4 text-left text-[9px] font-black uppercase tracking-widest flex items-center gap-4 hover:bg-rose-500/10 text-rose-600 rounded-xl transition-colors"
                                    >
                                      <Trash2 size={16} /> Vaporize Asset
                                    </button>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* --- SYSTEM FOOTER --- */}
        <footer className="text-center opacity-10 pointer-events-none pb-10">
          <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
            CORE-ASSET-MANAGEMENT-V4.2 [ENCRYPTED]
          </p>
        </footer>
      </main>
    </div>
  );
}