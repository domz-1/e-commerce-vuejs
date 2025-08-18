/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'young-night': '#232323',
        'white-smoke': '#f5f5f5',
        'main': '#800080',
        'white': '#ffffff'
      }
    },
  },
  plugins: [],
}