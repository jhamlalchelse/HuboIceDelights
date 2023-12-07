/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'pastel-blue': '#a7c5eb',
        'pastel-purple': '#c4a1e1',
        'pastel-green': '#a1e1bf',
        // Add more pastel colors as needed
      },
    },
  },
  plugins: [],
};
