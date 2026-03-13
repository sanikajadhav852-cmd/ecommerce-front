import React, { useState } from 'react';
import { 
  Truck, Save, RotateCcw, ChevronRight, 
  Clock, CheckCircle2, History, Eye, 
  MapPin, AlertCircle 
} from 'lucide-react';

export default function ShippingPolicy() {
  const [charCount, setCharCount] = useState(156);

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
              <Truck size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">
                Store Settings <ChevronRight size={10} /> Logistics
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shipping Policy</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-slate-100">
              <Clock size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500">Auto-saved: 12:10 PM</span>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-all" title="View History">
              <History size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* --- Main Editor Card --- */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="px-10 py-4 bg-indigo-50/50 border-b border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-tight">Deployment Ready</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              <Eye size={14} /> Preview Policy Page
            </button>
          </div>

          {/* Editor Toolbar */}
          <div className="px-10 py-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-50 border border-slate-200 rounded-2xl p-1 shadow-inner">
                <button className="px-5 py-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-700 font-bold text-sm transition-all">B</button>
                <button className="px-5 py-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-700 italic font-serif text-sm transition-all">I</button>
                <button className="px-5 py-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-700 underline text-sm transition-all">U</button>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                 <MapPin size={14} className="text-slate-400" />
                 <span className="text-xs font-bold text-slate-600">Standard Formatting</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {charCount.toLocaleString()} Characters
              </div>
            </div>
          </div>

          {/* Textarea Area */}
          <div className="p-10 md:p-14">
            <textarea
              onChange={handleContentChange}
              className="w-full min-h-[500px] bg-transparent border-none outline-none text-slate-700 leading-[1.8] font-serif text-xl resize-none placeholder:text-slate-200"
              placeholder="Detail your shipping methods, costs, and delivery times..."
              defaultValue="We offer standard shipping (3-5 business days) and express delivery (1-2 business days). Shipping costs are calculated at checkout based on weight and destination. Free shipping applies to orders over $50."
            />
          </div>

          {/* Action Footer */}
          <div className="px-10 py-10 bg-slate-50/80 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4 p-5 bg-white border border-indigo-100 rounded-[2rem] shadow-sm max-w-md">
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                <AlertCircle size={24} />
              </div>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700">Pro Tip:</span> Be sure to mention any holiday delays or international shipping restrictions to avoid customer support tickets.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-10 py-5 bg-white border-2 border-slate-200 text-slate-600 rounded-[1.5rem] font-bold hover:bg-slate-100 transition-all active:scale-95">
                <RotateCcw size={20} />
                Discard
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-14 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-bold shadow-2xl shadow-indigo-200 transition-all active:scale-[0.98]">
                <Save size={20} />
                Update Shipping Policy
              </button>
            </div>
          </div>
        </div>

        {/* --- Brand Footer --- */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
            Official Logistics Policy Management • v 4.4.1
          </p>
        </div>
      </div>
    </div>
  );
}