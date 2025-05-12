module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        autoprefixer: {},
        '@tailwindcss/postcss': {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
}
