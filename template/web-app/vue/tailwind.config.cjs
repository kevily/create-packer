/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './app.vue', './pages/**/*.{vue,ts,tsx,js,jsx}', './domain/**/*.{vue,ts,tsx,js,jsx}', './components/**/*.{vue,ts,tsx,js,jsx}'],
    theme: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}
