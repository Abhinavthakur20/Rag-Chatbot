/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0a",
        panel: "#111111",
        edge: "#232329",
        accent: "#8b5cf6",
        accentSoft: "#a78bfa"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(167, 139, 250, 0.18), 0 18px 60px rgba(139, 92, 246, 0.18)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        haze: "radial-gradient(circle at top, rgba(139, 92, 246, 0.22), transparent 42%), radial-gradient(circle at bottom right, rgba(76, 29, 149, 0.28), transparent 40%)"
      }
    }
  },
  plugins: []
};
