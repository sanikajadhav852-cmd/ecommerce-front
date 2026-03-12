import { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, ListFilter, Download, 
  RotateCcw, Layers, Settings, Truck, User, X, 
  MoreVertical, Filter, Calendar
} from 'lucide-react';
import api from '../../../lib/api';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Stats for the top cards
  const outlines = [
    { label: 'Awaiting', count: 0, icon: RotateCcw, color: 'text-purple-600' },
    { label: 'Received', count: 0, icon: Layers, color: 'text-purple-600' },
    { label: 'Processed', count: 0, icon: Settings, color: 'text-purple-600' },
    { label: 'Shipped', count: 0, icon: Truck, color: 'text-purple-600' },
    { label: 'Delivered', count: 0, icon: User, color: 'text-purple-600' },
    { label: 'Cancelled', count: 0, icon: X, color: 'text-purple-600' },
    { label: 'Returned', count: 0, icon: RotateCcw, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-700">Manage Orders</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-purple-600">Orders</span>
        </div>
      </div>

      {/* Order Outlines Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-6">Order Outlines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {outlines.map((item) => (
            <div key={item.label} className="bg-white p-5 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-slate-700">{item.count}</p>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg">
                <item.icon size={22} className={item.color} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <FilterInput label="Date range:" placeholder="Select Date Range To Filter" icon={Calendar} />
          <FilterSelect label="Status" options={['All Orders', 'Pending', 'Received', 'Shipped']} />
          <FilterSelect label="Delivery Boy" options={['All delivery boy']} />
          <FilterSelect label="Payment Method" options={['All Payment Methods', 'COD', 'Online']} />
          <FilterSelect label="Product Type" options={['All Orders']} />
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-50 pt-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors">
            Settle Promo Code Discount
          </button>
          <button className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 hover:text-white transition-all">
            Filter Orders
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs Header */}
        <div className="flex bg-gray-50/50 p-4 gap-4 border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('Orders')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Orders' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('Order Items')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'Order Items' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Order Items
          </button>
        </div>

        {/* Search and Action Bar */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 outline-none w-full md:w-64"
              />
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-all shadow-sm">
                <RefreshCw size={18} />
              </button>
              <button className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-all shadow-sm flex items-center gap-1">
                <ListFilter size={18} />
                <span className="text-[10px] font-bold">▼</span>
              </button>
              <button className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-all shadow-sm flex items-center gap-1">
                <Download size={18} />
                <span className="text-[10px] font-bold">▼</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-left text-[11px] whitespace-nowrap border border-gray-100 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100 uppercase tracking-tighter">
              <tr>
                <th className="px-3 py-4 border-r">Order ID <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">User Name <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Mobile <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">O. Notes <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Total(₹) <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">D.Charge <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Wallet used(₹) <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Promo Disc.(₹) <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Final Total(₹) <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Payment Method <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 border-r">Order Date <span className="ml-1 text-[9px]">⇅</span></th>
                <th className="px-3 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12" className="px-6 py-20 text-center text-gray-400 font-medium italic">
                  No matching records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function FilterInput({ label, placeholder, icon: Icon }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          placeholder={placeholder} 
          className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-purple-500 outline-none bg-white"
        />
      </div>
    </div>
  );
}

function FilterSelect({ label, options }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-tight ml-1">{label}</label>
      <select className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-purple-500 outline-none bg-white cursor-pointer">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}