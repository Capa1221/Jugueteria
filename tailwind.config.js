// tailwind.config.js
module.exports = {
  content: [
    "./index.html",  // Verifica que tu archivo HTML esté en la raíz
    "./src/**/*.{js,ts,jsx,tsx}",  // Esto incluye todos los archivos JSX/TSX de tu carpeta src
    "./node_modules/@nextui-org/react/**/*.{js,ts,jsx,tsx}",  // Incluir NextUI si lo usas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
