/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241E3D",       // near-black indigo, headers/nav bg
        primary: {
          DEFAULT: "#4B3F8F", // logo purple
          dark: "#382E6C",
          light: "#6C5CB5",
        },
        gold: {
          DEFAULT: "#E8A33D", // logo sun-ray gold
          dark: "#C97F2C",
          light: "#F4C878",
        },
        cream: "#FBF6EC",     // warm background
        sand: "#F1E9D8",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Poppins'", "sans-serif"],
        brand: ["'Dancing Script'", "cursive"],
      },
      backgroundImage: {
        "sunburst": "radial-gradient(circle, rgba(232,163,61,0.18) 0%, rgba(232,163,61,0) 70%)",
      },
    },
  },
  plugins: [],
};
