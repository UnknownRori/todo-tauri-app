const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      'sans': ['Averia Sans Libre', ...defaultTheme.fontFamily.sans]
    },
  },
  plugins: [],
}

