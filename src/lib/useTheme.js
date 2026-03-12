import { useEffect, useState } from 'react';
import api from './api';

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

export const useTheme = () => {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await api.get('/config/theme');
        if (res.data && res.data.success && res.data.data) {
          const colors = res.data.data;
          Object.entries(colors).forEach(([key, value]) => {
            if (value && typeof value === 'string' && value.startsWith('#')) {
              // Convert camelCase to kebab-case
              let cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
              
              // Remove '-color' suffix if it exists
              cssVarName = cssVarName.replace('-color', '');
              
              // Ensure it starts with --
              const cssVar = cssVarName.startsWith('--') ? cssVarName : `--${cssVarName}`;
              
              document.documentElement.style.setProperty(cssVar, value);
              
              // Also map some common legacy/alternative names just in case
              if (cssVar === '--primary') {
                document.documentElement.style.setProperty('--primary-color', value);
              }
            }
          });
        }
      } catch (err) {
        console.error('Failed to load theme:', err);
        // Fallback to defaults already in index.css
      } finally {
        setThemeLoaded(true);
      }
    };

    fetchTheme();
  }, []);

  return themeLoaded;
};
