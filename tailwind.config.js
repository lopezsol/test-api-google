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
        mobyhover: "#004466",
        base: "#F5F5F5",
        secondary: "#F4D3F9",
      },
    },
  },
  plugins: [],
};
