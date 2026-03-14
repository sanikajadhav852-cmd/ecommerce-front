import React, { useState } from 'react';
import { Search, ChevronDown, UserPlus, Trash2, CreditCard, ChevronRight, Zap, ShoppingCart, User, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PointOfSale() {
  const [products] = useState([
    { id: 1, name: "KASOORI METHI", image: "https://via.placeholder.com/150", variants: ["200 gm - ₹ 120"], color: "bg-red-800" },
    { id: 2, name: "KASHMIRI CHILLI POWDER", image: "https://via.placeholder.com/150", price: "₹ 450", color: "bg-red-800" },
    { id: 3, name: "BEDGI CHILLI POWDER", image: "https://via.placeholder.com/150", price: "₹ 750", color: "bg-red-800" },
    { id: 4, name: "COCONUT POWDER", image: "https://via.placeholder.com/150", price: "₹ 240", color: "bg-red-800" },
    { id: 5, name: "TURMARIC POWDER", image: "https://via.placeholder.com/150", variants: ["200 gm - ₹ 60"], color: "bg-yellow-500" },
    { id: 6, name: "CORIANDER POWDER", image: "https://via.placeholder.com/150", variants: ["200 gm - ₹ 40"], color: "bg-green-700" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 text-slate-900 dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
            <Zap size={14} className="animate-pulse" />
            <span>Transactional Node</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Point Of Sale</h1>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span>Home</span> <ChevronRight size={14} className="text-slate-300" /> <span className="text-indigo-600 dark:text-indigo-400">Terminal 01</span>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Product Discovery Matrix */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Filter & Search Ribbon */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap gap-8">
            <div className="flex-1 min-w-[280px] space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Category Filter</label>
              <div className="relative group">
                <select className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl p-5 text-sm font-black text-slate-900 dark:text-white outline-none appearance-none transition-all shadow-inner">
                  <option>All Primary Categories</option>
                  <option>Masale</option>
                  <option>Powders</option>
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
              </div>
            </div>
            <div className="flex-1 min-w-[280px] space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-2">Identify Asset</label>
              <div className="relative group">
                <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query SKU, Name or ID..." 
                  className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl p-5 pl-16 text-sm font-black text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 shadow-inner" 
                />
              </div>
            </div>
          </div>

          {/* Product Grid Manifest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center hover:shadow-2xl hover:border-indigo-500/20 transition-all duration-500 relative"
              >
                <div className="w-full flex justify-between items-center mb-10">
                    <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.2em] group-hover:text-indigo-500 transition-colors">HEX-0{product.id}</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30" />
                </div>
                
                <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50" />
                  <img src={product.image} alt={product.name} className="relative z-10 w-full h-full object-contain drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>

                <div className="text-center w-full mb-10 space-y-2">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">{product.name}</h4>
                    <p className="text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest leading-none">Premium Fulfillment Asset</p>
                </div>
                
                <div className="w-full space-y-5">
                  {product.variants ? (
                    <div className="relative">
                      <select className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500 group-hover:bg-white dark:group-hover:bg-slate-900 rounded-[1.5rem] p-4 text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 outline-none appearance-none text-center transition-all shadow-inner">
                        {product.variants.map(v => <option key={v}>{v}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="text-center text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 py-4 rounded-[1.5rem] border border-indigo-100 dark:border-indigo-900/10">
                      {product.price}
                    </div>
                  )}
                  <button className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Inject to Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Cart Intelligence & Settlement Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <section className="bg-white dark:bg-slate-900 p-10 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 sticky top-10 flex flex-col space-y-10">
            
            {/* Active Client Identification */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                   <User size={14} /> Active Entity
                </div>
                <button className="text-rose-500 text-[10px] font-black uppercase tracking-widest hover:text-rose-600 transition-colors">Reset Node</button>
              </div>
              <div className="relative group">
                <select className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/10 rounded-2xl p-5 text-[0.9375rem] font-black text-slate-900 dark:text-white outline-none appearance-none transition-all shadow-inner">
                  <option>Guest Account / Anonymous</option>
                  <option>Registered Client - Master Entry</option>
                </select>
                <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
              </div>
              <div className="flex justify-between items-center gap-4 bg-indigo-600/5 dark:bg-indigo-400/5 p-6 rounded-3xl border border-indigo-500/10 transition-colors group">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tight leading-relaxed">System requires new entity registration?</span>
                <button className="bg-indigo-600 text-white p-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-110 active:scale-90 transition-all">
                  <UserPlus size={20} />
                </button>
              </div>
            </div>

            {/* Current Session Matrix (Cart) */}
            <div className="flex-1 space-y-8 flex flex-col">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                   <ShoppingCart size={24} className="text-indigo-600" />
                   Session Cart
                </h3>
                <span className="bg-slate-900 dark:bg-indigo-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-tighter shadow-lg">0 Units</span>
              </div>
              
              <div className="flex-1 min-h-[250px] flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-950/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 transition-colors group">
                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full mb-8 flex items-center justify-center text-slate-200 dark:text-slate-800 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <Package size={40} />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-700 font-black uppercase tracking-[0.3em]">Matrix Buffer Empty</p>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Base Valuation</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">₹0.00</span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />
                <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Net Final Settlement</span>
                    <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">₹0.00</span>
                </div>
              </div>
            </div>

            {/* Settlement Protocols */}
            <div className="space-y-10">
              <div className="space-y-6 bg-slate-50 dark:bg-slate-950/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-4">Distribution Vector</p>
                  <div className="grid grid-cols-1 gap-4">
                    <RadioOption label="Instant Point Pickup" name="delivery" checked />
                    <RadioOption label="Geospatial Delivery" name="delivery" />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-4">Settlement Logic</p>
                  <div className="grid grid-cols-1 gap-4">
                    <RadioOption label="Physical Tender (Cash)" name="payment" checked />
                    <RadioOption label="Digital Node (UPI)" name="payment" />
                    <RadioOption label="Terminal Swipe (POS Card)" name="payment" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <button className="w-full bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 py-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:text-rose-500 transition-all active:scale-95 shadow-sm">
                  Purge Session Buffer
                </button>
                <button className="w-full bg-indigo-600 text-white py-8 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                  <CreditCard size={22} className="group-hover:rotate-12 transition-transform" /> 
                  Execute Settlement
                </button>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}

function RadioOption({ label, name, checked }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer group p-2">
      <div className="relative flex items-center justify-center">
         <input type="radio" name={name} defaultChecked={checked} className="peer sr-only" />
         <div className="w-5 h-5 rounded-md border-2 border-slate-200 dark:border-slate-800 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition-all" />
         <Zap size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 peer-checked:text-slate-900 dark:peer-checked:text-white group-hover:text-indigo-500 transition-colors">{label}</span>
    </label>
  );
}