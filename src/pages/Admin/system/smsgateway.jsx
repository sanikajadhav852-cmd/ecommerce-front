import React, { useState } from 'react';
import { 
  Globe, Send, Key, Lock, Plus, Trash2, 
  RotateCcw, Save, Info, ChevronRight,
  Settings2, Database, Code
} from 'lucide-react';

export default function SMSGatewaySettings() {
  const [activeTab, setActiveTab] = useState('header');
  const [headers, setHeaders] = useState([{ id: Date.now(), key: '', value: '' }]);
  const [method, setMethod] = useState('POST');

  // Function to add a new dynamic row
  const addHeaderRow = () => {
    setHeaders([...headers, { id: Date.now(), key: '', value: '' }]);
  };

  // Function to remove a specific row
  const removeHeaderRow = (id) => {
    if (headers.length > 1) {
      setHeaders(headers.filter(row => row.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    const updatedHeaders = headers.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    );
    setHeaders(updatedHeaders);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Page Header --- */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg text-white">
              <Settings2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">SMS Gateway Configuration</h1>
              <p className="text-sm text-slate-500 font-medium">Configure your third-party API gateway endpoints</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-4 py-2 rounded-xl border border-slate-200">
            <span>Gateway</span>
            <ChevronRight size={14} />
            <span className="text-indigo-600">Configuration</span>
          </div>
        </div>

        {/* --- Reference Help Alert --- */}
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info size={18} className="text-amber-600" />
            <p className="text-sm font-medium text-amber-800">Are you confused about how to do this?</p>
          </div>
          <a href="#" className="text-sm font-bold text-amber-600 hover:underline flex items-center gap-1">
            Follow this for reference <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* --- 1. Connection Details Card --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <Globe size={14} /> Connection Details
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500">BASE URL</label>
              <input 
                type="text" 
                placeholder="https://api.yourgateway.com/v1"
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">METHOD</label>
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
              >
                <option>POST</option>
                <option>GET</option>
                <option>PUT</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- 2. Authorization Token Card --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <Lock size={14} /> Create Authorization Token
            </div>
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-100 active:scale-95">
              Create Token
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">ACCOUNT SID</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-mono"
                  placeholder="ACxxxxxxxxxxxxxxxx"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500">AUTH TOKEN</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-mono"
                  placeholder="••••••••••••••••"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. Request Payload (Headers/Body/Params) --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {['header', 'body', 'params'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-extrabold text-slate-800">Add {activeTab} data</h3>
              <button 
                onClick={addHeaderRow}
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {headers.map((row) => (
                <div key={row.id} className="flex flex-col sm:flex-row items-end gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex-1 space-y-2 w-full">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Key</label>
                    <input 
                      type="text"
                      placeholder="e.g. Content-Type"
                      value={row.key}
                      onChange={(e) => handleInputChange(row.id, 'key', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Value</label>
                    <input 
                      type="text"
                      placeholder="e.g. application/json"
                      value={row.value}
                      onChange={(e) => handleInputChange(row.id, 'value', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                    />
                  </div>
                  <button 
                    onClick={() => removeHeaderRow(row.id)}
                    className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Variable Placeholder Reference */}
            <div className="mt-8 p-4 bg-slate-900 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-indigo-400">
                <Code size={16} />
              </div>
              <div className="text-[11px] font-mono text-slate-400 overflow-x-auto whitespace-nowrap">
                {`{only_mobile_number} {mobile_number_with_country_code} {country_code} {message}`}
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer Actions --- */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 pb-12">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95">
            <Save size={20} />
            Update SMS Gateway Settings
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition-all">
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}