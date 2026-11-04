/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./terms.html",
    "./en/**/*.html",
    "./tools/**/*.js",
    "./main.js",
    "./terms.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#000000',
        zinc: {
          800: '#1F1F1F',
          900: '#16161A',
          950: '#0D0D11'
        },
        border: '#222228',
        amber: {
          DEFAULT: '#FF9F0A',
          hover: '#E58E09'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  },
  safelist: [
    'hidden',
    'bg-amber',
    'text-obsidian',
    'border-amber',
    'border-border',
    'text-zinc-300',
    'text-zinc-400',
    'bg-zinc-800',
    'text-white'
  ],
  plugins: [],
};
