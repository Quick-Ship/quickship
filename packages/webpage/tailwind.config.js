/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "image-in-y": {
          "0%": { opacity: 0, transform: "translatex(-130px)" },
          "100%": { opacy: 1, transform: "translatex(2px)" },
        },
        "fade-in-y": {
          "0%": {
            opacity: 0,
            transform: "skew(-7deg) skew(-7deg) skew(-7deg) translatex(-130px)",
          },
          "100%": {
            opacy: 1,
            transform: "skew(-7deg) skew(-7deg) skew(-7deg) translatex(2px)",
          },
        },
        "paralelograma-y": {
          "0%": {
            opacity: 0,
            transform: "skew(-8deg) skew(-8deg) skew(-8deg) translatex(-130px)",
          },
          "100%": {
            opacity: 1,
            transform: "skew(-8deg) skew(-8deg) skew(-8deg) translatex(2px)",
          },
        },
      },
      animation: {
        "fade-in-y": "fade-in-y 2s linear",
        "paralelograma-y": "paralelograma-y 2s linear",
        "image-in-y": "image-in-y 2s linear",
      },
    },
  },
  plugins: [],
};
