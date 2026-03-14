import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { 
  Palette, Save, RotateCcw, ChevronRight, Activity, 
  Shield, CheckCircle, Smartphone, Monitor, Layout, 
  AppWindow, Search, Settings, Sun, Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeColors() {
  const [colors, setColors] = useState({
    primary: "#7c3aed",
    secondary: "#10b981",
    accent: "#ec4899",
    background: "#ffffff",
    surface: "#f9fafb",
    textPrimary: "#111827",
    textSecondary: "#4b5563",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePreview, setActivePreview] = useState("desktop");
  const [systemMode, setSystemMode] = useState("dark"); // Local preview toggle

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/config/theme");
      if (res.data && res.data.success && res.data.data) {
        setColors(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch theme colors:", err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleColorChange = (key, value) => {
    setColors((prev) => ({ ...prev, [key]: value }));
    // Live update CSS variable for immediate feedback in the editor itself
    let cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    cssVarName = cssVarName.replace("-color", "");
    const cssVar = cssVarName.startsWith("--") ? cssVarName : `--${cssVarName}`;
    document.documentElement.style.setProperty(cssVar, value);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.post("/config/theme", colors);
      alert("Chromatic Core Synchronized Successfully.");
    } catch (err) {
      console.error("Failed to save theme colors:", err);
      alert("Core Synchronization Failure.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-site dark:bg-slate-950 transition-colors duration-500">
        <div className="relative">
          <Palette size={64} className="text-primary animate-pulse opacity-20" />
          <Activity size={32} className="absolute inset-0 m-auto text-primary animate-bounce" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 animate-pulse">Initializing Chromatic Matrix...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Shield size={16} className="text-primary" />
            <span>High-Security Identity Core</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">Chromatic Forge</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <button
            onClick={() => setSystemMode(systemMode === 'dark' ? 'light' : 'dark')}
            className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] flex items-center gap-3 border border-primary/10 dark:border-primary-light/10 hover:bg-primary/10 transition-all"
          >
            {systemMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            PREVIEW: {systemMode.toUpperCase()} MODE
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-4 bg-primary hover:bg-black dark:hover:bg-primary-dark text-white px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
          >
            {saving ? <Activity className="animate-spin" size={18} /> : <Save size={18} />}
            Synchronize Core
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: COLOR CONFIGURATION */}
        <div className="xl:col-span-5 space-y-8">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all group">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 bg-background-site/30 dark:bg-slate-950/30 flex items-center gap-6">
                <div className="p-4 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20">
                    <Palette size={24} />
                </div>
                <div>
                   <h2 className="text-xl font-black text-text-pri dark:text-white uppercase tracking-tight">Spectrum Node</h2>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mt-1">Nodal Configuration</p>
                </div>
            </div>

            <div className="p-12 space-y-10">
              <div className="grid grid-cols-1 gap-10">
                <ColorInput label="Primary Engine" value={colors.primary} onChange={(val) => handleColorChange("primary", val)} />
                <ColorInput label="Secondary Orbit" value={colors.secondary} onChange={(val) => handleColorChange("secondary", val)} />
                <ColorInput label="Accent Impulse" value={colors.accent} onChange={(val) => handleColorChange("accent", val)} />
                
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                
                <div className="grid grid-cols-2 gap-8">
                  <ColorInput label="Site Void" value={colors.background} onChange={(val) => handleColorChange("background", val)} />
                  <ColorInput label="Nodal Surface" value={colors.surface} onChange={(val) => handleColorChange("surface", val)} />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <ColorInput label="Primary Data" value={colors.textPrimary} onChange={(val) => handleColorChange("textPrimary", val)} />
                  <ColorInput label="Secondary Data" value={colors.textSecondary} onChange={(val) => handleColorChange("textSecondary", val)} />
                </div>
              </div>
            </div>
            
            <footer className="p-10 bg-background-site/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
               <button 
                  onClick={fetchColors}
                  className="p-5 text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-background-site dark:hover:bg-slate-800 rounded-2xl transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-widest"
               >
                  <RotateCcw size={18} /> Revert to Registry
               </button>
            </footer>
          </section>
        </div>

        {/* RIGHT: LIVE PREVIEW MATRIX */}
        <div className="xl:col-span-7 space-y-8">
          <section className="bg-surface dark:bg-slate-900 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group min-h-[700px]">
            <div className="p-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-background-site/20 dark:bg-slate-950/20">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-text-pri dark:text-white uppercase tracking-tighter">Preview Matrix</h3>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em]">Real-Time Visualization</p>
              </div>
              <div className="flex bg-background-site dark:bg-slate-950 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setActivePreview("desktop")}
                  className={`p-4 rounded-xl transition-all ${activePreview === 'desktop' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'}`}
                >
                  <Monitor size={20} />
                </button>
                <button 
                  onClick={() => setActivePreview("mobile")}
                  className={`p-4 rounded-xl transition-all ${activePreview === 'mobile' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'}`}
                >
                  <Smartphone size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 dark:bg-slate-950/50 p-12 flex items-center justify-center relative overflow-hidden">
                {/* PREVIEW CONTAINER */}
                <motion.div 
                   layout
                   className={`bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-slate-900 transition-all duration-700 ${activePreview === 'desktop' ? 'w-full max-w-4xl aspect-[16/10]' : 'w-[320px] h-[600px] rounded-[4rem] border-[16px]'}`}
                   style={{ 
                     backgroundColor: systemMode === 'light' ? colors.background : '#0d1117' 
                   }}
                >
                   {/* PREVIEW CONTENT (PSEUDO UI) */}
                   <div className="h-full flex flex-col font-sans" style={{ color: systemMode === 'light' ? colors.textPrimary : '#f0f6fc' }}>
                      {/* TOP BAR */}
                      <div className="h-16 px-8 flex items-center justify-between border-b" style={{ borderColor: systemMode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', backgroundColor: systemMode === 'light' ? colors.background : '#0d1117' }}>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: colors.primary }}></div>
                            <div className="space-y-1">
                               <div className="w-20 h-2 rounded-full" style={{ backgroundColor: systemMode === 'light' ? colors.textPrimary : '#f0f6fc', opacity: 0.2 }}></div>
                               <div className="w-12 h-1 rounded-full" style={{ backgroundColor: colors.primary, opacity: 0.5 }}></div>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                         </div>
                      </div>

                      {/* MAIN CONTENT */}
                      <div className="flex-1 p-8 space-y-8 overflow-hidden">
                         <div className="space-y-4">
                            <div className="h-8 w-1/2 rounded-xl" style={{ backgroundColor: systemMode === 'light' ? colors.textPrimary : '#f0f6fc', opacity: 0.1 }}></div>
                            <div className="h-4 w-1/3 rounded-xl" style={{ backgroundColor: colors.secondary, opacity: 0.3 }}></div>
                         </div>

                         <div className="grid grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                               <div key={i} className="aspect-square rounded-[2rem] p-6 space-y-4 shadow-sm" style={{ backgroundColor: systemMode === 'light' ? colors.surface : '#161b22' }}>
                                  <div className="w-10 h-10 rounded-2xl" style={{ backgroundColor: i === 1 ? colors.primary : i === 2 ? colors.secondary : colors.accent }}></div>
                                  <div className="space-y-2">
                                     <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                     <div className="h-2 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                  </div>
                               </div>
                            ))}
                         </div>

                         <div className="space-y-4 pt-4">
                            <div className="h-12 w-full rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white shadow-xl" style={{ backgroundColor: colors.primary }}>
                               Commit Action Protocol
                            </div>
                            <div className="h-12 w-full rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest border-2" style={{ borderColor: colors.accent, color: colors.accent }}>
                               Secondary Directive
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
                
                {/* DECORATIVE ELEMENTS */}
                <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-10">
                   <Layout size={100} />
                   <AppWindow size={100} />
                </div>
            </div>
            
            <footer className="p-12 border-t border-slate-100 dark:border-slate-800 bg-background-site/10 dark:bg-slate-950/20 text-center">
               <p className="text-[9px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.6em]">Chromatic_Engine v2.1 // System_Pulse_Active</p>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <div className="group/input space-y-4">
      <div className="flex justify-between items-end px-2">
        <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">{label}</label>
        <span className="text-[10px] font-black text-primary font-mono uppercase opacity-40 group-hover/input:opacity-100 transition-opacity">{value}</span>
      </div>
      <div className="relative flex items-center gap-4 bg-background-site dark:bg-slate-950 p-4 rounded-[1.5rem] border-2 border-transparent focus-within:border-primary/20 transition-all shadow-inner">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-4 w-[200%] h-[200%] cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-black text-sm tracking-widest text-text-pri dark:text-white uppercase placeholder:text-slate-200"
        />
        <div className="w-8 h-8 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center" style={{ backgroundColor: value }}>
           <CheckCircle size={12} className="text-white mix-blend-difference" />
        </div>
      </div>
    </div>
  );
}