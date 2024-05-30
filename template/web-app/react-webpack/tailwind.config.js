/** @type {import('tailwindcss').Config} */
module.exports = {
    important: '#my-app',
    content: [
        './index.html',
        './main.tsx',
        './pages/**/*.{ts,tsx,js,jsx}',
        './domain/**/*.{ts,tsx,js,jsx}',
        './shared/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}
