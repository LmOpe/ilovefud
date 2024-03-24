/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oriental: ["Oriental", "sans-serif"],
        arvo: ["Arvo", "serif"]
      },
      colors: {
        primary: "#056557",
        light1: "#0DF4D2",
        light2: "#7AFFEB",
        light3: "#A8FDF0",
        secondary: "#650513 ",
        seclight1: "#F6314E",
        seclight2: "#F86379",
        seclight3: "#FF9CAA",
        grey: "#aaaaaa3b"
      },
      backgroundImage: {
        'header': "url('/recipe.jpg')",
      }
    },
  },
  plugins: [],
}