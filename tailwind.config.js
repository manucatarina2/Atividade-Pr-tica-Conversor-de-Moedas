/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7ff',
          100: '#b3ecff',
          200: '#80e0ff',
          300: '#4dd4ff',
          400: '#1ac8ff',
          500: '#0099cc',
          600: '#007799',
          700: '#005566',
          800: '#003d4d',
          900: '#0a192f',
          950: '#020c1b',
        },
        accent: {
          400: '#64ffda',
          500: '#38d9a9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
