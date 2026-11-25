/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          title: '#120B8F',
          primary: '#5087F7',
          secondary: '#8BCFF1',
          border: '#BDC7D7',
          bg: '#F8FAFC',
          alertBg: '#FEF3C7',
          alertBorder: '#F59E0B',
          alertText: '#F59E0B',
          success: '#10B981',
        }
      }
    },
  },
  plugins: [],
}
