import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  Grid, List, Loader2 
} from 'lucide-react';

export default function ProductStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    variantId: true,
    name: true,
    image: true,
    stock: true
  });

  // Demo — replace with real API later
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([]); // empty → shows "No matching records found"
      setLoading(false);
    }, 1200);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesSearch = 
      searchTerm === '' ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.variantId?.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header / Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products Stock</h1>
        <div className="text-sm text-gray-500">
          Home / Product Stock
        </div>
      </div>

      {/* Controls Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-wide">
              FILTER BY PRODUCT CATEGORY
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-64 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Select Categories</option>
              <option value="Women Ethnic">Women Ethnic</option>
              <option value="Women Western">Women Western</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
              {/* Add your real categories here */}
            </select>
          </div>

          {/* Search */}
          <div className="w-full md:w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              title="Refresh"
            >
              <RotateCw size={18} />
            </button>
            <button 
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button 
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              title="List View"
            >
              <List size={18} />
            </button>
            <button 
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              title="Export"
            >
              <Download size={18} />
            </button>
            <div className="relative group">
              <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition">
                <MoreVertical size={18} />
              </button>

              {/* Column Visibility Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Show Columns</p>
                  {Object.keys(visibleColumns).map(col => (
                    <label key={col} className="flex items-center gap-2 py-1 text-sm cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() => toggleColumn(col)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      {col === 'variantId' ? 'Variant ID' :
                       col === 'amountRequested' ? 'Amount Requested' :
                       col.charAt(0).toUpperCase() + col.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.variantId && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    VARIANT ID
                  </th>
                )}
                {visibleColumns.name && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    NAME
                  </th>
                )}
                {visibleColumns.image && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    IMAGE
                  </th>
                )}
                {visibleColumns.stock && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    VARIANTS - STOCK
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto text-indigo-600" />
                    <p className="mt-4 text-gray-600">Loading product stock...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length} className="px-6 py-20 text-center text-gray-500">
                    No matching records found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.variantId} className="hover:bg-gray-50 transition-colors">
                    {visibleColumns.variantId && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.variantId}</td>}
                    {visibleColumns.name && <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>}
                    {visibleColumns.image && (
                      <td className="px-6 py-4">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-12 w-12 object-cover rounded" 
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            No Img
                          </div>
                        )}
                      </td>
                    )}
                    {visibleColumns.stock && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock || '—'}</td>}
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