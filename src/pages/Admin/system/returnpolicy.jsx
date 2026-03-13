import React, { useState } from 'react';
import { 
  RotateCcw, Save, Undo2, ChevronRight, Info,
  CheckCircle2, Clock, History, Eye, ShieldCheck
} from 'lucide-react';

export default function ReturnPolicy() {
  const [charCount, setCharCount] = useState(132); // Initial count based on default text

  const handleContentChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="p-6 md:p-12 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Header Section --- */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-600 rounded-[1.5rem] shadow-xl shadow-indigo-100 text-white">
              <Undo2 size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">
                System Management <ChevronRight size={10} /> Policies
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Return Policy Settings</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-100">
              <Clock size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500">Last Saved: 16:45 PM</span>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
              <History size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* --- Main Editor Card --- */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
          
          {/* Top Info Bar */}
          <div className="px-10 py-4 bg-indigo-50/50 border-b border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-tight">Live Editor Active</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline">
              <Eye size={14} /> Preview on Storefront
            </button>
          </div>

          {/* Formatting Toolbar Mockup */}
          <div className="px-10 py-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-50 border border-slate-200 rounded-2xl p-1 shadow-inner">
                <button className="px-5 py-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-700 font-bold text-sm transition-all">B</button>
                <button className="px-5 py-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-700 italic font-serif text-sm transition-all">I</button>
                <button className="px-5 py-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-700 underline text-sm transition-all">U</button>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
              <select className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-2.5 text-xs font-bold text-slate-600 outline-none transition-all focus:bg-white">
                <option>Normal Text</option>
                <option>Section Heading</option>
                <option>Subsection</option>
              </select>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {charCount.toLocaleString()} Characters
              </div>
            </div>
          </div>

          {/* Writing Area */}
          <div className="p-10 md:p-14">
            <textarea
              onChange={handleContentChange}
              className="w-full min-h-[550px] bg-transparent border-none outline-none text-slate-700 leading-[1.8] font-serif text-xl resize-none placeholder:text-slate-200"
              placeholder="Outline your return window, conditions, and refund process here..."
              defaultValue="Our Return Policy ensures a hassle-free experience. Customers can return items within 30 days of purchase provided they are in original condition with tags intact. Please allow 5-7 business days for refund processing."
            />
          </div>

          {/* Footer Actions */}
          <div className="px-10 py-10 bg-slate-50/80 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4 p-5 bg-white border border-indigo-100 rounded-[2rem] shadow-sm max-w-md">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <ShieldCheck size={24} />
              </div>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                Changes made here will be updated across your <span className="font-bold text-slate-700">Mobile App</span> and <span className="font-bold text-slate-700">Web Dashboard</span> immediately.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-10 py-5 bg-white border-2 border-slate-200 text-slate-600 rounded-[1.5rem] font-bold hover:bg-slate-100 transition-all active:scale-95">
                <RotateCcw size={20} />
                Reset Draft
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-14 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-bold shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98]">
                <Save size={20} />
                Update Return Policy
              </button>
            </div>
          </div>
        </div>

        {/* --- Compliance Footer --- */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 opacity-40 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
          </div>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
            Secure Policy Management Portal v4.4.1
          </p>
        </div>
      </div>
    </div>
  );
}