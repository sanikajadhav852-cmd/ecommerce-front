import React, { useState } from 'react';
import { 
  ShieldCheck, Smartphone, Flame, 
  RotateCcw, Save, CheckCircle2,
  ChevronRight, Lock
} from 'lucide-react';

export default function AuthenticationSettings() {
  const [selectedMode, setSelectedMode] = useState('firebase');

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
            <Lock size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Authentication Mode</h1>
            <p className="text-sm text-slate-500 font-medium">Select the primary method for user verification</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="text-indigo-600">Auth Mode</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Select Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* --- Firebase Option --- */}
              <div 
                onClick={() => setSelectedMode('firebase')}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedMode === 'firebase' 
                  ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' 
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${selectedMode === 'firebase' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Flame size={24} />
                  </div>
                  {selectedMode === 'firebase' && <CheckCircle2 className="text-indigo-600" size={24} />}
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Firebase Authentication</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Use Google's secure infrastructure for social logins and phone verification.
                </p>
              </div>

              {/* --- Custom SMS Option --- */}
              <div 
                onClick={() => setSelectedMode('sms')}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedMode === 'sms' 
                  ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' 
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${selectedMode === 'sms' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Smartphone size={24} />
                  </div>
                  {selectedMode === 'sms' && <CheckCircle2 className="text-indigo-600" size={24} />}
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Custom SMS Gateway</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  OTP-based login using your own SMS provider (Twilio, MSG91, etc).
                </p>
              </div>

            </div>
          </div>

          {/* --- Action Bar --- */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-100">
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
            >
              <Save size={18} />
              Update Authentication Settings
            </button>
            
            <button
              onClick={() => setSelectedMode('firebase')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 px-4 py-3 bg-amber-50 rounded-xl border border-amber-100">
            <ShieldCheck size={16} className="text-amber-600" />
            <p className="text-[11px] font-medium text-amber-700 uppercase tracking-tighter">
              Switching modes may require existing users to re-verify their identity.
            </p>
          </div>

        </div>
        
        <p className="text-center mt-6 text-xs text-slate-400 font-medium">
          System Version 4.4.1 • Secure Auth Management
        </p>
      </div>
    </div>
  );
}