import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        "cc-bg":      "var(--cc-bg)",
        "cc-surface": "var(--cc-surface)",
        "cc-border":  "var(--cc-border)",
        "cc-text":    "var(--cc-text)",
        "cc-muted":   "var(--cc-muted)",
        "cc-subtle":  "var(--cc-subtle)",
        "cc-chrome":  "var(--cc-chrome)",
      },
    },
  },
  plugins: [],
};
export default config;
