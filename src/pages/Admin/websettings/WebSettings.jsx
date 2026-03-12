// src/pages/admin/WebSettings.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Palette, Database, Smartphone, ChevronRight } from 'lucide-react';

export default function WebSettings() {
  const cards = [
    {
      title: 'General Settings',
      description: 'Site title, support info, logo, favicon, meta tags, developer mode',
      icon: Settings,
      path: '/admin/web-settings/general',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    },
    {
      title: 'Themes',
      description: 'Primary/secondary colors, font styles, classic theme presets',
      icon: Palette,
      path: '/admin/web-settings/themes',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    },
    {
      title: 'Firebase',
      description: 'Authentication, analytics, cloud messaging, storage configuration',
      icon: Database,
      path: '/admin/web-settings/firebase',
      color: 'bg-amber-50 text-amber-600 hover:bg-amber-100',
    },
    {
      title: 'App & Social Links',
      description: 'App download section, Play Store/App Store URLs, social media links',
      icon: Smartphone,
      path: '/admin/web-settings/app-social',
      color: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Web Settings</h1>
          <p className="text-gray-600">
            Configure your website's core appearance, behavior, and integrations
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/admin" className="hover:text-purple-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Web Settings</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className={`
                group bg-white rounded-2xl shadow-sm border border-gray-200 
                p-6 transition-all duration-300 hover:shadow-md hover:border-purple-200
                hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500
              `}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${card.color}`}>
                <card.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {card.description}
              </p>
              <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium text-purple-600 mr-2">Configure</span>
                <ChevronRight size={18} className="text-purple-600" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          All changes are applied instantly • Some settings may require page refresh
        </div>
      </div>
    </div>
  );
}