import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                serif: ['"Noto Serif JP"', 'Georgia', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                cream: {
                    DEFAULT: '#f5efe6',
                    50: '#faf7f2',
                    100: '#f5efe6',
                    200: '#ebe0d0',
                },
                bloom: {
                    50: '#fdf8f6',
                    100: '#f9ede8',
                    200: '#f2d9cf',
                    300: '#e8bfb0',
                    400: '#d99a84',
                    500: '#c97d64',
                    600: '#b5634a',
                    700: '#964f3b',
                    800: '#7c4334',
                    900: '#673a2e',
                },
                sage: {
                    50: '#f6f7f4',
                    100: '#e8ebe3',
                    200: '#d3d9c8',
                    300: '#b3bda5',
                    400: '#919f7f',
                    500: '#748264',
                    600: '#5b6750',
                },
            },
        },
    },

    plugins: [forms],
};
