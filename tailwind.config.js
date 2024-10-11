/** @type {import('tailwindcss').Config} */
import { screens } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      title: ["PermanentMarker", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "480px",
        ...screens,
      },
    },
  },
  plugins: [],
};
