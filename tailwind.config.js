/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "coin-front-front": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(3600deg)" },
        },
        "coin-front-back": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(3420deg)" },
        },
        "coin-back-front": {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(3600deg)" },
        },
        "coin-back-back": {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(3780deg)" },
        },
        "transform-x": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
