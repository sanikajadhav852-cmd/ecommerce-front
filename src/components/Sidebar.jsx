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
  Palette, // Added for About section icon
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
    { name: "Manage Stock", icon: Box, color: "text-red-600" },
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
    { name: "Customer", icon: User, color: "text-cyan-500", hasSub: true },
    { name: "Return Requests", icon: RotateCcw, color: "text-red-500" },
    { name: "Payment Requests", icon: Wallet, color: "text-purple-600" },
    { name: "Custom message", icon: MessageSquare, color: "text-cyan-500" },
    { name: "System", icon: Settings, color: "text-red-500" },
   
    { name: "Reports", icon: BarChart3, color: "text-cyan-600", hasSub: true },
    { name: "FAQ", icon: HelpCircle, color: "text-red-500" },
    { name: "System Users", icon: Users, color: "text-green-500" },

   
   

{
    name: "Web Settings",
    icon: Globe,
    color: "text-green-600",
    path: "/admin/web-settings",   // ← this opens the new page
  },
  
  ];

  return (
    <aside
      className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white h-full shadow-xl transition-all duration-300 flex flex-col overflow-y-auto shrink-0 border-r border-gray-100`}
    >
      <div className="p-6 flex items-center gap-3 border-b sticky top-0 bg-white z-10">
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold shrink-0">
          J
        </div>
        {isSidebarOpen && (
          <span className="font-bold text-gray-700 text-lg truncate uppercase tracking-tight">
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
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-500 hover:bg-gray-50"
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
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-500 hover:bg-gray-50"
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
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                {item.subItems?.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    className={`flex items-center gap-3 p-2.5 text-sm font-medium transition-colors rounded-lg ${
                      location.pathname === sub.path
                        ? "text-purple-700 bg-purple-50"
                        : "text-gray-500 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${location.pathname === sub.path ? "bg-purple-600" : "bg-gray-300"}`}
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
          className="w-full flex items-center gap-3 p-3 mt-4 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
        >
          <LogOut size={20} className="text-red-500" />
          {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
        </button>
      </nav>
    </aside>
  );
}