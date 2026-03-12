import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function ProductsOrder() {
  // Mock data based on your screenshot
  const [products] = useState([
    {
      id: 1,
      name: "KANDA LASUN MASALA",
      image: "https://via.placeholder.com/60", // Replace with actual image path
      displayOrder: 0,
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "MUTTON MASALA",
      image: "https://via.placeholder.com/60",
      displayOrder: 0,
      status: "ACTIVE"
    }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Breadcrumb */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#4e5e7a]">Manage Products Order</h2>
        <p className="text-sm text-gray-500">
          Home / <span className="text-purple-600">Products Orders</span>
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-[#4e5e7a] font-medium mb-6">Filter By Product Category</h3>
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none appearance-none bg-white pr-10">
              <option>All</option>
              <option>Ready Mix Masala</option>
              <option>Khada Masala</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
          </div>
          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Products List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-[#4e5e7a] font-bold uppercase tracking-wider text-sm">Products List</h3>
        </div>

        <div className="p-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-white text-[#4e5e7a] font-bold text-sm border-b">
            <div className="col-span-2">Display Order</div>
            <div className="col-span-4">Product</div>
            <div className="col-span-3">Image</div>
            <div className="col-span-3">Status</div>
          </div>

          {/* List Items */}
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="grid grid-cols-12 gap-4 px-4 py-6 items-center border-b last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <div className="col-span-2 text-gray-600 font-medium ml-2">
                  {item.displayOrder}
                </div>
                <div className="col-span-4 text-[#4e5e7a] font-bold uppercase text-xs tracking-wide">
                  {item.name}
                </div>
                <div className="col-span-3">
                  <div className="w-16 h-16 border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="bg-[#71dd37] text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-sm uppercase">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}