module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Poppins", "sans-serif"],
        body: ["Roboto"],
      },
      flex: {
        7: "7",
        8: "8",
      },
      colors: {
        "p-black": {
          DEFAULT: "#29292E",
          light: "#7E7E86",
        },
        "p-shadow": {
          DEFAULT: "#050206",
        },
        "p-purple": {
          DEFAULT: "#835AFD",
          dark: "#6F4BD8",
        },
        "p-gradient": {
          DEFAULT: "var(--gradient)",
        },
        "p-danger": {
          DEFAULT: "#E73F5D",
          dark: "#D73754",
        },
        "p-gray": {
          "extra-light": "#CECECE",
          light: "#DBDCDD",
          DEFAULT: "#A8A8B3",
          dark: "#737380",
        },
        "p-white": {
          DEFAULT: "#F8F8F8",
          light: "#FEFEFE",
        },
        "p-pink": {
          light: "#D67EE2",
          dark: "#E559F9",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
