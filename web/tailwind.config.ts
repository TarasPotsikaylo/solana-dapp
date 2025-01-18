import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "white",
        foreground: "var(--foreground)",
        "black-200": "#333333",
        "white-100": "#f8f9fa",
      },
    },
  },
  plugins: [],
} satisfies Config;
