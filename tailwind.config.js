/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    fontFamily: {
      alpina: ["var(--font-alpina)"],
      america: ["var(--font-america)"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#414D35",
        secondary: "#5A3A1E",
        accent: "#F3F4F1",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        text: "slideUp 1s",
        textRight: "slideRight 1s ease infinite",
        opacity: "opacity 2s",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
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
        slideDownAndFade: {
          from: {opacity: 0, transform: "translateY(-2px)"},
          to: {opacity: 1, transform: "translateY(0)"},
        },
        slideLeftAndFade: {
          from: {opacity: 0, transform: "translateX(2px)"},
          to: {opacity: 1, transform: "translateX(0)"},
        },
        slideUpAndFade: {
          from: {opacity: 0, transform: "translateY(2px)"},
          to: {opacity: 1, transform: "translateY(0)"},
        },
        slideRightAndFade: {
          from: {opacity: 0, transform: "translateX(-2px)"},
          to: {opacity: 1, transform: "translateX(0)"},

          "accordion-down": {
            from: {height: 0},
            to: {height: "var(--radix-accordion-content-height)"},
          },
          "accordion-up": {
            from: {height: "var(--radix-accordion-content-height)"},
            to: {height: 0},
          },
        },
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}