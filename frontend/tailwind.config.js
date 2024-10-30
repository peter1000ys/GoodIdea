/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        tinDownIn: {
          "0%": {
            opacity: "0",
            transform: "scale(1) translateY(900%)",
          },
          "50%, 60%, 70%, 80%, 90%, 100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
      },
      animation: {
        tinDownIn: "tinDownIn 1s ease-out",
      },
    },
  },
  plugins: [],
};
