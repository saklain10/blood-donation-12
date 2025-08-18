// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Ensure daisyui is correctly required here
    // If you are using ES Modules for config, it should be like this:
    // import daisyui from 'daisyui';
    // plugins: [daisyui],
    // But typically, for CommonJS style in config, it's `require`:
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "dracula"], // Or your preferred themes
  },
};
