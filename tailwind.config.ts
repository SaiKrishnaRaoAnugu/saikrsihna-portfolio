import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.6s ease-in forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-down": "slideDown 0.6s ease-out forwards",
        "slide-left": "slideLeft 0.8s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
        "text-shimmer": "textShimmer 2s infinite",
        "gradient-shift": "gradientShift 3s ease infinite",
        "scale-in": "scaleIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { translate: "0 40px", opacity: "0" },
          "100%": { translate: "0 0", opacity: "1" },
        },
        slideDown: {
          "0%": { translate: "0 -20px", opacity: "0" },
          "100%": { translate: "0 0", opacity: "1" },
        },
        slideLeft: {
          "0%": { translate: "40px 0", opacity: "0" },
          "100%": { translate: "0 0", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(239, 68, 68, 0.6)",
          },
        },
        float: {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -20px" },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        bounceSlow: {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -10px" },
        },
        textShimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        gradientShift: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        scaleIn: {
          "0%": { scale: "0.8", opacity: "0" },
          "100%": { scale: "1", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
