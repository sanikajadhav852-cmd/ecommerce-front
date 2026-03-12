import { useEffect, useState } from 'react';
import { 
  Mail, Phone, MapPin, Facebook, 
  Instagram, Twitter, ArrowRight, ShoppingBag, Youtube, Linkedin 
} from 'lucide-react';
import api from '../lib/api';

export function Footer() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await api.get('/config/site-content');
        setConfig(response.data.data || {});
        setLoading(false);
      } catch (err) {
        setError("Unable to load footer");
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  const year = new Date().getFullYear();

  if (loading || error) return <div className="bg-[#0f172a] py-10 text-center text-gray-500">...</div>;

  return (
    <footer className="relative bg-[#0f172a] text-white pt-20 pb-10 mt-auto overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {config.logo ? (
                <img 
                  src={config.logo} 
                  alt="Logo" 
                  className="h-10 w-auto object-contain bg-white/10 p-1 rounded-lg"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="bg-primary p-2 rounded-lg">
                  <ShoppingBag size={24} />
                </div>
              )}
              <h3 className="text-2xl font-bold tracking-tight">
                {config.site_title || 'MyStore'}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              {config.short_description || 'Elevating your lifestyle with premium quality products delivered to your doorstep.'}
            </p>
            <div className="flex gap-4">
              {config.facebook && <SocialIcon Icon={Facebook} url={config.facebook} />}
              {config.instagram && <SocialIcon Icon={Instagram} url={config.instagram} />}
              {config.twitter && <SocialIcon Icon={Twitter} url={config.twitter} />}
              {config.youtube && <SocialIcon Icon={Youtube} url={config.youtube} />}
              {config.linkedin && <SocialIcon Icon={Linkedin} url={config.linkedin} />}
            </div>
          </div>

          {/* Dynamic Links Helper */}
          <FooterGroup title="Shop & Explore" links={config.quick_links || [
            { text: 'New Arrivals', url: '/products' },
            { text: 'Best Sellers', url: '/trending' },
            { text: 'Gift Cards', url: '/gifts' }
          ]} />

          <FooterGroup title="Customer Care" links={config.support_links || [
            { text: 'Track Order', url: '/orders' },
            { text: 'Privacy Policy', url: '/privacy' },
            { text: 'Terms of Service', url: '/terms' }
          ]} />

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4">
              <ContactItem Icon={MapPin} text={config.contact_address || config.address || 'Mumbai, MH'} />
              <ContactItem Icon={Mail} text={config.contact_email || config.support_email || 'hello@mystore.com'} />
              <ContactItem Icon={Phone} text={config.contact_phone || config.support_number || '+91 98765 43210'} />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            {config.copyright_details?.replace('{year}', year) || `© ${year} ${config.site_title || 'MyStore'}. All rights reserved.`}
          </p>
          <div className="flex gap-6 text-xs text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-primary-light transition-colors">Sitemap</a>
            <a href="#" className="hover:text-primary-light transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components for cleaner code
function FooterGroup({ title, links }) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url} className="text-gray-400 hover:text-primary-light flex items-center group transition-all duration-300">
              <ArrowRight size={14} className="mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all" />
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ Icon, text }) {
  return (
    <li className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors cursor-default">
      <Icon size={18} className="text-primary-light shrink-0 mt-1" />
      <span className="text-sm leading-relaxed">{text}</span>
    </li>
  );
}

function SocialIcon({ Icon, url }) {
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-primary hover:-translate-y-1 transition-all duration-300 border border-gray-700">
      <Icon size={18} />
    </a>
  );
}