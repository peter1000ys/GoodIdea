/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayCustom: {
          100: "#999999", // 8%
          200: "#717171", // 32%
          300: "#666666", // 53%
          400: "#333333", // 83%
        },
      },
    },
  },
  plugins: [],
};
