import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { 
  ShoppingCart, Package, Users, RefreshCw, Truck, 
  Search, AlertCircle, CheckCircle, RotateCcw, Settings, X,
  TrendingUp, Calendar, ChevronRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    orders: 0,
    newSigns: 0,
    deliveryBoys: 0,
    products: 0
  });
  const [orderOutlines, setOrderOutlines] = useState({
    pending: 0,
    ready: 0,
    awaiting: 0,
    processed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, outlinesRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/orders/outlines')
      ]);
      setStats(statsRes.data || {});
      setOrderOutlines(outlinesRes.data || {});
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-indigo-600 border-t-transparent"></div>
          <div className="absolute h-8 w-8 animate-ping rounded-full border-2 border-indigo-200"></div>
        </div>
        <p className="mt-4 text-[1.125rem] font-medium text-slate-600 animate-pulse">Synchronizing Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-[2rem] min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="bg-white p-[3rem] rounded-[1.5rem] shadow-xl border border-red-100 text-center max-w-[30rem]">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-[1.5rem] font-bold text-slate-800 mb-2">System Interruption</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="w-full py-[0.875rem] bg-slate-900 text-white rounded-[0.75rem] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-slate-200"
          >
            <RefreshCw size={18} /> Reconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-[1.5rem] md:p-[2.5rem] bg-[#f8fafc] min-h-screen space-y-[2.5rem] font-sans">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[2rem] font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 text-[1rem]">Welcome back, Admin. Here is what's happening today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-[0.5rem] rounded-[1rem] shadow-sm border border-slate-200">
          <div className="px-4 py-2 text-[0.875rem] font-bold text-indigo-600 bg-indigo-50 rounded-[0.5rem] flex items-center gap-2">
            <Calendar size={16} /> {new Date().toLocaleDateString()}
          </div>
          <button
            onClick={fetchDashboardData}
            className="p-[0.625rem] text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-[0.75rem] transition-all"
            title="Refresh Data"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      {/* --- TOP STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem]">
        <TopStatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} gradient="from-indigo-600 to-blue-500" />
        <TopStatCard title="Active Users" value={stats.newSigns} icon={Users} gradient="from-violet-600 to-purple-500" />
        <TopStatCard title="Logistics" value={stats.deliveryBoys} icon={Truck} gradient="from-emerald-600 to-teal-500" />
        <TopStatCard title="Inventory" value={stats.products} icon={Package} gradient="from-slate-800 to-slate-600" />
      </div>

      {/* --- ORDER STATUS GRID --- */}
      <section className="bg-white p-[2rem] rounded-[1.5rem] shadow-sm border border-slate-200/60">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[1.125rem] font-bold text-slate-800 flex items-center gap-2">
            Order Lifecycle <span className="px-2 py-0.5 bg-slate-100 text-[0.75rem] rounded-full text-slate-500">Live</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-[1rem]">
          <OutlineCard label="Pending" count={orderOutlines.pending} icon={RotateCcw} color="amber" />
          <OutlineCard label="Ready" count={orderOutlines.ready} icon={Package} color="blue" />
          <OutlineCard label="Awaiting" count={orderOutlines.awaiting} icon={RefreshCw} color="indigo" />
          <OutlineCard label="Processed" count={orderOutlines.processed} icon={Settings} color="cyan" />
          <OutlineCard label="Shipped" count={orderOutlines.shipped} icon={Truck} color="emerald" />
          <OutlineCard label="Delivered" count={orderOutlines.delivered} icon={CheckCircle} color="green" />
          <OutlineCard label="Cancelled" count={orderOutlines.cancelled} icon={X} color="red" />
          <OutlineCard label="Returned" count={orderOutlines.returned} icon={RotateCcw} color="orange" />
        </div>
      </section>

      {/* --- RECENT ORDERS TABLE --- */}
      <section className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-[2rem] border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-[1.125rem] font-bold text-slate-800">Recent Transactions</h3>
          <div className="relative w-full md:w-[25rem]">
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="w-full pl-[2.75rem] pr-[1rem] py-[0.75rem] bg-slate-50 border-none rounded-[1rem] text-[0.875rem] focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <Search className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                {['Order ID', 'Customer', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="px-[1.5rem] py-[1rem] text-[0.75rem] font-bold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="py-[6rem] text-center">
                  <div className="flex flex-col items-center opacity-40">
                    <div className="bg-slate-100 p-6 rounded-full mb-4">
                      <Search size={40} className="text-slate-400" />
                    </div>
                    <p className="font-bold text-slate-600 text-[1.125rem]">No records found</p>
                    <p className="text-[0.875rem] text-slate-500">Try refreshing the dashboard for latest updates.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ── MODERN SUB-COMPONENTS ─────────────────────────────────────────────────

function TopStatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div className="group relative bg-white p-[1.5rem] rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-[0.03] rounded-bl-full`}></div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-[0.75rem] rounded-[1rem] bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <div className="flex items-center gap-1 text-emerald-500 text-[0.75rem] font-bold bg-emerald-50 px-2 py-1 rounded-md">
          <TrendingUp size={12} /> +12%
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-[0.875rem] font-medium mb-1">{title}</p>
        <h4 className="text-[1.75rem] font-black text-slate-900 tracking-tight">
          {value?.toLocaleString() || '0'}
        </h4>
      </div>
    </div>
  );
}

function OutlineCard({ label, count, icon: Icon, color }) {
  const colorMap = {
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    green: "bg-green-50 text-green-600 border-green-100",
    red: "bg-red-50 text-red-600 border-red-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100"
  };

  return (
    <div className="flex flex-col items-center text-center group cursor-default">
      <div className={`w-full aspect-square flex flex-col items-center justify-center rounded-[1.25rem] border transition-all duration-200 group-hover:shadow-md ${colorMap[color]}`}>
        <Icon size={24} className="mb-2" />
        <span className="text-[1.25rem] font-black leading-none">{count}</span>
      </div>
      <span className="mt-3 text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}