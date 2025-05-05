module.exports = {
    plugins: {
        'postcss-import': {},
        autoprefixer: {},
        "@tailwindcss/postcss": {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
}
