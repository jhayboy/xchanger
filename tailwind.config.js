/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', "sans-serif"],
      },  
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ],
}