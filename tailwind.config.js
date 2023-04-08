/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      fontFamily: {
        Cardo: ["Cardo", "serif"],
        Oswald: ["Oswald", "sans-serif"],
      },

      backgroundImage: (theme) => ({
        grad: "linear-gradient(25deg, rgba(231,235,239,1) 0%, rgba(183,226,247,1) 100%)",
        text: "radial-gradient(circle, rgba(168,251,1,1) 0%, rgba(183,226,247,1) 100%)",
        "sm-text":
          "radial-gradient(circle, rgba(168,251,1,1) 0%, rgba(22,196,67,1) 100%)",
      }),

      colors: {
        "light-purple": "#bdadfc",
        cblue: "#181d38",
        cpurple: "#7664ff",
        "dark-purple": "#77298c",
        cpink: "#f1ccfa",
        "light-gray": "#eaebf5",
        "dark-gray": "#a2a2c3",
        black: "#000000",
        white: "#FFFFFF",

        hover: "#152848 ",
        brown: "#9B6143 ",
      },
    },
    screens: {
      xl: { max: "1500px" },
      lg: { max: "1124px" },
      md: { max: "768px" },
      sm: { max: "550px" },
      ss: { max: "450px" },
      xs: { max: "375px" },
    },
  },
  plugins: [],
};
