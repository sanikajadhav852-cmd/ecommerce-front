import React, { useState } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, 
  UserPlus, ShieldCheck, Mail, Phone, 
  Edit2, Trash2, Shield, Columns,
  ChevronRight, ExternalLink
} from 'lucide-react';

export default function ManageSystemUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data based on your screenshot
  const [users] = useState([
    {
      id: 1,
      userId: "ADM-001",
      username: "Administrator",
      mobile: "9834972896",
      email: "admin@system.com",
      role: "SUPER ADMIN",
      status: "Active"
    }
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* --- Breadcrumb & Version --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded shadow-sm shadow-indigo-200 uppercase tracking-tighter">
            V 4.4.1
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage System Users</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="hover:text-indigo-600 cursor-pointer">Home</span>
          <ChevronRight size={14} />
          <span className="text-slate-600">System Users</span>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* --- Toolbar --- */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0">
            <UserPlus size={18} />
            Add System User
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative group flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search by name, ID or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Action Group */}
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
              <button className="p-2 text-slate-500 hover:bg-white hover:text-indigo-600 rounded-lg transition-all" title="Refresh">
                <RotateCw size={18} />
              </button>
              <button className="p-2 text-slate-500 hover:bg-white hover:text-indigo-600 rounded-lg transition-all" title="Columns">
                <Columns size={18} />
              </button>
              <div className="w-[1px] h-6 bg-slate-200 mx-1"></div>
              <button className="p-2 text-slate-500 hover:bg-white hover:text-indigo-600 rounded-lg transition-all" title="Export">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Table Content --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Role</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-slate-400 font-mono">
                    {user.id.toString().padStart(2, '0')}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {user.username.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-none mb-1">{user.username}</div>
                        <div className="text-[11px] font-medium text-slate-400">UID: {user.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Phone size={12} className="text-slate-400" /> {user.mobile}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                        <Mail size={12} /> {user.email || 'no-email@system.com'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold border border-indigo-100 uppercase tracking-tighter">
                      <ShieldCheck size={12} />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-tighter border border-emerald-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit User">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Reset Credentials">
                        <Shield size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete User">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Footer --- */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-400">
            Showing <span className="text-slate-900">1</span> to <span className="text-slate-900">1</span> of <span className="text-slate-900">1</span> system users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded-lg cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}