/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4A017",
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
