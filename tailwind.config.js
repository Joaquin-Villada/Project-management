/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    backgroundImage: {
      "error-404": "url('../public/images/error404.jpg')",
      'code': "url('../public/images/codingcids.png')"
    },

    extend: {
      colors: {
        cidsBlue: "#0038b0",
      },
    },
  },
  plugins: [],
};
