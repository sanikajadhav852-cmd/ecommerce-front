// src/components/ProductCard.jsx
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => (e.target.src = '/placeholder.jpg')}
          />
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
          <button 
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 rounded-full transition shadow-sm"
          >
            <Heart size={18} className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-slate-100 line-clamp-2 h-12">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-slate-100">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            <button className="p-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full transition">
              <ShoppingBag size={18} className="text-primary dark:text-primary-light" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}