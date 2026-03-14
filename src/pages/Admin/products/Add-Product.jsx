import React, { useState } from 'react';
import { Upload, X, ChevronDown, Save, RotateCcw, Plus, Activity, Shield, ChevronRight, Package, Image as ImageIcon, Video, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    identification: '',
    madeIn: '',
    brand: '',
    tags: '',
    type: 'Physical Product',
    shortDescription: '',
    tax: [],
    taxIncluded: false,
    videoType: 'None',
    indicator: 'None',
    totalAllowedQuantity: 1,
    minOrderQuantity: 1,
    warranty: '',
    guarantee: '',
    stepSize: 1,
    description: ''
  });

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Plus size={16} className="text-primary animate-pulse" />
            <span>Registry Vector v6.2</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Assemble Asset</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-background-site dark:bg-slate-800 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all active:scale-95"
          >
            TERMINAL_BACK
          </button>
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> Buffer Status: Ready
          </div>
        </div>
      </header>

      <form className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Main Info */}
          <div className="lg:col-span-8 space-y-10">
            {/* Product Information Card */}
            <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all group">
              <div className="px-12 py-10 border-b border-slate-50 dark:border-slate-800/50 bg-background-site/20 dark:bg-slate-950/20 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                        <Package size={22} />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-widest">Metadata Core</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Initialize Primary Spec</p>
                    </div>
                </div>
                <button type="button" className="w-12 h-12 flex items-center justify-center hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-transparent hover:border-red-500/10"><X size={24} /></button>
              </div>
              <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <InputField label="Visual Label" required placeholder="Display Name for Storefront" />
                <InputField label="Identity Sequence" placeholder="SKU / Serial ID" />
                <SelectField label="Origin Cluster" options={['Select Country of Manufacture', 'India', 'USA', 'Germany']} />
                <SelectField label="Architectural Brand" options={['Select Brand Identity', 'Kalki Premium', 'Global Spices']} />
                <div className="md:col-span-1 space-y-4">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Registry Keywords</label>
                  <input type="text" placeholder="Tag stream (comma separated)" className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner" />
                </div>
                <InputField label="Vector Archetype" value="Physical Asset" readOnly />
                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Executive Summary <span className="text-primary">*</span></label>
                  <textarea rows="4" placeholder="Brief architectural overview of the asset..." className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2.5rem] px-8 py-6 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* Product Tax & Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 space-y-10 group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h3 className="text-xs font-black text-text-pri dark:text-white uppercase tracking-[0.3em] border-b border-slate-100 dark:border-slate-800 pb-6 flex items-center gap-3">
                    <Shield size={18} className="text-primary" /> Fiscal Policy
                </h3>
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Tax Logic Engine</label>
                    <div className="flex flex-wrap items-center gap-3 bg-background-site dark:bg-slate-950 border-2 border-transparent focus-within:border-primary/10 rounded-[2rem] p-4 shadow-inner">
                      <span className="bg-primary text-white text-[9px] font-black px-4 py-2 rounded-full flex items-center gap-3 uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        <X size={12} className="cursor-pointer" /> NO_TAX_ACTIVE
                      </span>
                      <input type="text" placeholder="Add protocol..." className="bg-transparent outline-none text-sm font-black text-text-pri dark:text-white flex-1 min-w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-background-site/50 dark:bg-slate-950/20 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/20">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Inclusive Protocol</span>
                    <Switch checked={productData.taxIncluded} onChange={() => setProductData({...productData, taxIncluded: !productData.taxIncluded})} />
                  </div>
                </div>
              </section>

              <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm p-12 space-y-10 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <h3 className="text-xs font-black text-text-pri dark:text-white uppercase tracking-[0.3em] border-b border-slate-100 dark:border-slate-800 pb-6 flex items-center gap-3">
                    <Video size={18} className="text-primary" /> Media Stream
                </h3>
                <div className="relative z-10">
                    <SelectField label="Video Interface Protocol" options={['None', 'Youtube-Nexus', 'Vimeo-Archway', 'Self-Hosted Buffer']} />
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT COLUMN: Categories */}
          <div className="lg:col-span-4 lg:sticky lg:top-10 h-fit space-y-10">
            <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden transition-all group">
              <div className="px-10 py-10 border-b border-slate-50 dark:border-slate-800/50 bg-background-site/20 dark:bg-slate-950/20">
                <h3 className="text-sm font-black text-text-pri dark:text-white uppercase tracking-widest flex items-center gap-3">
                   <Grid size={20} className="text-primary" /> Hierarchy Hub
                </h3>
              </div>
              <div className="p-10 space-y-8 max-h-[600px] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Domain Selection <span className="text-primary">*</span></label>
                  <div className="space-y-4 p-8 bg-background-site/50 dark:bg-slate-950/30 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                    <CategoryItem label="Ready Mix Masala" icon="🌶️" />
                    <CategoryItem label="Khada Masala" icon="🌿" />
                    <CategoryItem label="Spices Powders" icon="✨" />
                  </div>
                </div>
              </div>
              <footer className="p-10 bg-background-site/10 dark:bg-slate-950/10 border-t border-slate-100 dark:border-slate-800 text-center">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Select multiple for cross-domain association</p>
              </footer>
            </section>
          </div>
        </div>

        {/* Product Images Section */}
        <section className="bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-16 space-y-12 transition-all group">
          <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-10">
             <div className="w-2 h-10 bg-primary rounded-full" />
             <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-[0.2em]">Visual Artifacts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ImageUploadBox label="Primary Frame (Hero)" recommended="500 x 500 PX | 300 DPI" />
            <ImageUploadBox label="Secondary Gallery Nodes" recommended="500 x 500 PX | 72 DPI" multipayload />
          </div>
        </section>

        {/* Product Quantity & Other */}
        <section className="bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-16 space-y-12 transition-all group">
          <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-10">
             <div className="w-2 h-10 bg-primary rounded-full" />
             <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-[0.2em]">Operational Pulse</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <SelectField label="Dietary Indicator Tag" options={['None', 'Verified Veg', 'Verified Non-Veg', 'Universal']} />
            <InputField label="Max Throughput (Capacity)" type="number" defaultValue="1" />
            <InputField label="Minimum Order Floor" type="number" defaultValue="1" />
            <InputField label="Warranty Lifecycle" placeholder="Period (e.g. 1 Year Cluster)" />
            <InputField label="Guarantee Matrix" placeholder="Period (e.g. 6 Month Buffer)" />
            <InputField label="Scale / Step Size" type="number" defaultValue="1" />
          </div>
        </section>

        {/* Description Section */}
        <section className="bg-surface dark:bg-slate-900 rounded-[5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all group">
          <div className="px-16 py-12 border-b border-slate-50 dark:border-slate-800/50 bg-background-site/20 dark:bg-slate-950/20 flex items-center gap-6">
            <div className="w-2 h-10 bg-primary rounded-full" />
            <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-[0.2em]">Technical Specification</h3>
          </div>
          <div className="p-16">
            <div className="border border-slate-100 dark:border-slate-800 rounded-[3rem] overflow-hidden bg-background-site/50 dark:bg-slate-950/30 shadow-inner">
              <div className="bg-surface dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-8 flex flex-wrap gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <div className="border-r border-slate-200 dark:border-slate-800 pr-8 flex gap-6">
                  <span className="hover:text-primary cursor-pointer transition-colors px-2">File</span>
                  <span className="hover:text-primary cursor-pointer transition-colors px-2">Edit</span>
                  <span className="hover:text-primary cursor-pointer transition-colors px-2">Protocol</span>
                </div>
                <div className="flex gap-8 items-center">
                  <span className="text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">Rich-Text-Terminal</span>
                  <span className="opacity-50">UTF-8 Encoding</span>
                </div>
              </div>
              <textarea 
                rows="12" 
                placeholder="Initialize global specification matrix..."
                className="w-full p-12 bg-transparent outline-none text-base font-medium text-text-pri/70 dark:text-white/60 placeholder:text-slate-200 dark:placeholder:text-slate-800 resize-none font-mono"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <section className="flex flex-col sm:flex-row justify-end gap-6 pb-32 max-w-7xl mx-auto">
          <button type="reset" className="group flex items-center justify-center gap-4 bg-background-site dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-red-500 px-12 py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-sm border border-transparent hover:border-red-500/10">
            <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-700" /> 
            Purge Local Buffer
          </button>
          <button type="submit" className="group flex items-center justify-center gap-4 bg-primary hover:bg-black text-white px-20 py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all active:scale-95 shadow-2xl shadow-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 font-mono" />
            <Save size={20} className="relative z-10 transition-transform group-hover:scale-125" /> 
            <span className="relative z-10">Execute Global Registry</span>
          </button>
        </section>
      </form>
    </div>
  );
}

