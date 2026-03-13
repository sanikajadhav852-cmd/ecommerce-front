import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  CheckCircle, XCircle, Clock, AlertCircle, Eye, Loader2,
  RefreshCcw, Package, AlertTriangle
} from 'lucide-react';

export default function ReturnRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    orderId: true,
    username: true,
    productName: true,
    price: true,
    quantity: true,
    subTotal: true,
    status: true,
    actions: true
  });

  // Demo stats
 

  // For demo — replace with real API later
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setRequests([
        { id: 'RTN-1001', orderId: 'ORD-1001', username: 'John Doe', productName: 'Cotton Saree - Red', price: 1250.00, quantity: 1, subTotal: 1250.00, status: 'Pending' },
        { id: 'RTN-1002', orderId: 'ORD-1024', username: 'Jane Smith', productName: 'Silk Kurta - Blue', price: 890.00, quantity: 2, subTotal: 1780.00, status: 'Approved' },
        { id: 'RTN-1003', orderId: 'ORD-1045', username: 'Ravi Kumar', productName: 'Mens Formal Shirt', price: 1050.00, quantity: 1, subTotal: 1050.00, status: 'Processed' },
        { id: 'RTN-1004', orderId: 'ORD-1056', username: 'Priya Sharma', productName: 'Designer Lehenga', price: 4500.00, quantity: 1, subTotal: 4500.00, status: 'Rejected' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesSearch = 
      searchTerm === '' ||
      req.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Return Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track customer product returns effectively.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
          Home / Requests / <span className="text-indigo-600 font-medium">Returns</span>
        </div>
      </div>

      {/* Metrics Cards */}
    

      {/* Controls Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Status Filter */}
            <div className="w-full sm:w-48 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm appearance-none cursor-pointer transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Processed">Processed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Search */}
            <div className="w-full sm:w-80 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search Order ID, Username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-shadow"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full md:w-auto justify-end mt-4 md:mt-0">
            <button className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors shadow-sm" title="Refresh">
              <RotateCw size={18} />
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
                      {col === 'orderId' ? 'Order ID' :
                       col === 'productName' ? 'Product Name' :
                       col === 'subTotal' ? 'Sub Total' :
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {visibleColumns.id && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Req ID
                  </th>
                )}
                {visibleColumns.orderId && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                )}
                {visibleColumns.username && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                )}
                {visibleColumns.productName && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product Name
                  </th>
                )}
                {visibleColumns.price && (
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                )}
                {visibleColumns.quantity && (
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Qty
                  </th>
                )}
                {visibleColumns.subTotal && (
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sub Total
                  </th>
                )}
                {visibleColumns.status && (
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                )}
                {visibleColumns.actions && (
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
                    <p className="text-gray-500 font-medium">Loading return requests...</p>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-medium text-lg">No records found</p>
                      <p className="text-gray-500 mt-1">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-indigo-50/50 transition-colors group">
                    {visibleColumns.id && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        {req.id}
                      </td>
                    )}
                    {visibleColumns.orderId && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {req.orderId}
                      </td>
                    )}
                    {visibleColumns.username && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {req.username}
                      </td>
                    )}
                    {visibleColumns.productName && (
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {req.productName}
                      </td>
                    )}
                    {visibleColumns.price && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ₹{req.price?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    )}
                    {visibleColumns.quantity && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                        {req.quantity}
                      </td>
                    )}
                    {visibleColumns.subTotal && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        ₹{req.subTotal?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                          ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            req.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            req.status === 'Processed' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                            'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                          {req.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {req.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {req.status === 'Pending' && <Clock className="w-3 h-3 mr-1 animate-pulse" />}
                          {req.status === 'Processed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {req.status || 'Pending'}
                        </span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 mx-auto">
                          <Eye size={14} /> View
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
        {!loading && filteredRequests.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredRequests.length}</span> results
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