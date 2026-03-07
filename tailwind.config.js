/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        "primary-dark": "#6D28D9",
        "primary-light": "#EDE9FE",
        "primary-muted": "rgba(124, 58, 237, 0.08)",
        "primary-border": "rgba(124, 58, 237, 0.2)",
        "text-heading": "#111827",
        "text-body": "#374151",
        "text-muted": "#6B7280",
        "text-light": "#9CA3AF",
        edge: "#E5E7EB",
        "edge-light": "#F3F4F6",
        surface: "#F9FAFB",
        success: "#10B981",
        danger: "#EF4444",
        pink: "#EC4899",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};
