// src/pages/Wishlist.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems, fetchWishlist, loading, error } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading && wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Wishlist</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            My Wishlist
            <Heart className="text-accent fill-accent" size={32} />
          </h1>
          <p className="mt-2 text-gray-600">
            {wishlistItems.length} items saved for later
          </p>
        </header>

        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-gray-100"
          >
            <div className="w-24 h-24 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-accent-light" style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Save items you love here. They'll be waiting for you when you're ready to buy.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition shadow-lg shadow-primary/20"
            >
              <ShoppingBag size={20} />
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {wishlistItems.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                   <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
