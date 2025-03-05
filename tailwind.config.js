/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    fontFamily: {
      arimo: ['Arimo', 'sans-serif'],
      bricolage: ['Bricolage Grotesque', 'sans-serif'],
    },
    extend: {
      colors: {
        'sky': '#38b6ff',
      }
    },
  }  
};
