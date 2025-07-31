/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New Accessible Color Palette
        'soft-cream': '#F6F5F3',
        'muted-blue': {
          DEFAULT: '#A7C4D7',
          light: '#C4D7E8',
          dark: '#8BA8C0',
        },
        'soft-sage': {
          DEFAULT: '#C5D9C5',
          light: '#E2F0E2',
          dark: '#A8C3A8',
        },
        'soft-lavender': {
          DEFAULT: '#E4C1F9',
          light: '#F2E4FC',
          dark: '#D4A8F0',
        },
        'soft-coral': {
          DEFAULT: '#FFADAD',
          light: '#FFCCCC',
          dark: '#FF9999',
        },
        'charcoal': '#333333',
        
        // Legacy brand colors for gradual transition
        'focus-purple': {
          DEFAULT: '#8B5FBF',
          light: '#A67CD9',
          dark: '#6B4B8F',
        },
        'flock-coral': {
          DEFAULT: '#FF6B7A',
          light: '#FF8A9A',
          dark: '#E55A6A',
        },
        'community-teal': {
          DEFAULT: '#4ECDC4',
          light: '#6EDDD5',
          dark: '#3EB8B0',
        },
        'dopamine-yellow': {
          DEFAULT: '#FFD93D',
          light: '#FFE55C',
          dark: '#E6C435',
        },
        
        // Semantic colors
        'text': {
          primary: '#333333',
          secondary: '#555555',
          tertiary: '#777777',
          muted: '#999999',
          inverse: '#FFFFFF',
        },
        'bg': {
          primary: '#F6F5F3',
          secondary: '#FFFFFF',
          tertiary: '#EEEEEE',
        },
        'border': {
          subtle: '#E0E0E0',
          default: '#CCCCCC',
          emphasis: '#999999',
        },
      },
      fontFamily: {
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'h1': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '1.2' }],
        'h2': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3' }],
        'h3': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.4' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['1rem', { lineHeight: '1.5' }],
        'tiny': ['0.875rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(167, 196, 215, 0.3)',
        'glow': '0 0 20px rgba(167, 196, 215, 0.4)',
        'soft': '0 1px 3px 0 rgba(51, 51, 51, 0.1)',
      },
      animation: {
        'gentle-fade-in': 'gentle-fade-in 0.4s ease-out',
        'gentle-pop': 'gentle-pop 0.3s ease-out',
        'soft-pulse': 'soft-pulse 2s ease-in-out infinite',
        'progress-grow': 'progress-grow 1s ease-out',
      },
      keyframes: {
        'gentle-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gentle-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.01)' },
        },
        'progress-grow': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width, 100%)' },
        },
      },
    },
  },
  plugins: [],
}