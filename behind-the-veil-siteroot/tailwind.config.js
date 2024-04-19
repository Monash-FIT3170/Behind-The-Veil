/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", "./client/*.html"],
  theme: {
    extend: {
      colors: {
        "our-black": "#282828",
        "dark-grey": "#757575",
        "light-grey": "#D4D4D4",
        "main-blue": "#BBCAFE",
        "main-blue-hover": "#818FF8",
        "secondary-purple": "#BBB4E8",
        "secondary-purple-hover": "#927ED4",
        "hyperlink-colour": "#875EB5",
        "anything-yellow": "#FFFDE7",
        "confirmed-colour": "#27AD6D",
        "pending-colour": "#4F76D9",
        "cancelled-colour": "#D33B3B",
        "background-gradient": "linear-gradient(#BBCAFE, #E5D6FF)",
        "bubble-gradient":
          "linear-gradient(#FFFFFF 4%, #FBFBFF 53%, #E6DFF3 100%)",
      },
    },
  },
  plugins: [],
};
