module.exports = {
    plugins: {
        'postcss-import': {},
        '@tailwindcss/postcss': {},
        'postcss-nesting': {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
}
