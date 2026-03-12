import React, { useState } from 'react';
import { 
  Plus, Search, RotateCcw, List, Download, 
  ChevronDown, MoreVertical, Star 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ManageProducts() {
  const navigate = useNavigate();
  
  // Mock data based on your screenshot
  const [products] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/50", // Replace with your actual image paths
      name: "KASOORI METHI (Variable Product)",
      rating: 0,
      active: true
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "KASHMIRI CHILLI POWDER (Simple Product)",
      rating: 0,
      active: true
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "BEDGI CHILLI POWDER (Simple Product)",
      rating: 0,
      active: true
    }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#4e5e7a]">Manage Products</h2>
        <p className="text-sm text-gray-500">
          Home / <span className="text-purple-600">Products</span>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Top Actions */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/add-product')}
            className="border border-purple-600 text-purple-600 px-4 py-1.5 rounded-md text-sm hover:bg-purple-50 transition-colors"
          >
            Add Product
          </button>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-[#4e5e7a] uppercase">Filter by Product Category</label>
              <div className="relative w-64">
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none appearance-none bg-white pr-10">
                  <option>Select Categories</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-[#4e5e7a] uppercase">Filter Product by Type</label>
              <div className="relative w-56">
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none appearance-none bg-white pr-10">
                  <option>All</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none w-64"
              />
            </div>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button className="p-2 bg-[#8592a3] text-white hover:bg-gray-500 border-r border-gray-400/30"><RotateCcw size={18} /></button>
              <button className="p-2 bg-[#8592a3] text-white hover:bg-gray-500 border-r border-gray-400/30 flex items-center gap-1 px-3"><List size={18} /><ChevronDown size={14} /></button>
              <button className="p-2 bg-[#8592a3] text-white hover:bg-gray-500 flex items-center gap-1 px-3"><Download size={18} /><ChevronDown size={14} /></button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-100 rounded-lg">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-[#4e5e7a] font-bold border-b">
              <tr>
                <th className="px-4 py-4 border-r">IMAGE</th>
                <th className="px-4 py-4 border-r">NAME</th>
                <th className="px-4 py-4 border-r">RATING</th>
                <th className="px-4 py-4 border-r">ACTIVE</th>
                <th className="px-4 py-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors text-gray-600">
                  <td className="px-4 py-3 border-r">
                    <div className="w-12 h-12 border rounded-md overflow-hidden bg-gray-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r font-medium text-[#4e5e7a] uppercase text-xs">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 border-r">
                    <div className="flex flex-col">
                      <div className="flex text-gray-300">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} />)}
                        <span className="ml-2 text-gray-400">Not Rated</span>
                      </div>
                      <span className="text-[10px] text-gray-400">(0/0)</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={product.active} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6f42c1]"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-[#6f42c1] hover:bg-purple-50 p-2 rounded-full transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}