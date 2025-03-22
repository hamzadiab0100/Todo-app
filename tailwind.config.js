/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        honeycomb: "honeycomb 2.1s infinite backwards",
      },
      keyframes: {
        honeycomb: {
          "0%, 20%, 80%, 100%": { opacity: "0", transform: "scale(0)" },
          "30%, 70%": { opacity: "1", transform: "scale(1)" },
        },
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sl: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xl2: "1536px",
      },
    },
  },
  plugins: [],
};
