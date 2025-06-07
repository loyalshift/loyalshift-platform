const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { logo: ["Montserrat", "sans-serif"] },
      colors: {
               'smb-primary-green': '#baffa7',
        'smb-off-white': '#FAF9F6',
        'smb-light-gray': '#d4d2cb',
        // You might want to define specific dark neutrals if not using Tailwind's defaults
        'smb-dark-1': '#333333', // Example dark text/bg
        'smb-dark-2': '#2C2C2C', // Example darker bg
        "equilibra-peach": "#FDB386",
        "equilibra-blush": "#F7C6B7",
        "equilibra-cream": "#FFF7F2",
        "equilibra-warm-gray": "#5C5C5C",
        "equilibra-coral": "#E86F51",
        "equilibra-taupe": "#A89C94",
        primary: {
          main: "#4682B4",
          dark: "#2A4F6E",
          light: "#6BA4D4",
          contrast: "#FFFFFF",
        },
        secondary: {
          main: "#008080",
          dark: "#005A5A",
          light: "#40A0A0",
        },
        neutral: {
          white: "#FFFFFF",
          light: "#F8F9FA",
          main: "#696969",
          dark: "#343A40",
        },
        status: {
          success: "#17A2B8",
          warning: "#FFC107",
          error: "#DC3545",
          info: "#17A2B8",
        },
      },
      animation: {},
      screens: {},
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-filters"),
  ],
  corePlugins: {},
};
