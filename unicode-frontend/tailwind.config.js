/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                unicode: {
                    green: '#00FF88', // Verde neón
                    black: '#0a0a0a', // Negro profundo
                    gray: '#1A1A1A',  // Gris oscuro para tarjetas
                    light: '#FFFFFF', // Blanco
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                }
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00FF88, 0 0 10px #00FF88' },
                    '100%': { boxShadow: '0 0 10px #00FF88, 0 0 20px #00FF88' },
                }
            }
        },
    },
    plugins: [],
}
