// src/pages/admin/ThemeColors.jsx
import { useState, useEffect } from 'react';
import { Save, RotateCcw, Palette, Eye, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import api from '../../lib/api';

const defaultColors = {
  primaryColor: '#7c3aed',
  primaryDark: '#5b21b6',
  primaryLight: '#a78bfa',
  secondaryColor: '#10b981',
  accentColor: '#ec4899',
  backgroundColor: '#ffffff',
  surfaceColor: '#f9fafb',
  textPrimary: '#111827',
  textSecondary: '#4b5563',
  grayLight: '#f3f4f6',
  grayMedium: '#9ca3af',
  grayDark: '#374151',
};

export default function ThemeColors() {
  const [colors, setColors] = useState(defaultColors);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Load saved theme colors from backend on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/theme');
        setColors(res.data || defaultColors);
      } catch (err) {
        console.error('Failed to load theme colors:', err);
        setColors(defaultColors);
      } finally {
        setLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Apply live preview when previewMode is on
  useEffect(() => {
    if (previewMode) {
      Object.entries(colors).forEach(([key, value]) => {
        const cssVarRaw = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        const cssVar = `--${cssVarRaw.replace('-color', '')}`;
        document.documentElement.style.setProperty(cssVar, value);
      });
    }
  }, [colors, previewMode]);

  const handleColorChange = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value.toUpperCase() }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      await api.put('/admin/theme', colors);
      setMessage({
        type: 'success',
        text: 'Theme colors saved successfully! All users will now see the updated theme.'
      });

      // Disable preview after save (optional)
      setPreviewMode(false);
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Failed to save theme colors. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setColors(defaultColors);
    // Reset CSS variables
    Object.entries(defaultColors).forEach(([key, value]) => {
      const cssVarRaw = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const cssVar = `--${cssVarRaw.replace('-color', '')}`;
      document.documentElement.style.setProperty(cssVar, value);
    });
    setPreviewMode(false);
    setMessage(null);
  };

  const togglePreview = () => {
    setPreviewMode(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
          <p className="text-gray-600 font-medium">Loading theme settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Palette className="text-purple-600" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Theme Color Manager</h1>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={togglePreview}
              className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm ${
                previewMode
                  ? 'bg-purple-600 text-white shadow-purple-200'
                  : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Eye size={20} />
              {previewMode ? 'Live Preview Active' : 'Enable Live Preview'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`p-4 mb-8 rounded-xl flex items-center gap-3 border ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle size={24} className="text-green-600" />
            ) : (
              <AlertCircle size={24} className="text-red-600" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Color Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(colors).map(([key, value]) => (
              <div
                key={key}
                className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all group"
              >
                <label className="block text-sm font-medium text-gray-700 mb-3 capitalize group-hover:text-purple-700 transition">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>

                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-14 h-10 rounded-lg cursor-pointer border border-gray-300 shadow-sm"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    maxLength={7}
                  />
                </div>

                <div
                  className="mt-4 w-full h-12 rounded-lg shadow-inner border border-gray-200 transition-all"
                  style={{ backgroundColor: value }}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-wrap gap-4 justify-end">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium flex items-center gap-2 transition"
            >
              <RotateCcw size={18} />
              Reset to Default
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition shadow-md ${
                saving
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save & Apply Globally
                </>
              )}
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500 text-center md:text-right">
            Preview mode shows changes instantly only to you.  
            Click "Save & Apply Globally" to make the new theme permanent for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}