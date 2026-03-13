import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, 
  MessageSquarePlus, Loader2, Filter, 
  Layers, Type, Send, Trash2, Edit3
} from 'lucide-react';

export default function CustomMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    title: true,
    type: true,
    message: true,
    action: true
  });

  const [formData, setFormData] = useState({ type: '', title: '', message: '' });

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          title: "Order is placed from <order_id>",
          type: "Place Order",
          message: "A new order <order_id> has been placed successfully in <application_name>."
        },
        {
          id: 2,
          title: "Shipping Update",
          type: "Order Shipped",
          message: "Good news! Your order <order_id> is on its way via <courier_name>."
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Helper to highlight variables like <order_id>
  const formatMessage = (text) => {
    const parts = text.split(/(<[^>]+>)/g);
    return parts.map((part, i) => 
      part.startsWith('<') && part.endsWith('>') ? (
        <span key={i} className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono text-xs font-bold border border-indigo-200">
          {part}
        </span>
      ) : part
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMsg = { id: Date.now(), ...formData };
    setMessages(prev => [newMsg, ...prev]);
    setFormData({ type: '', title: '', message: '' });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Custom Messaging</h1>
          <p className="text-slate-500 mt-1">Manage automated notifications and template responses.</p>
        </div>
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <span>Dashboard</span>
          <span className="h-1 w-1 rounded-full bg-slate-300"></span>
          <span className="text-indigo-600">Messages</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Creation Form (Left/Top) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-8">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <MessageSquarePlus size={20} />
              </div>
              <h2 className="font-bold text-slate-800">New Template</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <Layers size={14} /> Trigger Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl py-2.5 px-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm font-medium"
                >
                  <option value="">Select Category</option>
                  <option value="Place Order">Place Order</option>
                  <option value="Order Shipped">Order Shipped</option>
                  <option value="Payment Success">Payment Success</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <Type size={14} /> Admin Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Order Confirmation SMS"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl py-2.5 px-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <Send size={14} /> Message Content
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Use <tags> for dynamic data..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border-slate-200 rounded-xl py-3 px-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm leading-relaxed"
                />
                <p className="mt-2 text-[10px] text-slate-400 italic">
                  Tip: Use &lt;order_id&gt; or &lt;customer_name&gt; as variables.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                  Create Template
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ type: '', title: '', message: '' })}
                  className="w-full text-slate-400 hover:text-slate-600 font-semibold text-sm py-2"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* List Section (Right/Bottom) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Table Controls */}
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
                  <RotateCw size={18} />
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
                <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  <Filter size={14} /> Columns
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Content Preview</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="py-20 text-center">
                        <Loader2 className="animate-spin h-8 w-8 mx-auto text-indigo-500" />
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 vertical-align-top">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                            msg.type === 'Place Order' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {msg.type}
                          </span>
                          <div className="mt-1 font-bold text-slate-900 text-sm">{msg.title}</div>
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <div className="text-sm text-slate-600 leading-relaxed truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                            {formatMessage(msg.message)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                              <Edit3 size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination/Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Displaying {messages.length} active templates
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-bold text-slate-500 border border-slate-200 rounded-md bg-white hover:bg-slate-50">Prev</button>
                <button className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}