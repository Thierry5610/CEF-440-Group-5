/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx}", 
    "./components/**/*.{js,jsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
    colors: {
        'streeteye-blue': '#E6F0FA', // Light blue background
        'streeteye-button': '#4A90E2', // Blue for buttons (example)
      },
    },
  },
}
