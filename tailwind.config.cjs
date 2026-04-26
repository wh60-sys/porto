/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        unsia: {
          DEFAULT: "#0057A8",
          50: "#E6EFF8",
          100: "#C2D8EE",
          200: "#85B0DC",
          300: "#4889CB",
          400: "#1B6AB8",
          500: "#0057A8",
          600: "#004686",
          700: "#003566",
          800: "#002245",
          900: "#001124",
        },
        gold: {
          DEFAULT: "#C8960A",
          50: "#FBF3DD",
          100: "#F8E7B5",
          200: "#F1CD66",
          300: "#E5B528",
          400: "#C8960A",
          500: "#A47B08",
          600: "#7C5C06",
          700: "#553F04",
        },
        night: "#0A0E1A",
        ink: "#070914",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "hero-overlay":
          "linear-gradient(135deg, rgba(0,87,168,0.80), rgba(0,26,58,0.80))",
        "gold-gradient":
          "linear-gradient(135deg, #C8960A 0%, #F1CD66 50%, #C8960A 100%)",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(0,87,168,0.55)",
        gold: "0 10px 40px -10px rgba(200,150,10,0.55)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
