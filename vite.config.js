// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(),react()],
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Import tailwindcss
import autoprefixer from 'autoprefixer'; // Import autoprefixer

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Use tailwindcss as a PostCSS plugin
        autoprefixer(), // Use autoprefixer as a PostCSS plugin
      ],
    },
  },
  optimizeDeps: {
    exclude: ['src/data/bangladeshGeocode.js'], // Keep this exclusion for now
  },
});
