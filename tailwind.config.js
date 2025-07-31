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
        'focus-purple': '#8B5FBF',    // Primary brand color - focus and intention
        'flock-coral': '#FF6B7A',     // Community warmth and connection
        'community-teal': '#4ECDC4',  // Growth and harmony
        'dopamine-yellow': '#FFD93D', // Celebration and achievement
        
        // ADHD-Friendly Color Variations
        'focus-purple-light': '#A67CD9',
        'focus-purple-dark': '#6B4B8F',
        'flock-coral-light': '#FF8A9A',
        'flock-coral-dark': '#E55A6A',
        'community-teal-light': '#6EDDD5',
        'community-teal-dark': '#3EB8B0',
        'dopamine-yellow-light': '#FFE55C',
        'dopamine-yellow-dark': '#E6C435',
      },
      fontFamily: {
        'adhd-friendly': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'celebration-burst': 'celebration-burst 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'progress-grow': 'progress-grow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
        'milestone-glow': 'milestone-glow 3s ease-in-out infinite',
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
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 95, 191, 0.3)',
        'celebration': '0 0 30px rgba(255, 217, 61, 0.5)',
      },
    },
  },
  plugins: [],
} 