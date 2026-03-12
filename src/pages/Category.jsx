// src/pages/Category.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { ArrowLeft } from 'lucide-react';

export default function Category() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const [catRes, prodRes] = await Promise.all([
          api.get(`/categories/${id}`),
          api.get(`/products?category_id=${id}&limit=20`),
        ]);

        setCategory(catRes.data.category);
        setProducts(prodRes.data.products || []);
      } catch (err) {
        setError('Failed to load category');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <Loader fullScreen />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary, #111827)' }}>
            {error || "Category Not Found"}
          </h2>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-medium hover:underline transition-colors"
            style={{ color: 'var(--primary, #7c3aed)' }}
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--background, #ffffff)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-medium mb-8 transition-colors"
          style={{ color: 'var(--text-secondary, #6b7280)' }}
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary, #111827)' }}>
          {category.name}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center py-20 text-lg font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>
              No products available in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}