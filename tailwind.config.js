/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'aside-bg-color': '#f5f6f7',
        'aside-border-color': '#1F23290A',
        'menu-item-bg-color': '#1F232914',
        'primary-color': '#1F2329',
        'placeholder': '#d2d8dc'
      },
      borderWidth: {
        '1': '1px'
      },
    },

  },
  plugins: [],
}

