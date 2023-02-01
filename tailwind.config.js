/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {

    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    backgroundSize: {
      'auto': 'auto',
      'cover' : 'cover',
      'contain' : 'contain',
      '50%' : '50%',
    '16' : '4rem'
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        transparent: 'transparent',
        'blue-quiz' : '#8EC5FC',
        'mauve-quiz' : '#E0C3FC',

      },
      backgroundImage: {
        'history-image': "url('https://c4.wallpaperflare.com/wallpaper/142/751/831/landscape-anime-digital-art-fantasy-art-wallpaper-preview.jpg')",

      }
    },

  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
