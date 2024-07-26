/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    mode: 'jit',
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                'app-back': `linear-gradient(
                    to bottom,
                    ${theme('colors.light-black')} 20%,
                    ${theme('colors.light-black')} 100%
                ), url(./src/assets/images/shooter.png);`,
                'gradient-radial': 'radial-gradient(circle, rgba(62,43,18,1) 1%, rgba(21,21,21,0) 70%)',
            }),
            colors: {
                'light-black': '#090909ee',
                'secondary-dark': '#171717',
                'inactive-text': '#8b8b8b',
                'primary-text': '#f5f5f5',
                secondary: '#F28B02',
                'hero-back': '#8000FF'
            },
            letterSpacing: {
                'subtitle': '3px',
            },
        },
    },
    plugins: [],
};
