
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { 
  Store, 
  HeartPulse, 
  Mail, 
  CreditCard, 
  Rocket, 
  Calendar, 
  Bell, 
  Settings, 
  MessageSquare, 
  Phone, 
  Info, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  UserCircle, 
  Bike, 
  Key, 
  RefreshCw, 
  CheckSquare,
  ArrowRightCircle
} from 'lucide-react';

const System = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  const settingsOptions = [
    { title: "Store Setting", icon: <Store size={24} />, link: "/store-setting" },
    { title: "Email setting", icon: <Mail size={24} />, link: "/email-settings" },
    { title: "Payment methods", icon: <CreditCard size={24} />, link: "/payment-methods" },
    { title: "Shipping methods", icon: <Rocket size={24} />, link: "/shipping-methods" },
    { title: "Notification settings", icon: <Bell size={24} />, link: "/admin/notification" },
    { title: "Authentication settings", icon: <Settings size={24} />, link: "/admin/authentication" },
    { title: "SMS Gateway settings", icon: <MessageSquare size={24} />, link: "/admin/smsgateway" },
    { title: "Contact us", icon: <Phone size={24} />, link: "#" },
    { title: "About us", icon: <Info size={24} />, link: "#" },
    { title: "Privacy policy", icon: <ShieldCheck size={24} />, link: "/admin/privacypolicy" },
    { title: "Return policy", icon: <RotateCcw size={24} />, link: "/admin/returnpolicy" },
    { title: "Shipping policy", icon: <Truck size={24} />, link: "/admin/shippingpolicy" },
    { title: "Admin policies", icon: <UserCircle size={24} />, link: "/admin/adminpolicy" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Breadcrumb Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 font-sans">System Settings</h2>
        <div className="text-sm text-gray-400">
          Home / <span className="text-slate-600">System settings</span>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {settingsOptions.map((option, index) => (
          <div 
            key={index} 
            // 3. Add the onClick handler to navigate
            onClick={() => option.link !== "#" && navigate(option.link)}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col gap-4 min-h-[140px]"
          >
            {/* Icon Container */}
            <div className="w-12 h-12 bg-slate-400 text-white rounded-lg flex items-center justify-center transition-colors group-hover:bg-purple-600">
              {option.icon}
            </div>

            {/* Title and Link */}
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-indigo-900 group-hover:text-purple-600 transition-colors">
                {option.title}
              </span>
              <ArrowRightCircle 
                size={18} 
                className="text-purple-600 group-hover:translate-x-1 transition-transform" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default System;