/* Internal Sub-components */

function InputField({ label, required, ...props }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input 
        className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none transition-all placeholder:text-slate-200 shadow-inner"
        {...props} 
      />
    </div>
  );
}

function SelectField({ label, options }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">{label}</label>
      <div className="relative group/filter-select">
        <select className="w-full bg-background-site dark:bg-slate-950 border-2 border-transparent focus:border-primary/10 rounded-[2rem] px-8 py-5 text-sm font-black text-text-pri dark:text-white outline-none appearance-none cursor-pointer transition-all shadow-inner">
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/filter-select:text-primary group-focus-within/filter-select:rotate-180 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

function CategoryItem({ label, icon }) {
  return (
    <label className="group relative flex items-center justify-between p-5 bg-surface dark:bg-slate-900 rounded-[2rem] border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-background-site dark:bg-slate-950 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <span className="text-xs font-black text-text-pri/80 dark:text-white/80 uppercase tracking-tight group-hover:text-primary transition-colors">
          {label}
        </span>
      </div>
      <div className="relative flex items-center">
        <input type="checkbox" className="peer sr-only" />
        <div className="w-6 h-6 rounded-lg border-2 border-slate-100 dark:border-slate-800 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
           <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
    </label>
  );
}

function ImageUploadBox({ label, recommended, multipayload }) {
  return (
    <div className="space-y-8 flex-1">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">{label}</label>
      <div className="border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem] p-16 flex flex-col items-center justify-center bg-background-site/30 dark:bg-slate-950/20 hover:bg-surface dark:hover:bg-slate-900 transition-all cursor-pointer group relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
        <div className="relative z-10 p-8 bg-surface dark:bg-slate-950 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 group-hover:text-primary group-hover:border-primary/20">
          <Upload size={48} className="transition-transform group-hover:scale-110" />
        </div>
        <div className="mt-10 text-center space-y-3 relative z-10">
          <p className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">Inject Payload</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Drag and Drop or <span className="text-primary cursor-pointer hover:underline">Scan Terminal</span></p>
          <div className="flex items-center justify-center gap-3 mt-4">
             <div className="px-5 py-2 bg-background-site dark:bg-slate-950 rounded-full border border-slate-100 dark:border-slate-800 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest shadow-inner">
                {recommended}
             </div>
             {multipayload && <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full border border-primary/10">Multi-Array</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Switch({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer group/toggle">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-16 h-8 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[24px] after:w-[24px] after:transition-all duration-500 peer-checked:bg-primary shadow-inner ring-offset-4 ring-offset-surface dark:ring-offset-slate-900 peer-checked:ring-4 peer-checked:ring-primary/20" />
    </label>
  );
}