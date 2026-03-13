import React, { useState } from 'react';
import { 
  BellRing, Key, ShieldCheck, FileJson, 
  UploadCloud, RotateCcw, Save, Info,
  ExternalLink, ChevronRight
} from 'lucide-react';

export default function NotificationSettings() {
  const [fileName, setFileName] = useState('No file chosen');
  const [formData, setFormData] = useState({
    vapidKey: '',
    firebaseId: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <BellRing size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notification Settings</h1>
            <p className="text-sm text-slate-500 font-medium">Configure Firebase Cloud Messaging and VAPID credentials</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <span>Dashboard</span>
          <ChevronRight size={14} />
          <span className="text-indigo-600">Settings</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* --- Technical Info Alert --- */}
          <div className="bg-indigo-50/50 px-8 py-4 border-b border-indigo-100 flex items-center gap-3">
            <Info size={18} className="text-indigo-600 shrink-0" />
            <p className="text-xs font-medium text-indigo-700">
              These settings are required to enable Web Push notifications. Make sure your Firebase project is correctly configured.
            </p>
          </div>

          <form className="p-8 space-y-8">
            
            {/* --- VapID Key Section --- */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Key size={14} className="text-indigo-500" />
                VAPID Public Key
              </label>
              <div className="relative group">
                <textarea
                  rows={3}
                  placeholder="Paste your VAPID Public Key here..."
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-mono leading-relaxed"
                />
              </div>
            </div>

            {/* --- Firebase Project ID Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-amber-500" />
                  Firebase Project ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. my-awesome-app-123"
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>

              {/* Helpful Link Placeholder */}
              <div className="flex items-center bg-slate-50 rounded-2xl px-6 py-4 border border-dashed border-slate-200">
                <div className="text-xs text-slate-500 leading-relaxed">
                  Need help finding these? <br />
                  <a href="#" className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-1">
                    Visit Firebase Console <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* --- Service Account Upload --- */}
            <div className="space-y-4 pt-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <FileJson size={14} className="text-rose-500" />
                Service Account File
              </label>
              
              <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-8 transition-all hover:border-indigo-300 hover:bg-indigo-50/30 group">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{fileName}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Only <span className="text-rose-500 font-bold">.json</span> files are allowed
                  </p>
                </div>
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                <Save size={18} />
                Update Notification Settings
              </button>
              
              <button
                type="reset"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
              >
                <RotateCcw size={18} />
                Reset Fields
              </button>
            </div>

          </form>
        </div>
        
        {/* --- Footer Note --- */}
        <p className="text-center mt-6 text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
          <ShieldCheck size={12} /> Version 4.4.1 Secure Configuration Environment
        </p>
      </div>
    </div>
  );
}