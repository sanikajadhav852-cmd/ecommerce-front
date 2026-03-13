import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/authStore";
import { useTheme } from "./lib/useTheme";
import { useThemeStore } from "./store/themeStore";
import { Menu, Bell, User, LogOut, Loader2, Sun, Moon } from "lucide-react";

// ================= PAGE IMPORTS =================
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import TopOffers from "./pages/TopOffers";
import PublicCategories from "./pages/Categories";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCategories from "./pages/Admin/categories/Categories";
import CategoriesOrder from "./pages/Admin/categories/Categories-Order";
import Brands from "./pages/Admin/Brands";
import Orders from "./pages/Admin/orders/Orders";
import OrderTracking from "./pages/Admin/orders/Order-Tracking";
import SystemNotification from "./pages/Admin/orders/System-notification";
import PointOfSale from "./pages/Admin/Point-Of-Sale";
import Media from "./pages/Admin/Media";
import Sliders from "./pages/Admin/Sliders";
import Offer from "./pages/Admin/offer/Offer";
import OfferSlider from "./pages/Admin/offer/Offer-slider";
import SectionOrder from "./pages/Admin/offer/Section-Order";
import Promocode from "./pages/Admin/promocode/promocode";
import AddPromocode from "./pages/Admin/promocode/Add-promocode";


import AddProduct from "./pages/Admin/products/Add-Product";
import Attribute from "./pages/Admin/products/Attribute";
import BulkUpload from "./pages/Admin/products/Bulk-upload";
import ManageProducts from "./pages/Admin/products/Manage-Products";
import ProductsFAQs from "./pages/Admin/products/Products-FAQs";
import ProductsOrder from "./pages/Admin/products/Products-Order";
import Taxes from "./pages/Admin/products/Taxes";


import AboutEditor from "./pages/Admin/AboutEditor";
import ContactEditor from "./pages/Admin/ContactEditor";
import ThemeColors from "./pages/Admin/ThemeColors";
import WebSettings from "./pages/Admin/websettings/WebSettings";
import GeneralSettings from "./pages/Admin/websettings/GeneralSettings";
import ReturnRequests from "./pages/Admin/returnrequest";
import PaymentRequests from "./pages/Admin/paymentrequest";
import CustomMessages from "./pages/Admin/custommessage";
import ProductStock from "./pages/Admin/managestocks";
import ViewCustomers from "./pages/Admin/customer/viewcust";
import CustomerAddresses from "./pages/Admin/customer/address";
import ViewTransactions from "./pages/Admin/customer/Transactions";
import ManageCustomerWallet from "./pages/Admin/customer/CustomerWallet";
import SalesReport from "./pages/Admin/reports/salesreports";
import InventoryReport from "./pages/Admin/reports/inventoryreports";
import ManageSystemUsers from "./pages/Admin/systemuser";

import System from "./pages/Admin/system/System";
import NotificationSettings from "./pages/Admin/system/notification";
import AuthenticationSettings from "./pages/Admin/system/authentication";
import SMSGatewaySettings from "./pages/Admin/system/smsgateway";
import PolicySettings from "./pages/Admin/system/privacypolicy";
import ReturnPolicy from "./pages/Admin/system/returnpolicy";
import ShippingPolicy from "./pages/Admin/system/shippingpolicy";
import AdminPolicy from "./pages/Admin/system/adminpolicy";

