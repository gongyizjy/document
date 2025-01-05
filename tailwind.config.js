/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.{js,ts,jsx,tsx}','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blockquote': "#3d25141f",
        'blockquote-text': "#878685",
        'input-bg': "#f5f5f5",
        'highlight': "FAF594"
      },
      borderWidth: {
        2: '2px',
        3: '3px',
        4: '4px',
      }
    },
  },
  plugins: [],
}

