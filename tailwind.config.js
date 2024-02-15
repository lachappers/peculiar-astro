const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#e8e8fb",
          200: "#a1a3fe",
          300: "#575bfe",
          400: "#5053be",
          500: "#363881",
          600: "#1d1e54",
        },
        secondary: {
          50: "#fdf9f7",
          100: "#fde4d8",
          200: "#ffccb2",
          300: "#ff9f70",
          400: "#ce7d55",
          500: "#9f6e56",
          600: "#6d5d54",
        },
      },
      boxShadow: {
        postMod:
          "0.0625rem 0.0625rem 0 var(--background), 0.5rem 0.5rem 0 var(--font-color)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: ["class", ".darkmode"],
};
