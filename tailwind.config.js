import { heroui } from "@heroui/theme"
import plugin from "tailwindcss/plugin"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        success: "#11C4A4",
        primary: "#5796C2",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    plugin(({ addComponents }) => {
      addComponents({
        ".icon-xs": {
          width: "0.75rem", // w-3
          height: "0.75rem", // h-3
        },
        ".icon-sm": {
          width: "0.875rem", // w-3.5
          height: "0.875rem", // h-3.5
        },
        ".icon": {
          width: "1rem", // w-4
          height: "1rem", // h-4
        },
        ".icon-lg": {
          width: "3rem",
          height: "3rem",
        },
        // ".bg-hero": {
        //   backgroundImage: "url(/cover-green.jpg)",
        //   backgroundPosition: "center center",
        //   backgroundRepeat: "repeat-x",
        //   backgroundSize: "cover",
        // },
        // ".bg-hero-blue": {
        //   backgroundImage: "url(/cover-blue.jpg)",
        //   backgroundPosition: "center center",
        //   backgroundRepeat: "repeat-x",
        //   backgroundSize: "cover",
        // },
      })
    }),
  ],
}

module.exports = config
