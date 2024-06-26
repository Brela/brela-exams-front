/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './src/styles.nav.module.css', './tailwind.css'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'selector', // allows us to use 'dark:' prefix in our classes
};
