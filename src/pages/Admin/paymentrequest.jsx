import React, { useState, useEffect } from 'react';
import { 
  Search, RotateCw, Download, MoreVertical, ChevronDown, 
  CheckCircle, XCircle, Clock, Eye, Loader2,
  CreditCard, Wallet, Banknote, HelpCircle
} from 'lucide-react';

export default function PaymentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    username: true,
    type: true,
    paymentAddress: true,
    amountRequested: true,
    remarks: true,
    status: true,
    dateCreated: true,
    actions: true
  });

  // Demo stats
 

  // For demo — replace with real API later
  useEffect(() => {
    // Simulate loading (replace with api.get('/admin/payment-requests'))
    setTimeout(() => {
      setRequests([
        { id: 'PAY-2001', username: 'Vendor_Alpha', type: 'Bank Transfer', paymentAddress: 'acct_1001...', amountRequested: 45000.00, remarks: 'Monthly Payout', status: 'Pending', dateCreated: '2023-11-01' },
        { id: 'PAY-2002', username: 'Affiliate_Beta', type: 'UPI', paymentAddress: 'beta@upi', amountRequested: 2500.50, remarks: 'Commission', status: 'Approved', dateCreated: '2023-11-02' },
        { id: 'PAY-2003', username: 'Seller_Gamma', type: 'Wallet', paymentAddress: 'gamma_wallet_id', amountRequested: 12500.00, remarks: 'Sales Revenue', status: 'Rejected', dateCreated: '2023-11-03' },
        { id: 'PAY-2004', username: 'Vendor_Delta', type: 'Bank Transfer', paymentAddress: 'acct_1044...', amountRequested: 85000.00, remarks: 'Q3 Earnings', status: 'Pending', dateCreated: '2023-11-05' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesSearch = 
      searchTerm === '' ||
      req.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.paymentAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id?.toLowerCase().includes(searchTerm.toLowerCase());
      
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
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payment Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Review and process payout requests from vendors and affiliates.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
          Home / Requests / <span className="text-indigo-600 font-medium">Payments</span>
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
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Search */}
            <div className="w-full sm:w-80 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search ID, Username, Type..."
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
                      {col === 'paymentAddress' ? 'Payment Address' :
                       col === 'amountRequested' ? 'Amount Requested' :
                       col === 'dateCreated' ? 'Date Created' :
                       col === 'id' ? 'Request ID' :
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
                {visibleColumns.username && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                )}
                {visibleColumns.type && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Req Type
                  </th>
                )}
                {visibleColumns.paymentAddress && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Address
                  </th>
                )}
                {visibleColumns.amountRequested && (
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                )}
                {visibleColumns.remarks && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remarks
                  </th>
                )}
                {visibleColumns.dateCreated && (
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Created
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
                    <p className="text-gray-500 font-medium">Loading payment requests...</p>
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
                    {visibleColumns.username && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {req.username}
                      </td>
                    )}
                    {visibleColumns.type && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {req.type}
                      </td>
                    )}
                    {visibleColumns.paymentAddress && (
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono text-xs">
                        {req.paymentAddress}
                      </td>
                    )}
                    {visibleColumns.amountRequested && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        ₹{req.amountRequested?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    )}
                    {visibleColumns.remarks && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {req.remarks || '—'}
                      </td>
                    )}
                    {visibleColumns.dateCreated && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {req.dateCreated || '—'}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                          ${req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            req.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                          {req.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {req.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {req.status === 'Pending' && <Clock className="w-3 h-3 mr-1 animate-pulse" />}
                          {req.status || 'Pending'}
                        </span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 mx-auto">
                          <Eye size={14} /> Review
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
              <button disabled classNam
              e="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-400 bg-white cursor-not-allowed">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}