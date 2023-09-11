/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './main.tsx',
        './pages/**/*.{ts,tsx,js,jsx}',
        './domain/**/*.{ts,tsx,js,jsx}',
        './components/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}
