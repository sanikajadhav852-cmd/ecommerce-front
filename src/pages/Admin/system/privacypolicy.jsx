import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  RotateCcw, 
  Save, 
  Eye, 
  Info,
  History,
  CheckCircle2
} from 'lucide-react';

export default function PolicySettings() {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Legal & Compliance</h1>
            <p className="text-sm text-slate-500 font-medium">Manage your platform's legal agreements and user policies</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-4 py-2 rounded-xl border border-slate-200">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="text-indigo-600">Privacy & Terms</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* --- Main Container --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* --- Tab Navigation --- */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === 'privacy' 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileText size={18} />
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === 'terms' 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <ShieldCheck size={18} />
              Terms & Conditions
            </button>
          </div>

          <div className="p-8">
            {/* --- Editor Toolbar Mockup --- */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
                <button className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors"><Eye size={16} /></button>
                <button className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors"><History size={16} /></button>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Auto-saved at 16:45
                </div>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {activeTab === 'privacy' ? '592 words' : '2905 words'}
                </div>
              </div>
            </div>

            {/* --- Editor Area --- */}
            <div className="relative group">
              <textarea
                className="w-full min-h-[500px] p-8 bg-slate-50/30 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all text-slate-700 leading-relaxed font-serif text-lg"
                placeholder={activeTab === 'privacy' ? "Enter Privacy Policy content..." : "Enter Terms & Conditions content..."}
                defaultValue={activeTab === 'privacy' ? "Costumers ACCESSING, BROWSING OR OTHERWISE USING THE WEBSITE..." : "Personal Information eshop.com respects your privacy..."}
              />
              
              {/* Floating Info Tag */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  <Info size={14} className="text-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">HTML Supported</span>
                </div>
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 text-slate-400 italic text-sm">
                <Info size={16} />
                Changes will be reflected immediately on the mobile app.
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all">
                  <RotateCcw size={18} />
                  Reset
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95">
                  <Save size={18} />
                  Update Policies
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Note --- */}
        <p className="text-center mt-8 text-xs text-slate-400 font-medium">
          Legal System Version 4.4.1 • Last Updated: March 13, 2026
        </p>
      </div>
    </div>
  );
}