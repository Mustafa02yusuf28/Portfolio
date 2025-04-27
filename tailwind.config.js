/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        dark: {
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
        },
      },
      backgroundColor: {
        'black': '#000000',
        'card': 'rgba(17, 24, 39, 0.7)',
      },
      textColor: {
        'default': '#F3F4F6',
        'muted': '#9CA3AF',
      },
    },
  },
  plugins: [],
} 