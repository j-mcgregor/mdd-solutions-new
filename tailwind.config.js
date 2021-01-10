module.exports = {
    purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
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
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
}
