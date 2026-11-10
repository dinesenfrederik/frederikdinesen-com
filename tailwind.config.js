/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./terms.html",
    "./en/**/*.html",
    "./tools/**/*.js",
    "./main.js",
    "./terms.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
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
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#d4d4d8',
            '--tw-prose-headings': '#f4f4f5',
            '--tw-prose-lead': '#a1a1aa',
            '--tw-prose-links': '#FF9F0A',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-counters': '#71717a',
            '--tw-prose-bullets': '#FF9F0A',
            '--tw-prose-hr': '#222228',
            '--tw-prose-quotes': '#e4e4e7',
            '--tw-prose-quote-borders': '#FF9F0A',
            '--tw-prose-captions': '#71717a',
            '--tw-prose-code': '#FF9F0A',
            '--tw-prose-pre-code': '#f4f4f5',
            '--tw-prose-pre-bg': '#0D0D11',
            '--tw-prose-th-borders': '#222228',
            '--tw-prose-td-borders': '#222228',
            '--tw-prose-invert-body': '#d4d4d8',
            '--tw-prose-invert-headings': '#f4f4f5',
            '--tw-prose-invert-lead': '#a1a1aa',
            '--tw-prose-invert-links': '#FF9F0A',
            '--tw-prose-invert-bold': '#ffffff',
            '--tw-prose-invert-counters': '#71717a',
            '--tw-prose-invert-bullets': '#FF9F0A',
            '--tw-prose-invert-hr': '#222228',
            '--tw-prose-invert-quotes': '#e4e4e7',
            '--tw-prose-invert-quote-borders': '#FF9F0A',
            '--tw-prose-invert-captions': '#71717a',
            '--tw-prose-invert-code': '#FF9F0A',
            '--tw-prose-invert-pre-code': '#f4f4f5',
            '--tw-prose-invert-pre-bg': '#0D0D11',
            '--tw-prose-invert-th-borders': '#222228',
            '--tw-prose-invert-td-borders': '#222228',
          },
        },
      },
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
