/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "slate": {
          800: "#121822",
          900: "#090e1a",
          950: "#04060e"
        }
      },
    },
  },
  plugins: [],
}