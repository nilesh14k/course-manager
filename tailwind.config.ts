import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#000000",
        beige: "#F5F5DC",
        red: "#FF5733",
        white: "#FFFFFF",
        green: "#008000",
        yellow: "#FFFF00",
      },
    },
  },
  plugins: [],
} satisfies Config;
