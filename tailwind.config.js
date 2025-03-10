/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100%',
              color: 'inherit',
              a: {
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  color: 'inherit',
                  textDecoration: 'underline',
                },
              },
              h1: {
                color: 'inherit',
              },
              h2: {
                color: 'inherit',
              },
              h3: {
                color: 'inherit',
              },
              h4: {
                color: 'inherit',
              },
              h5: {
                color: 'inherit',
              },
              h6: {
                color: 'inherit',
              },
              pre: {
                backgroundColor: 'rgb(var(--tw-prose-pre-bg))',
                color: 'rgb(var(--tw-prose-pre-code))',
              },
              code: {
                color: 'rgb(var(--tw-prose-code))',
                fontWeight: '600',
              },
            },
          },
        },
        fontFamily: {
          sans: ['Inter var', 'Inter', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }