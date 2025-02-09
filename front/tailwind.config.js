/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  variants: {
    extend: {
      overflow: ['hover'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        'title': ['title', 'sans-serif'],
        'text': ['text', 'sans-serif'],
      },
      colors: {
        secondary: {
          light: "#377CEC",
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
        },
        primary: {
          light: "#FFFBBD",
          DEFAULT: "#FACC15",
          dark: "#EAB308",
        },
        text: {
          primary: "#FACC15",
          secondary: "#1E40AF"
        }
      },
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    variants: {
      extend: {
        overflow: ['hover'],
      },
    },
    plugins: [
      require('flowbite/plugin')
    ]
  }
}
