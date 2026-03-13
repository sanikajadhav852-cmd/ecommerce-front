// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from '../lib/api';
import { 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  ShoppingBag 
} from 'lucide-react';

const fallbackSlides = [
  { id: 1, image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop", title: "Authentic Indian Spices", subtitle: "Straight from the farm to your kitchen." },
  { id: 2, image_url: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2070&auto=format&fit=crop", title: "Hand-Ground Perfection", subtitle: "Preserving the essential oils and aroma." },
];

export default function Home() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // Fetch sliders (existing logic)
        const slidesRes = await api.get('/config/sliders');
        const backendSlides = slidesRes.data?.slides || [];
        setHeroSlides(backendSlides.length > 0 ? backendSlides : fallbackSlides);

        // Fetch dynamic site content (newsletter/CTA)
        const contentRes = await api.get('/config/site-content');
        setSiteContent(contentRes.data.data || {});

      } catch (err) {
        console.error('Home fetch error:', err);
        setHeroSlides(fallbackSlides);
        setError('Showing preview collection.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <Loader2 className="w-12 h-12 text-primary dark:text-primary-light" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-950 transition-colors duration-300">
      {/* 1. HERO SECTION - Dynamic from /sliders */}
      <section className="relative group">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          transitionTime={1000}
          renderArrowPrev={(onClick) => (
            <button onClick={onClick} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
              <ChevronLeft size={30} />
            </button>
          )}
          renderArrowNext={(onClick) => (
            <button onClick={onClick} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
              <ChevronRight size={30} />
            </button>
          )}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id} className="h-[60vh] md:h-[85vh] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/30 z-10" />
              <img 
                src={slide.image_url} 
                alt="Slider"
                className="object-cover w-full h-full transform scale-105" 
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-primary-light font-bold tracking-widest uppercase mb-4"
                >
                  {siteContent.site_title || 'Premium Quality'}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-7xl font-serif font-bold text-white mb-6"
                >
                  {siteContent.short_description || 'Discover Authentic Spices'}
                </motion.h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors"
                >
                  SHOP COLLECTION <ShoppingBag size={20} />
                </motion.button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* 4. NEWSLETTER / CTA - Now fully dynamic from /site-content */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              {siteContent.newsletter_title || 'Join the Spice Club'}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {siteContent.newsletter_description || 'Subscribe to get special offers, free recipes, and exclusive deals.'}
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full text-gray-900 dark:text-white dark:bg-white/10 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 ring-white/20"
              />
              <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors">
                {siteContent.subscribe_button_text || 'Subscribe'}
              </button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-dark/20 rounded-full opacity-50" />
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-primary text-white shadow-2xl hover:bg-primary-dark transition-all z-50 shadow-primary/20"
      >
        <ChevronRight className="-rotate-90" size={24} />
      </button>
    </div>
  );
}