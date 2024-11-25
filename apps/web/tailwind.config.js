const base = 20
const fontSize = Object.entries({
  text: [16],
  button: [24],
  "title-3": [30, 35],
  "subtitle-3": [40, 40],
  subtitle: [60, 60],
  "subtitle-2": [85, 120],
  "title-2": [110, 100],
}).reduce(
  (acc, [key, [size, lHeight]]) => ({
    ...acc,
    [key]: [`${size / base}rem`, lHeight ? `${lHeight / base}rem` : "1.42"],
  }),
  {
    xs: 14,
  },
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: ".5rem",
          xs: ".5rem",
          sm: ".5rem",
          md: "1rem",
          lg: "0.5rem",
        },
        screens: {
          DEFAULT: "1190px",
        },
      },
      fontSize,
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        yellow: "var(--yellow)",
        red: "var(--red)",
        brand: {
          dark: "var(--brand-dark)",
          DEFAULT: "var(--brand)",
          light: "var(--brand-light)",
          ultralight: "var(--brand-ultralight)",
          "light-bg": "var(--brand-light-bg)",
        },
      },
    },
    keyframes: {
      "collapsible-down": {
        from: { height: "0" },
        to: { height: "var(--radix-collapsible-content-height)" },
      },
      "collapsible-up": {
        from: { height: "var(--radix-collapsible-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "collapsible-down": "collapsible-down 0.2s ease-out",
      "collapsible-up": "collapsible-up 0.2s ease-out",
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".h-fillscreen": {
          height: "calc(100vh - var(--header-height))",
        },
        ".min-h-fillscreen": {
          minHeight: "calc(100vh - var(--header-height))",
        },
        ".max-h-fillscreen": {
          maxHeight: "calc(100vh - var(--header-height))",
        },
      })
    },
  ],
}
