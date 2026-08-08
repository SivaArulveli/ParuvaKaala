import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d0b',
        foreground: '#f3f4f6',
        primary: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
