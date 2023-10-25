/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#f7a9a8',
        'custom-pink1':'#da2864',
        'custom-light-pink':'#fff1f2',
        "custom-pink-light":'#edbabc',
        "custom-pink3":'#fec9c3',
        "custom-Orange":'#cd2c6c',
        "custom-yellow":'#c2649a',"custom-green":'#d6bbe7',"pin":'#c2649a'
      },
      maxHeight: {
        '128': '60%',
      },
      width:{
        '128':'65.5%',
        '98':'98%'
      }
    },
  },
  plugins: [],
}

