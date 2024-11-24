const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-text': 'hsl(229, 25%, 31%)',
        'score-text': 'hsl(229, 64%, 46%)',
        'header-outline': 'hsl(217, 16%, 45%)',
        'background-start': 'hsl(214, 47%, 23%)',
        'background-end': 'hsl(237, 49%, 15%)',
      },
      backgroundImage: {
        'scissors-gradient': 'linear-gradient(hsl(39, 89%, 49%), hsl(40, 84%, 53%))',
        'paper-gradient': 'linear-gradient(hsl(230, 89%, 62%), hsl(230, 89%, 65%))',
        'rock-gradient': 'linear-gradient(hsl(349, 71%, 52%), hsl(349, 70%, 56%))',
        'lizard-gradient': 'linear-gradient(hsl(261, 73%, 60%), hsl(261, 72%, 63%))',
        'spock-gradient': 'linear-gradient(hsl(189, 59%, 53%), hsl(189, 58%, 57%))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
