import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  Grid, List, Loader2, Package, AlertTriangle, TrendingUp,
  Box
} from 'lucide-react';

export default function InventoryReport() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    productName: true,
    variantId: true,
    unitOfMeasure: true,
    totalUnitsSold: true,
    totalSales: true
  });

  // Simulate data loading (replace with real API later)
  useEffect(() => {
    setTimeout(() => {
      setInventory([
        { productName: 'Cotton Saree - Red', variantId: 'VAR-101', unitOfMeasure: 'Pieces', totalUnitsSold: 145, totalSales: 435000 },
        { productName: 'Silk Kurta - Blue', variantId: 'VAR-102', unitOfMeasure: 'Pieces', totalUnitsSold: 89, totalSales: 133500 },
        { productName: 'Designer Lehenga', variantId: 'VAR-103', unitOfMeasure: 'Pieces', totalUnitsSold: 24, totalSales: 360000 },
        { productName: 'Mens Formal Shirt', variantId: 'VAR-104', unitOfMeasure: 'Pieces', totalUnitsSold: 210, totalSales: 210000 },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredInventory = inventory.filter(item => {
    return (
      searchTerm === '' ||
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variantId?.toString().includes(searchTerm) ||
      item.unitOfMeasure?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inventory Report</h1>
          <p className="text-sm text-gray-500 mt-1">Track your product stock, sales performance and variants.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
          Home / Reports / <span className="text-indigo-600 font-medium">Inventory</span>
        </div>
      </div>

      {/* Controls Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by Product Name, Variant ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors shadow-sm" title="Refresh">
              <RotateCw size={18} />
            </button>
            <button className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors shadow-sm hidden md:block" title="Grid View">
              <Grid size={18} />
            </button>
            <button className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg transition-colors shadow-sm hidden md:block" title="List View">
              <List size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors shadow-sm font-medium text-sm">
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>

            <div className="relative group">
              <button className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">
                <MoreVertical size={18} />
              </button>

              {/* Column Visibility Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl hidden group-hover:block z-20 overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Toggle Columns</p>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {Object.keys(visibleColumns).map(col => (
                    <label key={col} className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 rounded-md transition-colors text-gray-700">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() => toggleColumn(col)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      {col === 'productName' ? 'Product Name' :
                       col === 'variantId' ? 'Product Variant ID' :
                       col === 'totalUnitsSold' ? 'Total Units Sold' :
                       col === 'totalSales' ? 'Total Sales' :
                       col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.productName && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product Name
                  </th>
                )}
                {visibleColumns.variantId && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Variant ID
                  </th>
                )}
                {visibleColumns.unitOfMeasure && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Unit Of Measure
                  </th>
                )}
                {visibleColumns.totalUnitsSold && (
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Units Sold
                  </th>
                )}
                {visibleColumns.totalSales && (
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Sales
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length} className="px-6 py-24 text-center">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto text-indigo-600 mb-4" />
                    <p className="text-gray-500 font-medium">Loading inventory report...</p>
                  </td>
                </tr>
              ) : filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-medium text-lg">No records found</p>
                      <p className="text-gray-500 mt-1">Try adjusting your filters or search term.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item, idx) => (
                  <tr key={item.variantId || idx} className="hover:bg-indigo-50/50 transition-colors group">
                    {visibleColumns.productName && (
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                            <Package size={16} />
                          </div>
                          {item.productName}
                        </div>
                      </td>
                    )}
                    {visibleColumns.variantId && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                        {item.variantId}
                      </td>
                    )}
                    {visibleColumns.unitOfMeasure && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unitOfMeasure || '—'}
                      </td>
                    )}
                    {visibleColumns.totalUnitsSold && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                        {item.totalUnitsSold?.toLocaleString() || '0'}
                      </td>
                    )}
                    {visibleColumns.totalSales && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        ₹{item.totalSales?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        {!loading && filteredInventory.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{filteredInventory.length}</span> of <span className="font-medium text-gray-900">{filteredInventory.length}</span> records
            </span>
            <div className="flex gap-1">
              <button disabled className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-400 bg-white cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 border border-indigo-600 rounded-md text-sm text-white bg-indigo-600 font-medium">1</button>
              <button disabled className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-400 bg-white cursor-not-allowed">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}