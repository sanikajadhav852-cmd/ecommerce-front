// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import Loader from '../components/Loader';
import { Plus, Minus, ShoppingBag, ArrowLeft, Heart, Share2, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [prodRes, varRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/variants/product/${id}`),
        ]);

        const fetchedProduct = prodRes.data.product;
        setProduct(fetchedProduct);
        setActiveImage(fetchedProduct.image);

        const fetchedVariants = varRes.data.variants || [];
        setVariants(fetchedVariants);

        // Default to first in-stock variant
        const firstInStock = fetchedVariants.find(v => v.stock > 0) || fetchedVariants[0];
        setSelectedVariant(firstInStock);
      } catch (err) {
        console.error(err);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    // ... existing code
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    try {
      await toggleWishlist(product);
    } catch (err) {
      alert("Failed to update wishlist");
    }
  };

  const increaseQty = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Get unique weights from DB and sort them naturally
  const getSortedWeights = () => {
    const weights = [...new Set(variants.map(v => v.weight).filter(Boolean))];
    return weights.sort((a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
  };

  const availableWeights = getSortedWeights();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-slate-900 transition-colors">
        <Loader size="large" />
        <p className="mt-4 font-medium text-text-sec dark:text-slate-400">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background dark:bg-slate-900 transition-colors">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-text-pri dark:text-slate-100">
            {error || "Product Not Found"}
          </h2>
          <Link 
            to="/products" 
            className="font-semibold flex items-center justify-center gap-2 text-primary dark:text-primary-light hover:underline"
          >
            <ArrowLeft size={20} /> Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant?.special_price || selectedVariant?.price || product.price || 0;
  const originalPrice = selectedVariant?.price || product.price || 0;
  const discountPercentage = selectedVariant?.special_price && selectedVariant.special_price < originalPrice
    ? Math.round(((originalPrice - selectedVariant.special_price) / originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex items-center text-sm mb-8 text-text-sec dark:text-slate-400">
          <Link to="/" className="hover:underline transition text-text-pri dark:text-slate-200">
            Home
          </Link>
          <span className="mx-3">/</span>
          <Link to="/products" className="hover:underline transition text-text-pri dark:text-slate-200">
            Products
          </Link>
          <span className="mx-3">/</span>
          <span className="font-medium text-text-pri dark:text-slate-100">
            {product.name}
          </span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800">
              <img
                src={`${BASE_URL}${activeImage || '/placeholder.jpg'}`}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full font-bold text-sm shadow-md" style={{
                  backgroundColor: 'var(--accent, #ef4444)',
                  color: 'white',
                }}>
                    {discountPercentage}% OFF
                </div>
              )}
              <button 
                onClick={handleToggleWishlist}
                className="absolute top-5 right-5 p-4 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-all z-10 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700"
              >
                <Heart size={24} className={product && isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[product.image, ...(product.other_images || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img 
                      ? 'border-primary dark:border-primary-light shadow-md scale-105' 
                      : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img src={`${BASE_URL}${img}`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-8 lg:sticky lg:top-8">
            {/* Title & Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-pri dark:text-slate-50">
                {product.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-4xl font-bold text-text-pri dark:text-slate-100">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {discountPercentage > 0 && (
                  <span className="text-xl line-through text-text-sec dark:text-slate-500">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${selectedVariant?.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${selectedVariant?.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {selectedVariant?.stock > 0 
                  ? `${selectedVariant.stock} in stock` 
                  : 'Out of stock'}
              </span>
            </div>

            {/* Dynamic Weight Selector */}
            {availableWeights.length > 0 && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold uppercase tracking-wide text-text-sec dark:text-slate-400">
                  Select Pack Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableWeights.map(weight => {
                    const variant = variants.find(v => v.weight === weight);
                    const isSelected = selectedVariant?.weight === weight;
                    const isOutOfStock = variant && variant.stock <= 0;

                    return (
                      <button
                        key={weight}
                        type="button"
                        disabled={!variant || isOutOfStock}
                        onClick={() => variant && setSelectedVariant(variant)}
                        className={`
                          relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
                          border-2 focus:outline-none focus:ring-2
                          ${isSelected 
                            ? 'bg-primary dark:bg-primary-light text-white dark:text-slate-900 border-primary dark:border-primary-light shadow-md' 
                            : 'bg-surface dark:bg-slate-800 text-text-pri dark:text-slate-200 border-gray-100 dark:border-slate-700 hover:shadow'
                          }
                          ${isOutOfStock 
                            ? 'opacity-40 cursor-not-allowed line-through' 
                            : 'cursor-pointer'
                          }
                        `}
                      >
                        {weight}
                        {isOutOfStock && (
                          <span className="absolute -top-1 -right-1 text-white text-[10px] px-1.5 rounded-full" style={{ backgroundColor: 'var(--accent, #ef4444)' }}>
                            Out
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold uppercase tracking-wide text-text-sec dark:text-slate-400">
                Quantity
              </label>
              <div className="flex items-center border rounded-full w-fit overflow-hidden shadow-sm border-gray-100 dark:border-slate-700 bg-surface dark:bg-slate-800">
                <button
                  onClick={decreaseQty}
                  disabled={quantity <= 1}
                  className="px-5 py-3 transition disabled:opacity-40 text-text-sec dark:text-slate-400"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-3 text-lg font-medium border-x border-gray-100 dark:border-slate-700 text-text-pri dark:text-slate-200">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  disabled={selectedVariant && quantity >= selectedVariant.stock}
                  className="px-5 py-3 transition disabled:opacity-40 text-text-sec dark:text-slate-400"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-6">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock <= 0 || quantity > selectedVariant.stock}
                className={`w-full py-5 rounded-full font-bold text-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedVariant?.stock > 0 ? 'bg-primary dark:bg-primary-light text-white dark:text-slate-900' : 'bg-gray-400 dark:bg-slate-700 text-white'
                }`}
              >
                {selectedVariant?.stock > 0 ? (
                  <span className="flex items-center justify-center gap-3">
                    <ShoppingBag size={20} />
                    Add to Bag
                  </span>
                ) : (
                  'Out of Stock'
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: 'var(--gray-light, #e5e7eb)' }}>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                <Truck size={20} style={{ color: 'var(--primary, #7c3aed)' }} />
                Free Shipping
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                <ShieldCheck size={20} style={{ color: 'var(--primary, #7c3aed)' }} />
                1 Year Warranty
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-text-pri dark:text-slate-100">
                  Description
                </h3>
                <p className="leading-relaxed text-text-sec dark:text-slate-400">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}