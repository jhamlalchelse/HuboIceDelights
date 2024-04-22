/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode:"class",
  theme: {
    extend: {
      fontSize: {
        xs: '.75rem', // 12px
        sm: '.875rem', // 14px
        tiny: '1rem', // 16px (default)
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        // You can also add custom sizes
        logo: '30px',
        'lead-num': '64px',
        'custom-size': '2.5rem', // Example of a custom size
      },
      backgroundColor: {
        'pastel-blue': '#a7c5eb',
        'pastel-purple': '#c4a1e1',
        'pastel-green': '#a1e1bf',
        'pale-cornflower-plue': '#aec6db',
        'pale-blue-gray': '#B3C6D3',
        'taupe-gray': '#837979',
        'forest-green': '#416346',
        'copper-red': '#CC6A4A',
        peach: '#F5CC8A',
        gold: '#E0AB43',
        'deep-teal': '#0C2E37',
        'light-gray-blue': '#CCD9E2',
        'coffee-brown': '#29241B',
        // Add more pastel colors as needed
      },
      textColor: {
        gold: '#E0AB43',
        'copper-red': '#CC6A4A',
        'mint-green': '#8DE29A',
      },
      borderColor: {
        gold: '#E0AB43',
        'copper-red': '#CC6A4A',
        'mint-green': '#8DE29A',
        'coffee-brown': '#29241B',
      },
    },
  },
  plugins: [],
};
