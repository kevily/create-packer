/** @type {import('tailwindcss').Config} */
module.exports = {
    important: '#app',
    content: [
        './index.html',
        './popup/**/*.{ts,tsx,js,jsx}',
        './background/**/*.{ts,tsx,js,jsx}',
        './content_script/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {}
    },
    plugins: []
}
