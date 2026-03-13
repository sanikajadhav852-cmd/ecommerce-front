import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  Calendar, Grid, List, Loader2, TrendingUp, ShoppingCart, 
  DollarSign, RefreshCcw, Eye
} from 'lucide-react';

export default function SalesReport() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [dateRange, setDateRange] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    orderId: true,
    userName: true,
    mobile: true,
    address: true,
    finalTotal: true,
    status: true,
    orderDate: true,
    operate: true
  });

  // Simulate data loading (replace with real API)
  useEffect(() => {
    setTimeout(() => {
      setInvoices([
        { orderId: 'ORD-1001', userName: 'John Doe', mobile: '+91 9876543210', address: '123 Main St, Mumbai', finalTotal: 1250.00, status: 'Delivered', orderDate: '2023-10-25' },
        { orderId: 'ORD-1002', userName: 'Jane Smith', mobile: '+91 9988776655', address: '456 Park Ave, Delhi', finalTotal: 4500.50, status: 'Pending', orderDate: '2023-10-26' },
        { orderId: 'ORD-1003', userName: 'Ravi Kumar', mobile: '+91 8877665544', address: '789 Lake View, Bangalore', finalTotal: 850.00, status: 'Cancelled', orderDate: '2023-10-26' },
        { orderId: 'ORD-1004', userName: 'Priya Sharma', mobile: '+91 7766554433', address: '101 Pine St, Pune', finalTotal: 2100.00, status: 'Shipped', orderDate: '2023-10-27' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      searchTerm === '' ||
      inv.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.mobile?.includes(searchTerm);

    const matchesStatus = statusFilter === 'All Orders' || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const handleSearch = () => {
    // In real app: fetch with filters
    console.log('Searching with:', { searchTerm, statusFilter, dateRange });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sales Report</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor your store's sales performance and revenue.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
          Home / Reports / <span className="text-indigo-600 font-medium">Sales</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6 items-end">
          {/* Date Range */}
          <div className="w-full lg:w-1/3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Date Range
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Select Date Range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-1/3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Order Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors text-sm appearance-none cursor-pointer"
              >
                <option>All Orders</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
                <option>Returned</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto">
            <button
              onClick={handleSearch}
              className="w-full px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg transition-colors font-medium shadow-sm flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Filter Results
            </button>
          </div>
        </div>

        {/* Search & Actions toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pt-6 border-t border-gray-100">
          <div className="w-full md:w-96 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search invoices by Order ID, Name, or Mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow"
            />
          </div>

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
                      {col === 'userName' ? 'User Name' :
                       col === 'orderId' ? 'Order ID' :
                       col === 'finalTotal' ? 'Final Total' :
                       col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.orderId && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                )}
                {visibleColumns.userName && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                )}
                {visibleColumns.mobile && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mobile
                  </th>
                )}
                {visibleColumns.address && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                )}
                {visibleColumns.finalTotal && (
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Final Total
                  </th>
                )}
                {visibleColumns.status && (
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                )}
                {visibleColumns.orderDate && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Date
                  </th>
                )}
                {visibleColumns.operate && (
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length} className="px-6 py-24 text-center">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto text-indigo-600 mb-4" />
                    <p className="text-gray-500 font-medium">Loading sales records...</p>
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
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
                filteredInvoices.map((inv) => (
                  <tr key={inv.orderId} className="hover:bg-indigo-50/50 transition-colors group">
                    {visibleColumns.orderId && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        {inv.orderId}
                      </td>
                    )}
                    {visibleColumns.userName && (
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {inv.userName}
                      </td>
                    )}
                    {visibleColumns.mobile && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inv.mobile}
                      </td>
                    )}
                    {visibleColumns.address && (
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {inv.address}
                      </td>
                    )}
                    {visibleColumns.finalTotal && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        ₹{inv.finalTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                          ${inv.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            inv.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            inv.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            inv.status === 'Shipped' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                          {inv.status === 'Delivered' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>}
                          {inv.status === 'Pending' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></div>}
                          {inv.status === 'Shipped' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></div>}
                          {inv.status === 'Cancelled' && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></div>}
                          {inv.status || 'Pending'}
                        </span>
                      </td>
                    )}
                    {visibleColumns.orderDate && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inv.orderDate || '—'}
                      </td>
                    )}
                    {visibleColumns.operate && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <Eye size={14} />
                          View
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        {!loading && filteredInvoices.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{filteredInvoices.length}</span> of <span className="font-medium text-gray-900">{filteredInvoices.length}</span> results
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