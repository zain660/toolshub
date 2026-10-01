import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090a0f",
        foreground: "#f8fafc",
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
          glow: "#ff6a00",
        },
        dark: {
          50: "#181a24",
          100: "#141620",
          200: "#10121b",
          300: "#0d0f17",
          400: "#090a0f",
          500: "#06070a",
          border: "#232738",
          borderSubtle: "#1c1f2e",
          card: "#11131d",
          cardHover: "#161927",
        }
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #ff7a18 0%, #af002d 100%)",
        "orange-subtle": "radial-gradient(ellipse at 50% -20%, rgba(249, 115, 22, 0.15), transparent 70%)",
        "card-gradient": "linear-gradient(180deg, rgba(24, 27, 40, 0.7) 0%, rgba(13, 15, 23, 0.9) 100%)",
        "glow-conic": "conic-gradient(from 180deg at 50% 50%, #f97316 0deg, #ea580c 180deg, #fb923c 360deg)",
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(249, 115, 22, 0.25)',
        'glow-md': '0 0 25px -2px rgba(249, 115, 22, 0.35)',
        'glow-lg': '0 0 50px -5px rgba(249, 115, 22, 0.4)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
