/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ba658',
          light: '#c4d9b0',
          blue: '#0777da',
        },
        utility: '#a66f3f',
        post: '#8c5d42',
        warning: '#f28b50',
        danger: '#8c3e11',
        secondary: {
          DEFAULT: '#c4d9b0',
          text: '#333',
          fade: 'rgba(196, 217, 176, 0.3)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
