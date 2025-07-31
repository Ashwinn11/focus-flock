import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';

interface ThemeToggleProps {
  className?: string;
}

type Theme = 'light' | 'dark' | 'auto';

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const themeOptions = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'auto', icon: '🔄', label: 'Auto' },
  ];

  if (!mounted) return null;

  return (
    <div className={clsx('flex items-center bg-bg-tertiary rounded-md p-0.5', className)}>
      {themeOptions.map((option) => (
        <motion.button
          key={option.value}
          onClick={() => handleThemeChange(option.value as Theme)}
          className={clsx(
            'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 text-xs',
            theme === option.value
              ? 'bg-bg-secondary text-text-primary shadow-sm border border-border-subtle'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${option.label} theme`}
          title={option.label}
        >
          <span className="text-xs">{option.icon}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeToggle;