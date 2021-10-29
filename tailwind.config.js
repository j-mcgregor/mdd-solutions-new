module.exports = {
    purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                primary: ['Arimo Regular'],
                'primary-bold': ['Arimo Bold'],
            },
            colors: {
                blue: {
                    100: '#69b8f8',
                    200: '#419be4',
                    300: '#398bce',
                    400: '#307ab6',
                    500: '#28699e',
                    600: '#225a88',
                    700: '#1a4669',
                    800: '#13334e',
                    900: '#0b1e2f',
                },
                'primary-blue': '#143959',
                'secondary-blue': '#1A4A74',
                'primary-yellow': '#f4b41a',
                'secondary-yellow': '#f8cb63',
                accent: '#76c086',
                light: '#eeeeee',
                dark: '#333333',
            },
            gridTemplateRows: {
                layout: 'auto auto',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
}
