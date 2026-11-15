/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D253F',      // Dark Navy
        secondary: '#1D3A5F',    // Lighter Navy
        accent: '#00FF87',       // Digital Green
        'dark-bg': '#0A192F',    // Deep Navy
        'card-bg': '#172A45',    // Card Background
        'logo-cyan': '#30D5C8',
        'text-main': '#CCD6F6',  // Light Slate
        'text-secondary': '#8892B0', // Slate
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        'steam': 'steam 20s linear infinite',
      },
      keyframes: {
        steam: {
          '0%': { backgroundPosition: '0 0' },
          '50%': { backgroundPosition: '400% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
    },
  },
  plugins: [],
};
