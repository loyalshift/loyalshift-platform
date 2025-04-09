const defaultTheme = require('tailwindcss/defaultTheme'); 

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {

    extend: {
        fontFamily:{logo: ['Montserrat', 'sans-serif'],},
        colors: {
    "primary": {
        "main": "#4682B4",
        "dark": "#2A4F6E",
        "light": "#6BA4D4",
        "contrast": "#FFFFFF"
    },
    "secondary": {
        "main": "#008080",
        "dark": "#005A5A",
        "light": "#40A0A0"
    },
    "neutral": {
        "white": "#FFFFFF",
        "light": "#F8F9FA",
        "main": "#696969",
        "dark": "#343A40"
    },
    "status": {
        "success": "#17A2B8",
        "warning": "#FFC107",
        "error": "#DC3545",
        "info": "#17A2B8"
    }
},
        animation: {},
        screens: {}
    }
    },
    plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
    corePlugins: {}
    }
