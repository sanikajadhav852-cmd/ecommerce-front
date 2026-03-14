import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Mail, 
  CreditCard, 
  Rocket, 
  Bell, 
  Settings, 
  MessageSquare, 
  Phone, 
  Info, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  UserCircle, 
  ArrowRightCircle,
  ChevronRight,
  Monitor,
  Cpu,
  Shield,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const System = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    { title: "Store Setting", icon: <Store size={24} />, link: "/store-setting", desc: "Core storefront parameters and identity settings" },
    { title: "Email setting", icon: <Mail size={24} />, link: "/email-settings", desc: "SMTP protocol and transmission templates" },
    { title: "Payment methods", icon: <CreditCard size={24} />, link: "/payment-methods", desc: "Fiscal gateways and transaction processors" },
    { title: "Shipping methods", icon: <Rocket size={24} />, link: "/shipping-methods", desc: "Logistics providers and fulfillment logic" },
    { title: "Notification settings", icon: <Bell size={24} />, link: "/admin/notification", desc: "Omnichannel alerts and broadcast signals" },
    { title: "Authentication settings", icon: <Settings size={24} />, link: "/admin/authentication", desc: "Security protocols and access control" },
    { title: "SMS Gateway settings", icon: <MessageSquare size={24} />, link: "/admin/smsgateway", desc: "Mobile transmission vectors and SMS logic" },
    { title: "Contact us", icon: <Phone size={24} />, link: "/admin/contact", desc: "Inbound communication bridge management" },
    { title: "About us", icon: <Info size={24} />, link: "/admin/about", desc: "Organizational identity and public info" },
    { title: "Privacy policy", icon: <ShieldCheck size={24} />, link: "/admin/privacypolicy", desc: "Data protection and security regulations" },
    { title: "Return policy", icon: <RotateCcw size={24} />, link: "/admin/returnpolicy", desc: "Reverse logistics and refund protocols" },
    { title: "Shipping policy", icon: <Truck size={24} />, link: "/admin/shippingpolicy", desc: "Delivery mandates and logistics standards" },
    { title: "Admin policies", icon: <UserCircle size={24} />, link: "/admin/adminpolicy", desc: "Internal governance and staff regulations" },
  ];

  return (
    <div className="min-h-screen bg-background-site dark:bg-slate-950 p-6 md:p-10 text-text-pri dark:text-white transition-colors duration-500 font-sans pb-24">
      
      {/* --- HEADER CONSOLE --- */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary dark:text-primary-light uppercase tracking-[0.4em]">
            <Cpu size={16} className="text-primary animate-pulse" />
            <span>Infrastructure Core v4.1</span>
          </div>
          <h1 className="text-5xl font-black text-text-pri dark:text-white tracking-tighter uppercase leading-none">System Hub</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-surface dark:bg-slate-900 p-3 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <div className="px-6 py-4 text-[10px] font-black text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 rounded-[1.5rem] border border-primary/10 flex items-center gap-3">
            <Activity size={18} /> System Pulse: NOMINAL
          </div>
          <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-600 px-6 py-4 rounded-[1.5rem] hover:bg-background-site transition-all">
             Portal <ChevronRight size={14} /> <span className="text-primary tracking-widest uppercase">Configuration</span>
          </button>
        </div>
      </header>

      {/* --- GRID ARCHITECTURE --- */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {settingsOptions.map((option, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => option.link !== "#" && navigate(option.link)}
              className="group relative bg-surface dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-3xl hover:shadow-primary/5 hover:-translate-y-3 transition-all duration-500 cursor-pointer flex flex-col gap-10 overflow-hidden"
            >
              {/* Decorative Background Vector */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
              
              {/* Icon Matrix */}
              <div className="relative w-20 h-20 bg-background-site dark:bg-slate-950 text-primary dark:text-primary-light rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 shadow-inner border border-transparent group-hover:border-primary/20">
                {React.cloneElement(option.icon, { size: 36 })}
              </div>

              {/* Identity Hub */}
              <div className="flex flex-col gap-4 relative z-10">
                <h3 className="text-xl font-black text-text-pri dark:text-white group-hover:text-primary transition-colors tracking-tighter uppercase leading-tight">
                  {option.title}
                </h3>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-relaxed opacity-70 italic group-hover:opacity-100 transition-opacity">
                  {option.desc}
                </p>
              </div>

              {/* Controller Vector */}
              <div className="flex items-center justify-between mt-auto relative z-10 pt-4 border-t border-primary/5">
                <div className="px-6 py-2 bg-background-site dark:bg-slate-950 rounded-full text-[9px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest border border-emerald-500/10 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  STABLE_NODE
                </div>
                <div className="w-12 h-12 rounded-2xl bg-background-site dark:bg-slate-950 flex items-center justify-center text-slate-300 dark:text-slate-700 group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-transparent group-hover:border-primary/20 group-hover:scale-110">
                  <ArrowRightCircle 
                    size={24} 
                    className="group-hover:translate-x-1 transition-transform" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* --- FOOTER DESCRIPTOR --- */}
      <footer className="max-w-7xl mx-auto mt-24 text-center border-t border-slate-100 dark:border-slate-800/10 p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] order-2 md:order-1">
          Infrastructure Core Version: <span className="text-primary italic">2.4.0-STABLE</span> | Mode: <span className="text-primary italic">Production</span>
        </p>
        <div className="flex items-center gap-4 bg-background-site dark:bg-slate-950 px-8 py-4 rounded-full border border-slate-100 dark:border-slate-800 shadow-inner order-1 md:order-2">
           <Shield size={18} className="text-primary" />
           <span className="text-[10px] font-black text-text-pri dark:text-white uppercase tracking-[0.3em]">Network_Encryption_Enabled</span>
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-lg shadow-emerald-500/50" /> 
        </div>
      </footer>
    </div>
  );
};

export default System;
