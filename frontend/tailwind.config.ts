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
        background: "#100c0c",
        foreground: "var(--foreground)",
        iconblue: "#1d95e5",
        iconpink: "#fa1b80",
        icongreen: "#00b77b"
      },
    },
  },
  plugins: [],
} satisfies Config;
