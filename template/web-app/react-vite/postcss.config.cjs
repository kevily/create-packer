module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        autoprefixer: {},
        '@pandacss/dev/postcss': {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
}
