/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blockquote: "#3d25141f",
        "blockquote-text": "#878685",
        "input-bg": "#f5f5f5",
        highlight: "FAF594",
        icon: "#8c8c8c",
        "side-icon": "#646a73",
        "text-side-icon-active": "#4752e6",
        addFile: "#5083fb",
        clouldUpload: "#ed6d0c",
        "think-text": "#8b8b8b",
        title: "#1f2329",
        treeTitle: "#646a73",
        add: "#1456f0",
        "add-hover": "#e7eefd",
        "bg-emojiHover": "rgba(31, 35, 41, 0.08)",
      },
      borderWidth: {
        2: "2px",
        3: "3px",
        4: "4px",
      },
    },
  },
  plugins: [],
};
