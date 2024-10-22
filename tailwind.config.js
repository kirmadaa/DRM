/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'star-one': "url('/assets/images/Star 1.png')",
      },
      colors: {
        primary: "#191242",  //changed to navy
        secondary: '#FEE500',
        textpara: '#626263',
        btnColorPrimary: "#191242", //changed to navy
        hoverColorPrimary: "#E7F2FF",
        navy: "#191242",
        grey: "#c0c0c0",
        lightgrey: "#f4f4f4",
      }
    }
  },
  plugins: [],
}