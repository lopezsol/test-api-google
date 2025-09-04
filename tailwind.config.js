// tailwind.config.js
const PrimeUI = require("tailwindcss-primeui");

module.exports = {
  content: [
    "./src/**/*.{html,ts}", // asegura que Tailwind escanee tus templates Angular
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0191C1",
        moby: "#00527F", 
        base: "#F5F5F5"

      },
    },
  },
  plugins: [],
};
