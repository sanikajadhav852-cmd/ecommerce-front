// src/pages/Products.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, AlertCircle, Filter, Search, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlistStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { addToCart } = useCartStore();
  const IMAGE_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${IMAGE_BASE_URL}/api/products?limit=50`);
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Our kitchen is a bit busy. Please refresh to try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, searchQuery, sortBy]);

  const handleToggleWishlist = async (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleWishlist(product);
    } catch (err) {
      alert("Failed to update wishlist");
    }
  };

 const handleAddToCart = async (product, e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!localStorage.getItem('token')) {
    alert('Please login to add items to cart');
    // Optional: redirect
    // navigate('/login');
    return;
  }

  try {
    await addToCart({ product_id: product.id, qty: 1 });
    alert(`${product.name} added to cart!`);
  } catch (err) {
    if (err.response?.status === 401) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      // navigate('/login');
    } else {
      alert('Failed to add to cart. Please try again.');
    }
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4" style={{
            borderColor: 'var(--gray-light, #f3f4f6)',
            borderTopColor: 'var(--primary, #7c3aed)',
          }} />
          <p className="font-bold text-xs uppercase tracking-widest" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Sourcing Spices...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="text-center max-w-md p-10 rounded-[2.5rem] shadow-xl border" style={{
          backgroundColor: 'var(--surface, #ffffff)',
          borderColor: 'var(--gray-light, #e5e7eb)',
        }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
            <AlertCircle size={40} style={{ color: 'var(--accent, #ef4444)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>
            Something went wrong
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary, #6b7280)' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-2xl font-bold transition-all shadow-lg"
            style={{
              backgroundColor: 'var(--primary, #7c3aed)',
              color: 'white',
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
      {/* Hero Header */}
      <div className="border-b pt-24 pb-12" style={{ borderColor: 'var(--gray-light, #e5e7eb)', backgroundColor: 'var(--surface, #ffffff)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest" style={{ color: 'var(--primary, #7c3aed)' }}>
                <Sparkles size={14} />
                100% Organic & Pure
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight" style={{ color: 'var(--text-primary, #111827)' }}>
                The <span style={{ color: 'var(--primary, #7c3aed)' }}>Pantry.</span>
              </h1>
              <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                Explore our hand-ground masalas and farm-fresh spices delivered directly to your kitchen.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" size={20} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
                <input
                  type="text"
                  placeholder="Search spices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-4 border rounded-2xl w-full md:w-80 outline-none transition-all font-medium"
                  style={{
                    backgroundColor: 'var(--gray-light, #f3f4f6)',
                    borderColor: 'var(--gray-light, #e5e7eb)',
                  }}
                />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 border rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer transition-all"
                style={{
                  backgroundColor: 'var(--gray-light, #f3f4f6)',
                  borderColor: 'var(--gray-light, #e5e7eb)',
                  color: 'var(--text-secondary, #6b7280)',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Bar */}
        <div className="flex items-center justify-between mb-10">
          <p className="font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text-primary, #111827)' }}>{filteredProducts.length}</span> results
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 rounded-[3rem] border border-dashed" style={{
            backgroundColor: 'var(--surface, #ffffff)',
            borderColor: 'var(--gray-light, #e5e7eb)',
          }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
              <Search size={40} style={{ color: 'var(--gray-medium, #9ca3af)' }} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>
              No spices found
            </h3>
            <p className="mt-2" style={{ color: 'var(--text-secondary, #6b7280)' }}>
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link 
                    to={`/product/${product.id}`}
                    className="group block rounded-[2.5rem] overflow-hidden border hover:shadow-2xl transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--surface, #ffffff)',
                      borderColor: 'var(--gray-light, #e5e7eb)',
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                      <img
                        src={`${IMAGE_BASE_URL}${product.image || "/placeholder.jpg"}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                      
                      {/* Floating Badge */}
                      {product.stock <= 5 && product.stock > 0 && (
                        <div className="absolute top-5 left-5 text-white text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: 'var(--accent, #ef4444)' }}>
                          Low Stock
                        </div>
                      )}

                      {/* Quick Actions */}
                      <button
                        onClick={(e) => handleToggleWishlist(product, e)}
                        className="absolute top-5 right-5 p-3 backdrop-blur-md rounded-2xl shadow-sm hover:bg-white/90 transition-all"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      >
                        <Heart size={20} className={isInWishlist(product.id) ? "fill-accent text-accent" : "text-gray-400"} />
                      </button>

                      {/* Add to Cart Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={product.stock <= 0}
                          className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                          style={{
                            backgroundColor: product.stock <= 0 ? 'var(--gray-medium, #9ca3af)' : 'var(--primary, #7c3aed)',
                            color: 'white',
                          }}
                        >
                          <ShoppingBag size={16} />
                          {product.stock <= 0 ? "Out of Stock" : "Add to Bag"}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--primary, #7c3aed)' }}>
                          {product.category_name || "Organic Spice"}
                        </span>
                        <div className="flex items-center gap-1" style={{ color: 'var(--accent, #ef4444)' }}>
                          <Sparkles size={12} fill="currentColor" />
                          <span className="text-xs font-bold">4.8</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 line-clamp-1 group-hover:text-primary transition-colors" style={{ color: 'var(--text-primary, #111827)' }}>
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--gray-light, #e5e7eb)' }}>
                        <span className="text-2xl font-black" style={{ color: 'var(--text-primary, #111827)' }}>
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </span>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: 'var(--gray-light, #f3f4f6)' }}>
                          <ArrowRight size={18} style={{ color: 'var(--primary, #7c3aed)' }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;