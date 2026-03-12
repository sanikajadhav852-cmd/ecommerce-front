import React, { useState } from 'react';
import { 
  RotateCcw, List, Download, ChevronDown, Search 
} from 'lucide-react';

export default function ProductsFAQs() {
  const [faqs] = useState([]); // Empty state to match the "No matching records found" screenshot

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Breadcrumb */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#4e5e7a]">Manage Products FAQs</h2>
        <p className="text-sm text-gray-500">
          Home / <span className="text-purple-600">Product FAQs</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Add Product FAQ Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Select Product <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500 appearance-none bg-white">
                    <option>Type to search and select products</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Question <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="question" 
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="answer" 
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="reset" className="flex-1 bg-[#ffc107] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e0a800] transition-colors">
                  Reset
                </button>
                <button type="submit" className="flex-1 bg-[#71dd37] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#61be2f] transition-colors">
                  Add Product FAQ
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQs Table */}
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
                    <th className="px-4 py-4 border-r w-16">
                      <div className="flex items-center gap-1">ID <ChevronDown size={14} className="text-blue-500" /></div>
                    </th>
                    <th className="px-4 py-4 border-r uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-4 border-r uppercase tracking-wider">Question</th>
                    <th className="px-4 py-4 border-r uppercase tracking-wider">Answer</th>
                    <th className="px-4 py-4 border-r uppercase tracking-wider">Answered By Name</th>
                    <th className="px-4 py-4 uppercase tracking-wider">Username</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.length > 0 ? (
                    faqs.map((faq) => (
                      <tr key={faq.id} className="border-b hover:bg-gray-50 transition-colors">
                        {/* Map your data here */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-12 text-center text-gray-500 italic bg-gray-50/30">
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Horizontal scroll indicator if needed */}
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}