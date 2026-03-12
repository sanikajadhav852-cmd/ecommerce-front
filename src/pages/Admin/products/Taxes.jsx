import React, { useState } from 'react';
import { 
  RotateCcw, Search, Download, List, ChevronDown, MoreVertical 
} from 'lucide-react';

export default function Taxes() {
  const [taxes] = useState([]); // Currently empty to match "No matching records found"

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Breadcrumb */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#4e5e7a]">Manage Taxes</h2>
        <p className="text-sm text-gray-500">
          Home / <span className="text-purple-600">Tax</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Add Tax Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Title" 
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Percentage <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Percentage" 
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="reset" className="flex-1 bg-[#ffc107] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e0a800] transition-colors">
                  Reset
                </button>
                <button type="submit" className="flex-1 bg-[#71dd37] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#61be2f] transition-colors">
                  Add Tax
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Taxes Table */}
        <div className="lg:col-span-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {/* Table Controls */}
            <div className="flex flex-wrap justify-end gap-2 mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none w-64"
                />
              </div>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button type="button" className="p-2 border-r border-gray-200 bg-[#8592a3] text-white hover:bg-gray-500 transition-colors">
                  <RotateCcw size={18} />
                </button>
                <button type="button" className="p-2 border-r border-gray-200 bg-[#8592a3] text-white hover:bg-gray-500 transition-colors flex items-center gap-1 px-3">
                  <List size={18} /> <ChevronDown size={14} />
                </button>
                <button type="button" className="p-2 bg-[#8592a3] text-white hover:bg-gray-500 transition-colors flex items-center gap-1 px-3">
                  <Download size={18} /> <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-100 rounded-lg">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-[#4e5e7a] font-bold border-b">
                  <tr>
                    <th className="px-4 py-4 border-r w-20">
                      <div className="flex items-center gap-1">ID <ChevronDown size={14} className="text-blue-500" /></div>
                    </th>
                    <th className="px-4 py-4 border-r">TITLE</th>
                    <th className="px-4 py-4 border-r">
                      <div className="flex items-center gap-1 justify-between">
                        PERCENTAGE <ChevronDown size={14} className="text-gray-300" />
                      </div>
                    </th>
                    <th className="px-4 py-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.length > 0 ? (
                    taxes.map((tax) => (
                      <tr key={tax.id} className="border-b hover:bg-gray-50 transition-colors text-gray-600">
                        <td className="px-4 py-4 border-r">{tax.id}</td>
                        <td className="px-4 py-4 border-r">{tax.title}</td>
                        <td className="px-4 py-4 border-r">{tax.percentage}%</td>
                        <td className="px-4 py-4">
                          <button className="text-[#6f42c1] hover:bg-purple-50 p-1 rounded-full transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-10 text-center text-gray-500 italic bg-gray-50/30">
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}