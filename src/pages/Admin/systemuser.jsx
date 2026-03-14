import React, { useState } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, 
  UserPlus, ShieldCheck, Mail, Phone, 
  Edit2, Trash2, Columns,
  ChevronRight, Zap, Shield, Fingerprint, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageSystemUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users] = useState([
    {
      id: 1,
      userId: "ADM-001",
      username: "Administrator",
      mobile: "9834972896",
      email: "admin@system.com",
      role: "SUPER ADMIN",
      status: "Active"
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">
            <Shield size={16} className="animate-pulse" />
            <span>High-Level Permission Layer</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-indigo-600/20 uppercase tracking-widest hidden sm:block">
               V 4.4.1
             </span>
             <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Presence</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 px-6 py-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span>Root</span> <ChevronRight size={14} className="text-slate-300 dark:text-slate-800" /> <span className="text-indigo-600 dark:text-indigo-400 tracking-widest">ACCESS_CONTROL</span>
        </div>
      </header>

      {/* --- MAIN OPERATIONAL INTERFACE --- */}
      <main className="max-w-7xl mx-auto">
        <section className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
          
          {/* --- TOP COMMAND RIBBON --- */}
          <div className="p-10 border-b border-slate-50 dark:border-slate-800/50 flex flex-col xl:flex-row xl:items-center justify-between gap-10 bg-white dark:bg-slate-900">
            <button className="group flex items-center gap-4 bg-indigo-600 hover:bg-black dark:hover:bg-indigo-500 text-white px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/20 transition-all active:scale-95 w-full xl:w-auto justify-center">
              <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
              Onboard Security Node
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 w-full lg:w-auto">
              {/* Search Engine */}
              <div className="relative group flex-1 w-full min-w-[320px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={22} />
                <input
                  type="text"
                  placeholder="Scan registry by name, hash or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-[2rem] text-[1rem] font-bold text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 shadow-inner"
                />
              </div>

              {/* Advanced Utilities */}
              <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                <button className="p-4 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Synchronize Cache">
                  <RotateCw size={20} />
                </button>
                <button className="p-4 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Grid Config">
                  <Columns size={20} />
                </button>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-3" />
                <button className="p-4 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm active:scale-90" title="Extract Ledger">
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* --- DATA MATRIX --- */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-50 dark:border-slate-800/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Logical Hash</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Entity Profile</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Comm Links</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-center">Auth Tier</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-center">Protocol Presence</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-right">Ops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-950/30 transition-all duration-500">
                    <td className="px-10 py-8 text-xs font-black text-indigo-600 dark:text-indigo-500 font-mono tracking-tighter">
                      <div className="flex items-center gap-3">
                         <Fingerprint size={14} className="opacity-40" />
                         {user.userId}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-[1.25rem] bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-2xl shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-500 ring-4 ring-white dark:ring-slate-900">
                          {user.username.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <div className="text-[1rem] font-black text-slate-900 dark:text-white tracking-tight">{user.username}</div>
                          <div className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Activity size={10} className="text-emerald-500" /> Kernel Administrator
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 font-black">
                          <Phone size={14} className="text-indigo-600" /> {user.mobile}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">
                          <Mail size={14} className="text-slate-300 dark:text-slate-800" /> {user.email || 'null_ptr_ref'}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className="inline-flex items-center gap-3 px-5 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-full text-[9px] font-black border border-white/10 dark:border-transparent uppercase tracking-[0.2em] shadow-xl group-hover:scale-105 transition-transform">
                        <ShieldCheck size={14} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="inline-flex items-center gap-3 text-[9px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-500/20">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse" />
                        {user.status}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-4 text-slate-400 hover:text-white hover:bg-slate-950 dark:hover:bg-slate-800 border border-transparent rounded-[1.25rem] transition-all shadow-sm active:scale-95" title="Modify Node">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-4 text-slate-400 hover:text-white hover:bg-rose-600 border border-transparent rounded-[1.25rem] transition-all shadow-sm active:scale-95" title="Purge Access">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- FOOTER LEDGER --- */}
          <footer className="p-10 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.4em]">
              Node Aggregate: <span className="text-indigo-600 dark:text-indigo-400 mx-2 text-sm">{users.length}</span> Active Sessions
            </div>
            <div className="flex gap-4">
              <button disabled className="px-10 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-800 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-not-allowed transition-all">Previous Block</button>
              <button className="px-10 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-white bg-indigo-600 rounded-2xl hover:bg-black dark:hover:bg-indigo-700 shadow-2xl shadow-indigo-600/20 transition-all active:scale-95">Advance Ledger</button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}