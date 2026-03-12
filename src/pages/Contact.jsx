// src/pages/ContactUs.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle, Clock, Globe } from 'lucide-react';
import api from '../lib/api';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const [pageData, setPageData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  // Fetch dynamic content from backend
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setPageLoading(true);
        setPageError(null);
        const res = await api.get('/config/site-content');
        setPageData(res.data.data || {});
      } catch (err) {
        console.error('Failed to load contact page:', err);
        setPageError('Unable to load contact information. Please try again later.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setStatus(s => ({ ...s, success: false })), 6000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
          <p className="font-medium text-gray-500">
            Loading contact information...
          </p>
        </div>
      </div>
    );
  }

  if (pageError || !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center p-8 max-w-md">
          <AlertCircle size={64} className="mx-auto mb-4 text-accent" />
          <p className="text-xl font-medium text-gray-900">
            {pageError || 'Content not available'}
          </p>
        </div>
      </div>
    );
  }

  // Destructure dynamic content with fallbacks
  const title = pageData.contact_title || "Let's Start a Conversation";
  const description = pageData.contact_description || "Have a question? Our team is here to help.";
  const phone = pageData.contact_phone || pageData.support_number || "+91 00000 00000";
  const email = pageData.contact_email || pageData.support_email || "contact@example.com";
  const address = pageData.contact_address || pageData.address || "Please update address in settings";
  const mapImage = pageData.contact_map_image;
  const fullMapImageUrl = mapImage ? (mapImage.startsWith('http') ? mapImage : `${baseUrl}${mapImage}`) : null;
  const mapIframe = pageData.map_iframe;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-accent py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full backdrop-blur-sm bg-white/10 text-primary-light">
            Reach Out to Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
            {title}
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-white/90 whitespace-pre-line">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: CONTACT INFO CARDS */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl shadow-xl bg-white border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                <span className="w-1.5 h-6 rounded-full bg-primary"></span>
                Contact Details
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 transition-colors duration-300">
                    <Phone size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Phone
                    </p>
                    <p className="font-semibold text-gray-900">{phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 transition-colors duration-300">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 transition-colors duration-300 shrink-0">
                    <MapPin size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Location
                    </p>
                    <p className="font-semibold leading-tight whitespace-pre-line text-gray-900">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl shadow-xl relative overflow-hidden group text-white bg-gradient-to-br from-primary to-primary-dark"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Business Hours</h3>
              <ul className="space-y-3 relative z-10 text-sm">
                <li className="flex justify-between">
                  <span className="text-white/90">Mon - Sat</span>
                  <span className="font-medium text-white">9:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/90">Sunday</span>
                  <span className="font-medium text-white">Closed</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-primary-light" />
                  <p className="text-xs text-white/90">
                    Response time: Within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 bg-white">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">
                Send Message
              </h2>
              <p className="mb-10 text-gray-500">
                Fill out the form below and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 text-gray-500">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-5 py-4 border border-gray-200 bg-gray-50 rounded-2xl outline-none transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 text-gray-500">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full px-5 py-4 border border-gray-200 bg-gray-50 rounded-2xl outline-none transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 text-gray-500">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full px-5 py-4 border border-gray-200 bg-gray-50 rounded-2xl outline-none transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 text-gray-500">Your Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you today?"
                    className="w-full px-5 py-4 border border-gray-200 bg-gray-50 rounded-2xl outline-none transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 bg-primary text-white disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {status.success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 mt-4 rounded-2xl flex items-center gap-3 font-medium border border-primary/20 bg-primary/5 text-primary">
                        <CheckCircle size={20} />
                        Your message has been received! We'll contact you soon.
                      </div>
                    </motion.div>
                  )}

                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 mt-4 rounded-2xl flex items-center gap-3 font-medium border border-accent/20 bg-accent/5 text-accent">
                        <AlertCircle size={20} /> {status.error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: MAP / VISIT SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Visit Our Facility
            </h2>
            <div className="w-20 h-1.5 mx-auto mt-4 rounded-full bg-primary"></div>
          </div>

          <div className="grid md:grid-cols-2 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow border border-gray-100 bg-white overflow-hidden">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-4 text-gray-900">
                Headquarters
              </h4>
              <p className="leading-relaxed mb-8 text-gray-500">
                Check out our location directly on the map.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg h-fit bg-primary/5">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <p className="font-medium whitespace-pre-line text-gray-900">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-80 md:h-auto min-h-[300px] relative transition-all duration-500 w-full bg-gray-100 flex items-center justify-center">
              {mapIframe ? (
                <div 
                  className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                  dangerouslySetInnerHTML={{ __html: mapIframe }} 
                />
              ) : fullMapImageUrl ? (
                <img
                  src={fullMapImageUrl}
                  alt="Company location map"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="text-gray-400 p-8 text-center flex flex-col items-center gap-3">
                  <MapPin size={32} />
                  <span>Map goes here. <br/>Add Map Iframe or Image in Admin Settings.</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}