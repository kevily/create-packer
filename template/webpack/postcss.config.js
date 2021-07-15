module.exports = {
    sourceMap: process.env.NODE_ENV !== 'production',
    plugins: [
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: 'no-2009'
            },
            stage: 3
        })
    ]
}
