/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This tells Tailwind where to look for class names
  ],
  darkMode: ['class', '.theme-dark'], // If using class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};


