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
                    green: '#00FF88',
                    'green-dark': '#00CC6A',
                    'green-light': '#33FFA3',
                    black: '#0A0A0A',
                    'black-deeper': '#050505',
                    gray: '#111111',
                    'gray-card': '#1A1A1A',
                    'gray-border': '#2A2A2A',
                    'gray-user': '#1E1E1E',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'grid-green': 'linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '50px 50px',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fade-in 0.8s ease-out forwards',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.3)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
