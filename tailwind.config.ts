import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        mango: {
          light: "#FFE082",
          DEFAULT: "#FFB74D",
          dark: "#FFA726",
          deep: "#E65100",
        },
        chocolate: {
          light: "#BCAAA4",
          DEFAULT: "#8D6E63",
          dark: "#5D4037",
          deep: "#3E2723",
        },
        pomegranate: {
          light: "#EF9A9A",
          DEFAULT: "#E57373",
          dark: "#C62828",
          deep: "#B71C1C",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
