export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#292e35",
        secondary: "#1e232a",
        danger: "#e74c3c",
        warning: "#f39c12",
        success: "#27ae60",
        text: "#333",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-no-scrollbar')
  ],
}