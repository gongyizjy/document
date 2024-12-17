/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.{js,ts,jsx,tsx}','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blockquote': "#3d25141f",
        'blockquote-text': "#878685",
      },
      borderWidth: {
        3: '3px',
        4: '4px',
      }
    },
  },
  plugins: [],
}

