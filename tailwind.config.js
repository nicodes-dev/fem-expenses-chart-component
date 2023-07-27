/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        grow: 'grow 2s linear forwards',
      },
      keyframes: {
        grow: {
          '0%': {
            'max-height': '0px',
          },
          '100%': {
            'max-height': '300px',
          },
        },
      },
      screens: {
        sm: '510px',
        md: '900px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        'min-screen': {
          raw: '(min-width: 700px) and (min-height: 780px)',
        },
      },
      colors: {
        'neutral-100': '#fffbf6',
        'neutral-300': '#f8e9dd',
        'accent-cyan': '#76b5bc',
        'primary-500': '#ec755d',
        'primary-800': '#382314',
        'primary-100': '#92857a',
      },
    },
  },
  plugins: [],
}
