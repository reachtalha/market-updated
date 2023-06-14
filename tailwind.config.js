/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      alpina: ["var(--font-alpina)"],
      america: ["var(--font-america)"],
    },
    extend: {
      colors: {
        primary: "#414D35",
        secondary: "#5A3A1E",
        accent: "#F3F4F1",
      },
      animation: {
        text: "slideUp 1s",
        textRight: "slideRight 1s ease infinite",
        opacity: "opacity 2s",
      },
      keyframes: {
        slideUp: {
          from: {
            transform: "translate3d(0px, 20px, 0)",
          },
          to: {
            transform: "translate3d(0px, 0px, 0)",
          },
        },
        slideRight: {
          from: {
            transform: "translate3d(0px, 0px, 0)",
          },
          to: {
            transform: "translate3d(20px, 0px, 0)",
          },
        },
        opacity: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
