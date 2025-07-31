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
        // Focus Flock Brand Colors
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
        
        // Supporting Colors
        'soft-lavender': '#E6D9F5',
        'warm-peach': '#FFF2F0',
        'mint-cream': '#F0FFFE',
        'sunshine': '#FFF8E1',
      },
      fontFamily: {
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'h1': ['clamp(1.75rem, 3vw, 2rem)', { lineHeight: '1.3' }],
        'h2': ['clamp(1.5rem, 2.5vw, 1.75rem)', { lineHeight: '1.4' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4' }],
      },
      animation: {
        'celebration-burst': 'celebration-burst 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'progress-grow': 'progress-grow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
        'milestone-glow': 'milestone-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gentle-pop': 'gentle-pop 0.3s ease-out',
      },
      keyframes: {
        'celebration-burst': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'progress-grow': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width, 100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 95, 191, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(139, 95, 191, 0.6)',
            transform: 'scale(1.05)'
          },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'milestone-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 217, 61, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 217, 61, 0.8)',
            transform: 'scale(1.1)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gentle-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
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
        'glow': '0 0 20px rgba(139, 95, 191, 0.3)',
        'celebration': '0 0 30px rgba(255, 217, 61, 0.5)',
        'soft': '0 4px 20px rgba(139, 95, 191, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 