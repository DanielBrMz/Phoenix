// tailwind.config.js
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#f5f5dc', // tu color personalizado
      },
      // cualquier otra personalización puede ir aquí
      spacing: {
        '0': '0',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')], // tu plugin
  variants: {
    extend: {},
  },
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['mapboxgl-popup-content'],
    },
  },
} satisfies Config;
