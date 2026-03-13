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
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-900 transition-colors">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-text-sec dark:text-slate-400 mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="font-medium text-text-pri dark:text-slate-200">Wishlist</span>
          </div>
          <h1 className="text-4xl font-extrabold text-text-pri dark:text-white flex items-center gap-3">
            My Wishlist
            <Heart className="text-accent fill-accent" size={32} />
          </h1>
          <p className="mt-2 text-text-sec dark:text-slate-400">
            {wishlistItems.length} items saved for later
          </p>
        </header>

        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface dark:bg-slate-900 rounded-[2.5rem] p-12 text-center shadow-sm border border-gray-100 dark:border-slate-800"
          >
            <div className="w-24 h-24 bg-accent/5 dark:bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-text-pri dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-text-sec dark:text-slate-400 mb-8 max-w-md mx-auto">
              Save items you love here. They'll be waiting for you when you're ready to buy.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary dark:bg-primary-light text-white dark:text-slate-900 font-bold rounded-2xl hover:bg-primary/90 dark:hover:bg-primary transition shadow-lg shadow-primary/20"
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
