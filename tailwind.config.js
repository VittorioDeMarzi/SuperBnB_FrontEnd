/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocra: "#ba8a3b",
        background: "#ffe8ca",
        violet: "#5b43ba",
        dark_violet: "#402f82",
      },
    },
  },
  plugins: [daisyui],
};