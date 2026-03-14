import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { 
  MessageSquare, Send, Trash2, Edit2, Plus, 
  Search, RotateCw, Shield, Zap, Activity,
  ChevronRight, Sparkles, Filter, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ type: "", message: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/custom-messages");
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/admin/custom-messages/${editId}`, formData);
        setIsEditing(false);
      } else {
        await api.post("/admin/custom-messages", formData);
      }
      setFormData({ type: "", message: "" });
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert("Core Synchronization Failure.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to purge this message node?")) return;
    try {
      await api.delete(`/admin/custom-messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (msg) => {
    setIsEditing(true);
    setEditId(msg.id);
    setFormData({ type: msg.type, message: msg.message });
  };

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Sparkles size={16} className="text-primary animate-pulse" />
            <span>Messaging Protocol Alpha</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Messaging Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 dark:border-primary-light/10 flex items-center gap-3">
            <Activity size={18} /> Active Logic: Subroutine Delta
          </div>
          <button 
            onClick={fetchMessages}
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
                    <MessageSquare size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Logic Forge</h2>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mt-1">{isEditing ? 'Update Sequence' : 'New Subroutine'}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-12 space-y-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase ml-2 tracking-[0.3em]">Protocol Segment</label>
                <input 
                  type="text" 
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  placeholder="e.g. Order Confirmation..." 
                  className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-[2rem] p-6 text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner" 
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase ml-2 tracking-[0.3em]">Payload Directive</label>
                <textarea 
                  rows={6}
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Enter logic payload..." 
                  className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/20 rounded-[3rem] p-8 text-sm font-black text-text-pri dark:text-white outline-none transition-all shadow-inner resize-none" 
                />
              </div>

              <div className="flex gap-4 pt-10">
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(false); setFormData({type:'', message:''}); }}
                    className="px-8 py-6 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                  >
                    Abort
                  </button>
                )}
                <button 
                  type="submit" 
                  className={`flex-1 ${isEditing ? 'bg-black' : 'bg-primary'} hover:bg-black dark:hover:bg-primary-dark text-white py-8 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-4`}
                >
                  <Zap size={20} /> {isEditing ? 'Sync Pulse' : 'Commit Sequence'}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* RIGHT: DATA DISPLAY */}
        <div className="xl:col-span-8 space-y-12 h-screen pb-40 scrollbar-hide">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group h-full">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Active Registries</h3>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Message Logic Dictionary</p>
              </div>
              <div className="flex bg-background-site dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                 <div className="px-6 py-3 bg-primary text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-primary/20">
                    {messages.length} Active Segments
                 </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-40 text-center flex flex-col items-center justify-center gap-8">
                   <div className="h-20 w-20 animate-spin rounded-full border-[6px] border-primary border-t-transparent opacity-20" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">Scanning Registry...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-40 text-center opacity-10 flex flex-col items-center">
                  <MessageSquare size={100} className="mb-8" />
                  <p className="text-4xl font-black uppercase tracking-[0.5em]">Dictionary Offline</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-background-site/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/50">
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Node Protocol</th>
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Logic Payload</th>
                      <th className="px-12 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] text-right">Ops</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="group hover:bg-background-site/30 dark:hover:bg-slate-800/30 transition-all duration-300">
                        <td className="px-12 py-10">
                          <span className="px-5 py-2 bg-primary/10 text-primary dark:text-primary-light rounded-[1rem] text-[10px] font-black uppercase tracking-widest border border-primary/10">
                            {msg.type}
                          </span>
                        </td>
                        <td className="px-12 py-10 max-w-md">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
                            "{msg.message}"
                          </p>
                        </td>
                        <td className="px-12 py-10 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={() => startEdit(msg)}
                              className="p-4 text-primary hover:bg-primary hover:text-white bg-surface dark:bg-slate-950 rounded-2xl shadow-xl transition-all"
                            >
                              <Edit2 size={20}/>
                            </button>
                            <button 
                              onClick={() => handleDelete(msg.id)}
                              className="p-4 text-rose-600 hover:bg-rose-600 hover:text-white bg-surface dark:bg-slate-950 rounded-2xl shadow-xl transition-all"
                            >
                              <Trash2 size={20}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <footer className="p-12 border-t border-slate-100 dark:border-slate-800 bg-background-site/30 dark:bg-slate-950/30 flex justify-between items-center">
                <p className="text-[9px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.4em]">Automated Logic Forge v12.4</p>
                <div className="flex items-center gap-4 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                   <Activity size={14} className="animate-pulse" /> Logic Sync: Active
                </div>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}