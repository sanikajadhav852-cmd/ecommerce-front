// src/pages/TopOffers.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import api from '../lib/api';
import Loader from '../components/Loader';
import { AlertCircle, ChevronLeft, ChevronRight, Percent, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopOffers() {
  const [sliders, setSliders] = useState([]);             // Multi-image slider sections
  const [adminOffers, setAdminOffers] = useState([]);     // Single-image admin offers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [slidersRes, offersRes] = await Promise.all([
          api.get('/config/offer-sliders/public'),
          api.get('/config/offers')
        ]);

        console.log('Slider sections:', slidersRes.data);
        console.log('Admin Offers:', offersRes.data);

        setSliders(slidersRes.data.sliders || []);
        setAdminOffers(offersRes.data.offers || []);
      } catch (err) {
        console.error('Fetch error:', err.response?.data || err.message);
        setError('Unable to load offers at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-slate-950 transition-colors">
        <Loader />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 font-bold uppercase tracking-widest text-xs text-text-sec dark:text-slate-400"
        >
          Loading Top Offers...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background dark:bg-slate-950 transition-colors">
        <div className="text-center max-w-md">
          <AlertCircle size={64} className="mx-auto mb-6 text-accent" />
          <p className="text-xl font-medium text-text-pri dark:text-slate-50">{error}</p>
        </div>
      </div>
    );
  }

  const hasSliders = sliders.length > 0 && sliders.some(s => s.images?.length > 0);
  const hasOffers = adminOffers.length > 0;

  return (
    <div className="min-h-screen pb-24 bg-background dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 pt-16 space-y-20">

        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-center text-text-pri dark:text-slate-50"
        >
          Top Offers
        </motion.h1>

        {/* 1. Slider Sections (only show if admin added something) */}
        {hasSliders ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={5000}
              transitionTime={800}
              renderArrowPrev={(onClick) => (
                <button
                  onClick={onClick}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-md p-4 rounded-full text-white hover:bg-black/70 transition"
                >
                  <ChevronLeft size={28} />
                </button>
              )}
              renderArrowNext={(onClick) => (
                <button
                  onClick={onClick}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-md p-4 rounded-full text-white hover:bg-black/70 transition"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            >
              {sliders.map((section, sectionIdx) =>
                section.images?.map((img, imgIdx) => (
                  <div key={`${sectionIdx}-${imgIdx}`} className="h-[50vh] md:h-[70vh] relative">
                    <img
                      src={img.image_url}
                      alt={`Offer slide ${imgIdx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x700?text=Image+Not+Found';
                        console.warn('Slider image failed to load:', img.image_url);
                      }}
                    />
                  </div>
                ))
              )}
            </Carousel>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-surface dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors"
          >
            <h2 className="text-3xl font-bold text-text-pri dark:text-slate-50 mb-4">
              No Slider Offers Available
            </h2>
            <p className="text-text-sec dark:text-slate-400 max-w-md mx-auto">
              Check back later or browse our full collection for current deals.
            </p>
          </motion.div>
        )}

        {/* 2. Single-image Admin Offers */}
        {hasOffers ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {adminOffers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative group bg-surface dark:bg-slate-900 rounded-2xl shadow-lg border border-transparent dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      Up to {offer.maxDiscount || 50}%
                    </div>

                    {/* Image */}
                    <div className="h-80 overflow-hidden">
                      <img
                        src={offer.image_url}
                        alt={`${offer.offerType} offer`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x500?text=Offer+Image+Missing';
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Percent size={20} className="text-accent" />
                        <h3 className="text-xl md:text-2xl font-bold text-text-pri dark:text-slate-50 capitalize">
                          {offer.offerType}
                        </h3>
                      </div>

                      <p className="text-text-sec dark:text-slate-400 mb-6 text-base">
                        {offer.type}
                      </p>

                      {offer.link ? (
                        <a
                          href={offer.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary dark:text-primary-light font-medium hover:text-primary-dark dark:hover:text-primary transition-colors"
                        >
                          View Details <ArrowRight size={18} />
                        </a>
                      ) : (
                        <span className="text-primary dark:text-primary-light font-medium">
                          Limited Time Deal
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-surface dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors"
          >
            <h2 className="text-3xl font-bold text-text-pri dark:text-slate-50 mb-4">
              No Individual Offers Available
            </h2>
            <p className="text-text-sec dark:text-slate-400 max-w-md mx-auto">
              New deals are added regularly. Browse our products to find the best prices.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA - always visible */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-12 py-6 rounded-full font-bold uppercase tracking-wider text-sm shadow-xl transition-all group bg-primary dark:bg-primary-light text-white dark:text-slate-900 hover:bg-primary-dark dark:hover:bg-primary hover:scale-105"
          >
            Discover Full Collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}