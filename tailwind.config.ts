/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      colors: {
        'primary': '#007bff',
        'secondary': '#6c757d',
        'success': '#28a745',
        'warning': '#ffc107',
        'danger': '#dc3545',
        'info': '#17a2b8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}