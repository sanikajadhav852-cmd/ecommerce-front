// src/pages/About.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, ShieldCheck, Truck, Loader2, AlertCircle } from 'lucide-react';
import api from '../lib/api';

export default function About() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/config/site-content');
      setData(res.data.data || {});
    } catch (err) {
      console.error('About fetch error:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
          <p className="font-medium text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 max-w-md">
          <AlertCircle size={64} className="mx-auto mb-4 text-accent" />
          <p className="text-xl font-medium text-gray-900">
            {error || 'Content not available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / About Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-primary/10 -z-10" />
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 leading-tight">
              {data.about_title || 'About Us'}
            </h1>
            
            <div 
              className="prose prose-lg text-gray-600 space-y-6 leading-relaxed whitespace-pre-line"
            >
              {data.about_description || 'Welcome to our store. We provide the best quality products.'}
            </div>

          </motion.div>

          {/* About Image */}
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="order-1 lg:order-2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px]">
              {data.about_image ? (
                <img
                  src={data.about_image}
                  className="w-full h-full object-cover"
                  alt="About Us"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop'; }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simplified Core Values (Generic Fallback since DB lacks arrays) */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-primary" />
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-primary/5 text-primary rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Premium Quality</h3>
              <p className="text-sm text-gray-600">Strict quality controls for the best experience.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Leaf size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">100% Natural</h3>
              <p className="text-sm text-gray-600">Pure ingredients with no artificial preservatives.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Truck size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick and reliable shipping to your doorstep.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Award size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Customer First</h3>
              <p className="text-sm text-gray-600">Dedicated support team to help you anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}