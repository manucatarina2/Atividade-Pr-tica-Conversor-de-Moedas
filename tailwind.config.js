/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#89CFF0',
        'baby-blue-light': '#A8E4FF',
        'baby-blue-dark': '#5BA3D0',
        'baby-blue-soft': '#D4F1FF',
      },
    },
  },
  plugins: [],
};
