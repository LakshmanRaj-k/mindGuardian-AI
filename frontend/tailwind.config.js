/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#090d16',
          900: '#0f172a',
          850: '#131e36',
          800: '#1e293b',
          700: '#334155'
        },
        brand: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          indigo: '#6366f1',
          purple: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
