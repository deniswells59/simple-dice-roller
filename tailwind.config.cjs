/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Roboto Mono'],
    },
    colors: {
      black: '#000',
      white: '#fff',
      page: '#f4f4f0',
    },
  },
  plugins: [],
};
