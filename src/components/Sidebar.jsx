import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  LayoutDashboard,
  ShoppingCart,
  List,
  Tag,
  Package,
  Zap,
  Calculator,
  Music,
  Sliders,
  Gift,
  Box,
  MessageSquare,
  Ticket,
  TicketIcon,
  Layers,
  User,
  RotateCcw,
  Truck,
  Settings,
  Globe,
  ChevronRight,
  LogOut,
  Wallet,
  Send,
  MapPin,
  HelpCircle,
  Users,
  BarChart3,
  Map,
  FileText,
  Phone,
  Palette, 
  UserCog// Added for About section icon
} from "lucide-react";

export default function Sidebar({ isSidebarOpen }) {
  const { logout } = useAuthStore();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState("Categories");

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      color: "text-red-500",
      path: "/admin",
    },
    // Find the "Orders" item in your menuItems array and update it to this:
    {
        name: "Orders",
        icon: ShoppingCart,
        color: "text-green-500",
        hasSub: true,
        subItems: [
            { name: "Orders", path: "/orders" },
            { name: "Order Tracking", path: "/order-tracking" },
            { name: "System Notifications", path: "/system-notifications" },
        ],
    },
    {
      name: "Categories",
      icon: List,
      color: "text-purple-500",
      hasSub: true,
      subItems: [
        { name: "Categories ", path: "/categories" },
        { name: "Category Order", path: "/categories-order" },
      ],
    },
    { name: "Brands", icon: Tag, color: "text-orange-500", path: "/brands" },
    {
      name: "Products",
      icon: Package, // lucide-react icon
      color: "text-blue-400",
      hasSub: true,
      subItems: [
        { name: "Attributes", path: "/attributes" },
        { name: "Tax", path: "/taxes" },
        { name: "Add Product", path: "/add-product" },
        { name: "Bulk Upload", path: "/bulk-upload" },
        { name: "Manage Products", path: "/manage-products" },
        { name: "Product FAQs", path: "/product-faqs" },
        { name: "Products Order", path: "/products-order" },
      ],
    },
      { name: "Media", icon: Music, color: "text-purple-600" , path: "/media"},
    { name: "Sliders", icon: Sliders, color: "text-orange-400" , path: "/sliders"},
    { name: "Offers", icon: Gift, color: "text-cyan-400", hasSub: true,
      subItems: [
        { name: "Offers", path: "/offer" },
        { name: "Offers Slider", path: "/offer-slider" }, // Points to the Sliders.jsx we made
        { name: "Sections Order", path: "/sections-order" }
      ]
     },
    { name: "Manage Stock", icon: Box, color: "text-red-600" , path: "/admin/product-stock" },
    {
      name: "Support Tickets",
      icon: Ticket,
      color: "text-green-400",
      hasSub: true,
    },
    { name: "Promo Code", icon: TicketIcon, color: "text-purple-700", path: "/admin/promocode" },
    {
      name: "Featured Sections",
      icon: Layers,
      color: "text-orange-500",
      hasSub: true,
    },
   {
      name: "Customers",
      icon: Users,
      color: "text-cyan-500",
      hasSub: true,
      subItems: [
        { 
          name: "View Customers", 
          path: "/admin/customers",
          icon: UserCog // nice icon for view customers
        },
        { 
      name: "Address", 
      path: "/admin/customer-addresses",
      icon: MapPin  // nice icon for addresses
    },
     { 
      name: "Transactions", 
      path: "/admin/transactions",
      icon: MapPin  // nice icon for addresses
    },
    { 
      name: "Wallet Transcation", 
      path: "/admin/customer-wallet",
      icon: MapPin  // nice icon for addresses
    },
        // You can add more later, e.g.:
        // { name: "Add Customer", path: "/admin/add-customer" },
        // { name: "Blocked Customers", path: "/admin/blocked-customers" },
      ],
    },
    { name: "Return Requests", icon: RotateCcw, color: "text-red-500", path: "/admin/return-requests" },
    { name: "Payment Requests", icon: Wallet, color: "text-purple-600", path: "/admin/payment-requests" },
    { name: "Custom message", icon: MessageSquare, color: "text-cyan-500", path: "/admin/custom-messages" },
    { name: "System", icon: Settings, color: "text-red-500" , path: "/admin/system"},
   
   {
  name: "Reports",
  icon: BarChart3,
  color: "text-cyan-600",
  hasSub: true,
  subItems: [
    { name: "Sales Report", path: "/admin/sales-report" },
     { name: "Inventory Report", path: "/admin/inventory-report" },
    // ... other reports
  ],
  
 
},
    { name: "FAQ", icon: HelpCircle, color: "text-red-500" },
  
      { 
      name: "System Users", 
      path: "/admin/system-users",
      icon: Users  // nice icon for addresses
    },

   
   

{
    name: "Web Settings",
    icon: Globe,
    color: "text-green-600",
    path: "/admin/web-settings",   // ← this opens the new page
  },
  ];

  return (
    <aside
      className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-slate-800 h-full shadow-xl transition-all duration-300 flex flex-col overflow-y-auto shrink-0 border-r border-gray-100 dark:border-slate-700`}
    >
      <div className="p-6 flex items-center gap-3 border-b dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10 transition-colors duration-300">
        <div className="w-8 h-8 bg-purple-600 text-white rounded flex items-center justify-center font-bold shrink-0">
          J
        </div>
        {isSidebarOpen && (
          <span className="font-bold text-gray-700 dark:text-gray-100 text-lg truncate uppercase tracking-tight">
            Jijai Masale
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.hasSub ? (
              <button
                onClick={() =>
                  setExpandedMenu(expandedMenu === item.name ? null : item.name)
                }
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                  expandedMenu === item.name
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={item.color} />
                  {isSidebarOpen && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </div>
                {isSidebarOpen && (
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-200 ${expandedMenu === item.name ? "rotate-90" : ""}`}
                  />
                )}
              </button>
            ) : (
              <Link
                to={item.path}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  location.pathname === item.path
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <item.icon size={20} className={item.color} />
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{item.name}</span>
                )}
              </Link>
            )}

            {/* Sub-menu items */}
            {isSidebarOpen && item.hasSub && expandedMenu === item.name && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 dark:border-slate-700 pl-2">
                {item.subItems?.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    className={`flex items-center gap-3 p-2.5 text-sm font-medium transition-colors rounded-lg ${
                      location.pathname === sub.path
                        ? "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30"
                        : "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${location.pathname === sub.path ? "bg-purple-600 dark:bg-purple-400" : "bg-gray-300 dark:bg-gray-600"}`}
                    />
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Logout at the bottom */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 mt-4 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-colors"
        >
          <LogOut size={20} className="text-red-500 dark:text-red-400" />
          {isSidebarOpen && <span className="font-medium text-sm text-red-600 dark:text-red-400">Logout</span>}
        </button>
      </nav>
    </aside>
  );
}