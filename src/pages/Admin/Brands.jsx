import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { 
  Building2, Plus, Trash2, Search, RotateCw, X, 
  CheckCircle, Shield, Activity, Globe, Image as ImageIcon,
  MoreVertical, Edit2, ArrowUpRight, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await api.get("/brands");
      setBrands(res.data.brands || []);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!name || !selectedMedia) {
      alert("Please provide identity label and visual asset.");
      return;
    }
    try {
      await api.post("/brands", { name, image_id: selectedMedia.id });
      setName("");
      setSelectedMedia(null);
      fetchBrands();
    } catch (err) {
      console.error(err);
      alert("Failed to commit brand identity.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to purge this identity node?")) return;
    try {
      await api.delete(`/brands/${id}`);
      fetchBrands();
    } catch (err) {
      console.error(err);
      alert("Failed to purge identity.");
    }
  };

  // Media Logic
  const openMediaSelector = () => {
    setShowMediaModal(true);
    fetchMediaItems();
  };

  const fetchMediaItems = async () => {
    setMediaLoading(true);
    try {
      const res = await api.get("/media");
      if (res.data.success) {
        setMediaItems(res.data.data.filter(item => item.type?.startsWith("image/")));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMediaLoading(false);
    }
  };

  const filteredMedia = mediaItems.filter(item =>
    item.name?.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Globe size={16} className="text-primary animate-pulse" />
            <span>Identity Nexus Alpha</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Identity Nexus</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <Activity size={18} /> Network Integrity: 100%
          </div>
          <button 
            onClick={fetchBrands}
            className="p-4 text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-background-site dark:hover:bg-slate-800 rounded-2xl transition-all"
          >
            <RotateCw size={22} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: MANAGEMENT FORM */}
        <div className="xl:col-span-4 space-y-8">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden sticky top-10 transition-all group">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-background-site/30 dark:bg-slate-950/30 flex items-center gap-6">
                <div className="p-4 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20">
                    <Building2 size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Node Forge</h2>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mt-1">Identity Configuration</p>
                </div>
            </div>

            <form onSubmit={handleAddBrand} className="p-12 space-y-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase ml-2 tracking-[0.3em]">Identity Label</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Registry Name..." 
                  className="w-full bg-background-site dark:bg-slate-100/5 border-2 border-transparent focus:border-primary/20 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner" 
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase ml-2 tracking-[0.3em]">Visual Asset</label>
                <div 
                  onClick={openMediaSelector}
                  className="relative group/asset cursor-pointer overflow-hidden rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800 bg-background-site/50 dark:bg-slate-910/50 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all aspect-video flex flex-col items-center justify-center p-8 gap-4"
                >
                  {selectedMedia ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                      <img 
                        src={selectedMedia.thumbnail ? (selectedMedia.thumbnail.startsWith('http') ? selectedMedia.thumbnail : `${baseUrl}/${selectedMedia.thumbnail}`) : `${baseUrl}/${selectedMedia.path}${selectedMedia.name}`} 
                        className="w-full h-full object-cover grayscale opacity-50 group-hover/asset:opacity-20 transition-all duration-700" 
                        alt="selected"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl flex items-center gap-4">
                            <CheckCircle size={32} className="text-primary" />
                            <div className="text-left">
                               <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Selected Artifact</p>
                               <p className="text-xs font-black text-text-pri dark:text-white uppercase tracking-tight">{selectedMedia.name}</p>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="p-6 bg-surface dark:bg-slate-950 rounded-[2rem] text-slate-200 dark:text-slate-800 shadow-inner group-hover/asset:scale-110 group-hover/asset:text-primary transition-all duration-500">
                        <ImageIcon size={40} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700 text-center">Open Visual<br/>Registry</p>
                    </>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!name || !selectedMedia}
                className="w-full bg-primary hover:bg-black dark:hover:bg-primary-dark text-white py-8 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/20 active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4"
              >
                <Zap size={20} /> Commit to Nexus
              </button>
            </form>
          </section>
        </div>

        {/* RIGHT: DATA DISPLAY */}
        <div className="xl:col-span-8 space-y-12 h-screen pb-40 scrollbar-hide">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group h-full">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Active Registries</h3>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Identity Node Protocol</p>
              </div>
              <div className="flex bg-background-site dark:bg-slate-950 p-3 rounded-3xl border border-slate-100 dark:border-slate-800">
                 <div className="px-6 py-3 bg-primary text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-primary/20">
                    {brands.length} Total Nodes
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12 overflow-y-auto">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-background-site dark:bg-slate-950 aspect-[4/5] rounded-[3rem] border border-slate-100 dark:border-slate-800 animate-pulse" />
                ))
              ) : brands.length === 0 ? (
                <div className="col-span-full py-40 text-center opacity-10 flex flex-col items-center">
                  <Building2 size={120} className="mb-8" />
                  <p className="text-4xl font-black uppercase tracking-[0.5em]">Nexus Empty</p>
                </div>
              ) : (
                brands.map((brand) => (
                  <motion.div 
                    layout
                    key={brand.id} 
                    className="group-card bg-surface dark:bg-slate-900 aspect-[4/5] rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden flex flex-col"
                  >
                    <div className="flex-1 p-8 pb-0">
                      <div className="w-full h-full rounded-[2rem] bg-background-site dark:bg-slate-950/50 p-6 flex items-center justify-center relative overflow-hidden border border-slate-100 dark:border-slate-800">
                        <img 
                          src={brand.image_url.startsWith('http') ? brand.image_url : `${baseUrl}/${brand.image_url.replace(/^\/+/, '')}`} 
                          alt={brand.name} 
                          className="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000" 
                        />
                      </div>
                    </div>
                    <div className="h-28 p-8 flex justify-between items-center bg-background-site/10 dark:bg-slate-950/20 backdrop-blur-sm border-t border-slate-50 dark:border-slate-800/50">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Identity Node</p>
                        <h4 className="text-lg font-black text-text-pri dark:text-white uppercase tracking-tight">{brand.name}</h4>
                      </div>
                      <button 
                        onClick={() => handleDelete(brand.id)}
                        className="p-5 text-slate-300 hover:text-white hover:bg-rose-600 rounded-2xl transition-all hover:shadow-xl active:scale-90"
                      >
                        <Trash2 size={24}/>
                      </button>
                    </div>
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-xl">
                            <MoreVertical size={18} className="text-slate-900 dark:text-white" />
                        </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            <footer className="p-12 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
                <p className="text-[9px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.4em]">Integrated Identity Protocol v8.0.0</p>
                <div className="flex items-center gap-4 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                   <Zap size={14} fill="currentColor" /> Live Node Sync Active
                </div>
            </footer>
          </section>
        </div>
      </main>

      {/* Media Vault Modal */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl transition-all duration-500 overflow-hidden">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-surface dark:bg-slate-900 rounded-[5rem] shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-16 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-surface dark:bg-slate-900 relative">
                <div className="absolute top-0 left-16 w-40 h-1 bg-primary" />
                <div className="space-y-3">
                  <h3 className="text-4xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Media Vault</h3>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">Map cluster to identity node</p>
                </div>
                <button 
                  onClick={() => setShowMediaModal(false)} 
                  className="p-6 bg-background-site dark:bg-slate-950 text-slate-300 hover:text-rose-600 rounded-[2.5rem] transition-all hover:rotate-90 active:scale-90 border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  <X size={32}/>
                </button>
              </div>

              <div className="px-16 py-10 bg-surface dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="relative group/search">
                  <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-colors" size={28} />
                  <input 
                    type="text" 
                    placeholder="Scan asset directory..." 
                    value={mediaSearch} 
                    onChange={e => setMediaSearch(e.target.value)}
                    className="w-full pl-24 pr-12 py-8 bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[3rem] text-lg font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800 shadow-inner" 
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-16 bg-surface dark:bg-slate-900 custom-scrollbar">
                {mediaLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-10">
                    <div className="relative">
                       <RotateCw size={100} className="animate-spin text-primary opacity-10" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 animate-pulse text-center">Syncing Vault...</p>
                  </div>
                ) : filteredMedia.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full opacity-10 py-40">
                    <ImageIcon size={160} />
                    <p className="text-4xl font-black uppercase tracking-[0.8em]">Vault Empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
                    {filteredMedia.map(item => {
                      const url = item.thumbnail ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${baseUrl}/${item.thumbnail}`) : `${baseUrl}/${item.path}${item.name}`;
                      const selected = selectedMedia?.id === item.id;

                      return (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedMedia(item)}
                          className={`relative aspect-square rounded-[3rem] overflow-hidden cursor-pointer group transition-all duration-700 hover:-translate-y-4 ${
                            selected ? 'ring-[8px] ring-primary ring-offset-8 dark:ring-offset-slate-900 scale-95 shadow-2xl' : 'shadow-sm'
                          }`}
                        >
                          <img src={url} alt={item.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-125" />
                          <div className={`absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                             <div className="bg-white text-primary p-6 rounded-[2rem] shadow-2xl animate-in zoom-in-50">
                                <CheckCircle size={40} />
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <footer className="p-16 border-t border-slate-100 dark:border-slate-800 bg-surface dark:bg-slate-900 flex justify-end gap-10">
                   <button 
                    onClick={() => setShowMediaModal(false)}
                    className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] hover:bg-background-site dark:hover:bg-slate-950 rounded-[2rem] transition-all border-2 border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                  >
                    Abort
                  </button>
                  <button 
                    onClick={() => setShowMediaModal(false)}
                    className="px-16 py-6 bg-primary text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/30 hover:bg-black active:scale-95"
                  >
                    Load Asset
                  </button>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}