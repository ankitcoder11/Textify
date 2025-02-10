/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: ["\"Fira Sans Condensed\", serif"],
        buttonFont: ["\"Comfortaa\", serif"],
      },
      colors: {
        textColour: '#bac095',
        bgColour: '#3d4127',
        buttonColour: '#d4de95',
        buttonHoverColour: '#636b2f',
      },
    },
  },
  plugins: [],
}