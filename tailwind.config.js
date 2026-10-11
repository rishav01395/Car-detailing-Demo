/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(199, 161, 93, 0.15)',
      },
      colors: {
        gold: '#C7A15D',
        'gold-soft': '#E7C98E',
      },
    },
  },
  plugins: [],
}

