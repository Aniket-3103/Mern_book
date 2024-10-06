/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // These cover the `src` folder and subfolders
    "./pages/**/*.{js,jsx,ts,tsx}",  // For any `pages` folder directly
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
