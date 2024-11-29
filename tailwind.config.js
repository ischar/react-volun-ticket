/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      width: {
        "24/25": "96%",
        "calc-100-minus-20": "calc(100vh - 80px)",
      },
      height: {
        "calc-100-minus-20": "calc(100vh - 80px)",
      },
      colors: {
        light: {
          primary: "#ebedef",
          card: "#ffffff",
          primaryText: "#343434",
          menuText: "#8e8e93",
          subText: "#3f3f46",
          activeMenu: "#ffb4b0",
          colorCard: "#f6bdbc",
          border: "#746d74",
          input: "#f5f5f5",
          placeholderText: "#6b7280",
        },
        dark: {
          primary: "#1e1e1e",
          card: "#2c2c2e",
          primaryText: "#e4e4e7",
          menuText: "#a1a1aa",
          subText: "#d4d4d8",
          activeMenu: "#ffb4b0",
          colorCard: "#663f3f",
          border: "#4a4a4a",
          input: "#3A3A3C",
          placeholderText: "#d1d5db",
        },
      },
    },
  },
  plugins: [],
};
