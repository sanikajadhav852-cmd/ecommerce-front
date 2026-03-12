import { useState } from 'react';
import { 
  RotateCcw, Search, Download, List, Plus, 
  MoreVertical, ChevronDown 
} from 'lucide-react';

export default function Attribute() {
  const [attributes] = useState([
    { id: 3, type: "Weight", name: "1000 gm", status: true },
    { id: 2, type: "Weight", name: "500 gm", status: true },
    { id: 1, type: "Weight", name: "200 gm", status: true },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Breadcrumb */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#4e5e7a]">Attribute</h2>
        <p className="text-sm text-gray-500">
          Home / <span className="text-purple-600">Attribute</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Add Attribute Form */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
            <form className="space-y-6">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                    Select Attribute Set <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none bg-white">
                    <option>None</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 mt-6">
                  <button type="button" className="bg-[#6f42c1] text-white p-2 rounded-lg hover:bg-[#5a32a3] transition-colors">
                    <Plus size={18} />
                  </button>
                  <button type="button" className="bg-[#6f42c1] text-white p-2 rounded-lg hover:bg-[#5a32a3] transition-colors">
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Attribute Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">
                  Attribute Values <span className="text-red-500">*</span>
                </label>
                <button type="button" className="bg-[#6f42c1] text-white px-4 py-2 rounded-lg text-xs font-medium shadow-md">
                  Attribute Values
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="reset" className="flex-1 bg-[#ffc107] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#e0a800]">
                  Reset
                </button>
                <button type="submit" className="flex-1 bg-[#71dd37] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#61be2f]">
                  Add Attribute
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Attributes Table */}
        <div className="lg:col-span-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#4e5e7a]">Attributes</h3>
            </div>

            {/* Table Controls */}
            <div className="flex flex-wrap justify-end gap-2 mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-1 focus:ring-purple-500 outline-none w-64"
                />
              </div>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button className="p-2 border-r border-gray-200 bg-[#8592a3] text-white hover:bg-gray-500 transition-colors">
                  <RotateCcw size={18} />
                </button>
                <button className="p-2 border-r border-gray-200 bg-[#8592a3] text-white hover:bg-gray-500 transition-colors flex items-center gap-1">
                  <List size={18} /> <ChevronDown size={14} />
                </button>
                <button className="p-2 bg-[#8592a3] text-white hover:bg-gray-500 transition-colors flex items-center gap-1">
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
                    <th className="px-4 py-4 border-r">ATTRIBUTES</th>
                    <th className="px-4 py-4 border-r">
                      <div className="flex items-center gap-1">NAME <ChevronDown size={14} className="text-gray-300" /></div>
                    </th>
                    <th className="px-4 py-4 border-r">STATUS</th>
                    <th className="px-4 py-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr) => (
                    <tr key={attr.id} className="border-b hover:bg-gray-50 transition-colors text-gray-600">
                      <td className="px-4 py-4 border-r">{attr.id}</td>
                      <td className="px-4 py-4 border-r">{attr.type}</td>
                      <td className="px-4 py-4 border-r">{attr.name}</td>
                      <td className="px-4 py-4 border-r">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={attr.status} className="sr-only peer" readOnly />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6f42c1]"></div>
                        </label>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-[#6f42c1] hover:bg-purple-50 p-1 rounded-full">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Showing 1 to {attributes.length} of {attributes.length} rows
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}