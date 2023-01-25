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
        appearModal: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0.7',
          },
        },
        moveInFromRight: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
      },
      animation: {
        appear: 'appear .2s linear',
        appearModal: 'appearModal .2s linear',
        moveInFromRight: 'moveInFromRight 1s linear',
      },
    },
    fontFamily: {
      sans: ['Roboto Mono'],
    },
    colors: {
      black: '#172026',
      white: '#fff',
      page: '#f4f4f0',
    },
  },
  plugins: [],
};
