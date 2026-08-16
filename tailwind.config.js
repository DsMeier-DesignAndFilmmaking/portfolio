/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'tiempos': ["'tiempos-headline-regular'", 'serif'],
        'sf-pro-display': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'sf-pro-text': ['SF Pro Text', 'system-ui', 'sans-serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'nav-bg': 'rgba(0, 0, 0, 0.8)',
        'nav-text': '#ffffff',
        'nav-text-hover': '#ffffff',
        // Infrastructure Sovereignty OS (Rock Creek) project accent.
        // Base = 600 (#B32025), the exact requested hex. Every other stop is a
        // linear RGB blend toward white (50–500) or black (700–900) of that
        // same base — a tonal ramp, not a set of unrelated reds. Scoped to this
        // project only; do not reuse `rockcreek` outside app/projects/rock-creek-os.
        rockcreek: {
          50: '#faf2f2',
          100: '#f6e4e5',
          200: '#ecc7c9',
          300: '#e1a6a8',
          400: '#d1797c',
          500: '#c24d51',
          600: '#b32025', // exact requested base accent
          700: '#8f1a1e',
          800: '#6f1417',
          900: '#510e11',
        },
      },
      backdropBlur: {
        'nav': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-shift': {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};