/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "light-blue": "#03A9F4",
        "cyan": "#4DD0E1",
        "yellow": "#FFC107",
        "light-turquoise": "#E1F5FE",
        "text-black": "#212121",
      },
    },
  },
  plugins: [],
};
