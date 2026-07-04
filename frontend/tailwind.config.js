/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#374151', // text-gray-700 equivalent
        secondary: '#f3f4f6', // bg-gray-100 equivalent
        border: '#d1d5db', // border-gray-300 equivalent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Demonstrating custom font setup
      }
    },
  },
  plugins: [],
}
