/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        athiti: ['Athiti', 'sans-serif'],
      },
    },
  },
  plugins: [],
}