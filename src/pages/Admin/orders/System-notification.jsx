import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  List, 
  Download, 
  ChevronDown, 
  MoreVertical 
} from 'lucide-react';

export default function SystemNotification() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRead, setFilterRead] = useState("All Messages");

  // Sample data - replace with your actual API integration
  const [notifications, setNotifications] = useState([]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#4e5e7a]">System Notifications</h1>
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#4e5e7a] font-medium">System Notifications</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        
        {/* Filter Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-500 mb-2">Filter Read By</label>
          <select 
            className="w-full md:w-64 border border-gray-200 rounded-md p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none bg-white cursor-pointer"
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
          >
            <option value="All Messages">All Messages</option>
            <option value="Read">Read</option>
            <option value="Unread">Unread</option>
          </select>
        </div>

        {/* Table Controls (Search & Action Buttons) */}
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-purple-500 outline-none w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Action Buttons Group (Refresh, List, Download) */}
            <div className="flex items-center bg-[#f8f9fa] border border-gray-200 rounded-md">
              <button 
                onClick={handleRefresh}
                className={`p-2 hover:bg-white transition-all border-r border-gray-200 ${loading ? 'animate-spin' : ''}`}
              >
                <RefreshCw size={18} className="text-gray-600" />
              </button>
              
              <button className="p-2 hover:bg-white transition-all border-r border-gray-200 flex items-center gap-1">
                <List size={18} className="text-gray-600" />
                <ChevronDown size={12} className="text-gray-400" />
              </button>
              
              <button className="p-2 hover:bg-white transition-all flex items-center gap-1">
                <Download size={18} className="text-gray-600" />
                <ChevronDown size={12} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-md">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-[#fcfcfd] border-b border-gray-100">
              <tr className="uppercase text-[12px] tracking-tight font-bold text-[#4e5e7a]">
                <th className="px-4 py-4 border-r border-gray-50 w-20">
                  <div className="flex items-center justify-between">
                    ID <ChevronDown size={14} className="text-purple-600" />
                  </div>
                </th>
                <th className="px-4 py-4 border-r border-gray-50">Title</th>
                <th className="px-4 py-4 border-r border-gray-50">Message</th>
                <th className="px-4 py-4 border-r border-gray-50">Type</th>
                <th className="px-4 py-4 border-r border-gray-50">Type ID</th>
                <th className="px-4 py-4 border-r border-gray-50">Read By</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-[#4e5e7a] font-medium italic">
                    No matching records found
                  </td>
                </tr>
              ) : (
                notifications.map((notif) => (
                  <tr key={notif.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-purple-600 font-medium">#{notif.id}</td>
                    <td className="px-4 py-4 text-gray-700 font-semibold">{notif.title}</td>
                    <td className="px-4 py-4 text-gray-600 max-w-xs truncate">{notif.message}</td>
                    <td className="px-4 py-4 text-gray-700">{notif.type}</td>
                    <td className="px-4 py-4 text-gray-700">{notif.typeId}</td>
                    <td className="px-4 py-4 text-gray-700">{notif.readBy}</td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}