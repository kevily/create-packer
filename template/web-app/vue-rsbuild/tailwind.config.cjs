/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './app.vue',
        './main.ts',
        './pages/**/*.{vue,ts,tsx,js,jsx}',
        './domain/**/*.{vue,ts,tsx,js,jsx}',
        './shared/**/*.{vue,ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: []
}
