/** @type {import('tailwindcss').Config} */
module.exports = {
  //content vc sinaliza onde os estão os arquivos que terão estilização usando tailwind
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#09090A",
      },
      gridTemplateRows: {
        7: "repeat(7,minmax(0,1fr))",
      },
    },
  },
  plugins: [],
}