function App() {
  const { theme, toggleTheme } = useThemeStore();
  useTheme();
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const { logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // NEW: State to track if we are still checking the session
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Wait for the store to check localStorage/API for the user
      await initializeAuth();
      setIsCheckingAuth(false);
    };
    init();
  }, [initializeAuth]);

  // If we are still checking auth, show a loading screen 
  // This prevents the "flash" of the home page or redirect to login
  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f4f7fe]">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Loading your session...</p>
      </div>
    );
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* ===== PUBLIC + USER LAYOUT ===== */}
        <Route
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Outlet />
              </main>
              <Footer />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/offers" element={<TopOffers />} />
          <Route path="/category" element={<PublicCategories />} />
          <Route path="/category/:id" element={<Category />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Route>

        {/* ===== ADMIN LAYOUT ===== */}
        <Route element={<ProtectedRoute adminOnly />}>
          <Route
            element={
              <div className="flex h-screen bg-surface dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
                <Sidebar isSidebarOpen={isSidebarOpen} />

                <main className="flex-1 flex flex-col overflow-hidden">
                  <header className="bg-white dark:bg-slate-800 h-16 flex items-center justify-between px-8 shadow-sm shrink-0 z-20 border-b border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                      >
                        <Menu size={20} />
                      </button>
                      <span className="bg-purple-600 dark:bg-purple-500 text-white text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                        Admin Panel
                      </span>
                    </div>

                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => toggleTheme()}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 rounded-full transition-all group"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                      >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                      </button>

                      <div className="relative cursor-pointer text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <Bell size={22} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                          0
                        </span>
                      </div>
                      <div className="flex items-center gap-3 border-l border-gray-200 dark:border-slate-700 pl-6">
                        <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold">
                          <User size={20} />
                        </div>
                        <button 
                          onClick={logout} 
                          className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          title="Logout"
                        >
                          <LogOut size={18} />
                        </button>
                      </div>
                    </div>
                  </header>

                  <div className="flex-1 overflow-y-auto p-4 lg:p-8 text-text-primary dark:text-gray-100">
                    <Outlet />
                  </div>
                </main>
              </div>
            }
          >
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pos" element={<PointOfSale />} />
            <Route path="/media" element={<Media />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/categories-order" element={<CategoriesOrder />} />
            <Route path="/brands" element={<Brands />} />
           
            
            <Route path="/sliders" element={<Sliders />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/offer-slider" element={<OfferSlider />} />
            <Route path="/sections-order" element={<SectionOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/system-notifications" element={<SystemNotification />} />
            <Route path="/attributes" element={<Attribute />} />
            <Route path="/taxes" element={<Taxes />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/product-faqs" element={<ProductsFAQs />} />
            <Route path="/products-order" element={<ProductsOrder />} />

            <Route path="/admin/promocode" element={<Promocode />} />
            <Route path="/admin/promocode/add-promocode" element={<AddPromocode />} />

             <Route path="/admin/theme-editor" element={<ThemeColors />} />
            <Route path="/admin/about-editor" element={<AboutEditor />} />
            <Route path="/admin/contact-editor" element={<ContactEditor />} />
            <Route path="/admin/web-settings" element={<WebSettings />} />
            <Route path="/admin/web-settings/general" element={<GeneralSettings />} />
             <Route path="/admin/return-requests" element={<ReturnRequests />} />
             <Route path="/admin/payment-requests" element={<PaymentRequests />} />
             <Route path="/admin/custom-messages" element={<CustomMessages />} />
             <Route path="/admin/product-stock" element={<ProductStock />} />
             <Route path="/admin/customers" element={<ViewCustomers />} />
             <Route path="/admin/customer-addresses" element={<CustomerAddresses />} />
             <Route path="/admin/transactions" element={<ViewTransactions />} />
             <Route path="/admin/customer-wallet" element={<ManageCustomerWallet />} />
             <Route path="/admin/sales-report" element={<SalesReport />} />
             <Route path="/admin/inventory-report" element={<InventoryReport />} />
             <Route path="/admin/system-users" element={<ManageSystemUsers/>} />


             <Route path="/admin/system" element={<System/>} />
             <Route path="/admin/notification" element={<NotificationSettings/>} />
             <Route path="/admin/authentication" element={<AuthenticationSettings/>} />
             <Route path="/admin/smsgateway" element={<SMSGatewaySettings/>} />
             <Route path="/admin/privacypolicy" element={<PolicySettings/>} />
             <Route path="/admin/returnpolicy" element={<ReturnPolicy/>} />
             <Route path="/admin/shippingpolicy" element={<ShippingPolicy/>} />
             <Route path="/admin/adminpolicy" element={<AdminPolicy/>} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;