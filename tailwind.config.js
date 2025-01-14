module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        danger: '#dc2626',
        success: '#16a34a',
      },
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
};