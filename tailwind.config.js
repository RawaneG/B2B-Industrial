/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d92c3a',    // Safety red for call‑to‑action elements
        secondary: '#060010',  // Deep dark violet for backgrounds and contrast
        accent: '#f7a80d',     // Yellow/orange for safety accents
        neutral: '#f5f5f5',    // Light grey for subtle backgrounds
      },
    },
  },
  plugins: [],
};