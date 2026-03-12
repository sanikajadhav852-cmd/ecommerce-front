// src/components/Navbar.jsx
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import api from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { wishlistItems, fetchWishlist } = useWishlistStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    site_name: "जिजाई",
    logo_url: "/logo.png",
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Dropdowns
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentRes = await api.get("/config/site-content");
        setConfig({
          site_name: contentRes.data.data?.site_title?.trim() || "जिजाई",
          logo_url: contentRes.data.data?.logo || "/logo.png",
        });

        const catRes = await api.get("/categories");
        setCategories([{ name: "All Categories" }, ...(catRes.data.categories || [])]);
      } catch (err) {
        console.error("Navbar load error:", err);
      } finally {
        setIsLoadingConfig(false);
      }
    };
    fetchData();
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  // Search suggestions debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 1) {
        setSearchLoading(true);
        try {
          const params = new URLSearchParams({
            q: searchQuery.trim(),
            limit: 5,
            ...(selectedCategory !== "All Categories" && { category: selectedCategory }),
          });
          const res = await api.get(`/products/search?${params}`);
          setSuggestions(res.data.products || []);
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setShowCategoryDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {config.logo_url && config.logo_url !== "/logo.png" ? (
              <img 
                src={config.logo_url} 
                alt="Logo" 
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                जि
              </div>
            )}
            <span className="hidden sm:block text-xl font-extrabold text-primary tracking-tight">
              {isLoadingConfig ? "..." : config.site_name}
            </span>
          </Link>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden md:flex flex-1 max-w-2xl relative" ref={searchRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary focus-within:bg-white transition-all duration-300"
            >
              <div className="relative border-r border-gray-200" ref={categoryRef}>
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="h-full px-4 text-sm font-semibold text-gray-600 flex items-center gap-1 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span className="max-w-[100px] truncate">{selectedCategory}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 bg-white shadow-2xl border border-gray-100 rounded-xl mt-2 w-56 max-h-72 overflow-y-auto z-[60] py-2"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => { setSelectedCategory(cat.name); setShowCategoryDropdown(false); }}
                          className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for items..."
                className="flex-1 px-4 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-400"
              />

              <button type="submit" className="px-5 text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                <Search size={20} />
              </button>
            </form>

            {/* SEARCH SUGGESTIONS */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2"
                >
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <button 
                        key={item.id} 
                        type="button"
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors group"
                        onClick={() => {
                          setSearchQuery(item.name);
                          setShowSuggestions(false);
                          navigate(`/products?search=${encodeURIComponent(item.name)}`);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Search size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No matches found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/cart" className="p-2.5 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full relative transition-all group">
              <ShoppingCart size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </Link>
            
            <Link to="/wishlist" className="hidden sm:flex p-2.5 text-gray-600 hover:text-accent hover:bg-accent/5 rounded-full transition-all relative group">
              <Heart size={22} className={wishlistItems.length > 0 ? "fill-accent text-accent" : ""} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
              )}
            </Link>

            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="p-2.5 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
                  <User size={22} />
                </Link>
                <button
                  onClick={() => { logout(); navigate("/login"); }}
                  className="hidden md:flex items-center gap-2 text-red-600 text-sm font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20">
                Login
              </Link>
            )}

            <button className="md:hidden p-2 ml-1 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV (DESKTOP) ================= */}
      <nav className="hidden md:block bg-primary/10 border-t border-primary/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 h-12 items-center">
          {[
            { path: "/", label: "Home" },
            { path: "/category", label: "Category", hasDropdown: true },
            { path: "/products", label: "Products" },
            { path: "/offers", label: "Top Offers" },
            { path: "/contact", label: "Contact" },
            { path: "/about", label: "About" }
          ].map((item) => (
            item.hasDropdown ? (
              <div key={item.path} className="relative group h-full flex items-center">
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 px-5 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-white text-primary shadow-sm scale-105"
                      : "text-primary hover:bg-white/50"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </Link>

                {/* Dropdown Box */}
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-56 py-2 overflow-hidden flex flex-col max-h-96 overflow-y-auto">
                    {categories.filter(c => c.name !== "All Categories").map(cat => (
                      <Link
                        key={cat.id || cat.name}
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-1.5 rounded-lg text-[13px] font-bold transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-primary shadow-sm scale-105"
                    : "text-primary hover:bg-white/50"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* ================= MOBILE DRAWER MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-[70] flex flex-col md:hidden"
            >
              <div className="p-6 flex items-center justify-between border-b">
                <span className="font-extrabold text-xl text-primary">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2.5 bg-gray-50 text-gray-500 rounded-full hover:bg-primary/5 hover:text-primary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <form onSubmit={handleSearchSubmit} className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-2xl border-none text-sm font-medium focus:ring-2 ring-purple-600/50 transition-all"
                  />
                </form>

                <nav className="space-y-2">
                  {["Home", "Category", "Products", "Offers", "Contact", "About"].map((label) => {
                    const path = label === "Home" ? "/" : `/${label.toLowerCase().replace(" ", "")}`;
                    
                    if (label === "Category") {
                      return (
                        <div key={path} className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <Link
                              to={path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex-1 py-3.5 px-5 rounded-2xl text-base font-bold transition-all ${
                                isActive(path) ? "bg-primary/5 text-primary" : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {label}
                            </Link>
                            <button 
                              onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                              className="p-3 ml-2 rounded-xl text-gray-500 hover:bg-gray-50"
                            >
                              <ChevronDown size={20} className={`transition-transform duration-300 ${mobileCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          
                          {/* Mobile Dropdown */}
                          <AnimatePresence>
                            {mobileCategoryOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-gray-50 rounded-xl mt-1 mx-4"
                              >
                                {categories.filter(c => c.name !== "All Categories").map(cat => (
                                  <Link
                                    key={cat.id || cat.name}
                                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-5 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors"
                                  >
                                    {cat.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3.5 px-5 rounded-2xl text-base font-bold transition-all ${
                          isActive(path) ? "bg-primary/5 text-primary" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6 border-t bg-gray-50/50">
                 {isAuthenticated ? (
                   <button onClick={logout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all">
                     <LogOut size={18} /> Logout
                   </button>
                 ) : (
                   <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-4 bg-primary text-white text-center rounded-2xl font-bold shadow-lg shadow-primary/10 active:scale-95 transition-all">
                     Login / Register
                   </Link>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}