import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Save, RotateCcw, 
  ChevronRight, Eye, History, CheckCircle2, 
  Info, Clock, Search, Bell, UserCircle
} from 'lucide-react';

export default function AdminLegalSettings() {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      
      {/* --- TOP NAVBAR --- */}
      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-md">
            <ShieldCheck size={20} />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Home <ChevronRight size={12} /> <span className="text-indigo-600">Legal Management</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search content..." className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all w-64" />
          </div>
          <div className="relative cursor-pointer hover:opacity-70">
              <Bell size={20} className="text-slate-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">0</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-800">Administrator</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Super Admin</p>
              </div>
              <UserCircle size={36} className="text-indigo-600" />
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="p-8 md:p-12 lg:p-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
               Admin Privacy Policy And Terms & Conditions
              </h1>
              <p className="text-slate-500 font-medium italic">Manage and update the legal framework of citycommerce.com</p>
            </div>

            {/* Centered Tab Switcher */}
            <div className="flex bg-white p-1.5 rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-200">
              <button 
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-2 px-8 py-3 rounded-[1.2rem] text-sm font-bold transition-all ${
                  activeTab === 'privacy' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <ShieldCheck size={18} />
                Privacy Policy
              </button>
              <button 
                onClick={() => setActiveTab('terms')}
                className={`flex items-center gap-2 px-8 py-3 rounded-[1.2rem] text-sm font-bold transition-all ${
                  activeTab === 'terms' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <FileText size={18} />
                Terms & Conditions
              </button>
            </div>
          </div>

          {/* Editor Card */}
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-200 overflow-hidden">
            
            {/* Toolbar */}
            <div className="px-10 py-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                  <button className="px-5 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-bold text-sm">B</button>
                  <button className="px-5 py-2 hover:bg-slate-50 rounded-lg text-slate-700 italic font-serif text-sm">I</button>
                  <button className="px-5 py-2 hover:bg-slate-50 rounded-lg text-slate-700 underline text-sm">U</button>
                </div>
                <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Clock size={14} /> Last edited 2 mins ago
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="View History">
                  <History size={20} />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Preview Live">
                  <Eye size={20} />
                </button>
              </div>
            </div>

            {/* Writing Area */}
            <div className="p-12 md:p-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Editor Mode</span>
              </div>
              
              <textarea
                className="w-full min-h-[600px] bg-transparent border-none outline-none text-slate-700 leading-[1.8] font-serif text-xl resize-none placeholder:text-slate-200"
                placeholder={`Start typing the ${activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}...`}
                defaultValue={activeTab === 'privacy' 
                  ? "Costumers ACCESSING, BROWSING OR OTHERWISE USING THE WEBSITE citycommerce.com indicates user is in AGREEMENT with citycommerce vegetables & fruits Pvt Ltd..." 
                  : "Gmartfresh reserves the right to add, alter, change, modify or delete any of these terms and conditions at any time without prior information..."}
              />
            </div>

            {/* Action Footer */}
            <div className="px-12 py-10 bg-slate-50/80 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 p-5 bg-white border border-indigo-100 rounded-[2rem] shadow-sm max-w-md">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Info size={24} />
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  <span className="font-bold text-slate-800">Compliance Check:</span> Ensure your {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms'} match current data protection laws (GDPR/DPDP).
                </p>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto">
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-10 py-5 bg-white border-2 border-slate-200 text-slate-600 rounded-[1.5rem] font-bold hover:bg-slate-100 transition-all active:scale-95">
                  <RotateCcw size={20} />
                  Reset Draft
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-14 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-bold shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98]">
                  <Save size={20} />
                  Update {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms'}
                </button>
              </div>
            </div>
          </div>

          {/* Copyright Note */}
          <div className="mt-16 text-center">
             <div className="flex justify-center gap-4 mb-4 opacity-30 grayscale">
                <div className="h-6 w-12 bg-slate-400 rounded-sm"></div>
                <div className="h-6 w-12 bg-slate-400 rounded-sm"></div>
                <div className="h-6 w-12 bg-slate-400 rounded-sm"></div>
             </div>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                Copyright © 2026 - 2027 Jijai Masale. All Right Reserved
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}