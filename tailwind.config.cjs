/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        appear: 'appear .2s linear',
      },
    },
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
