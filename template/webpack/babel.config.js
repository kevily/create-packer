const baseConfig = {
    presets: ['@babel/preset-typescript', '@babel/preset-react', '@babel/preset-env'],
    plugins: []
}
if (process.env.NODE_ENV === 'production') {
    baseConfig.plugins.push(
        [
            'transform-react-remove-prop-types',
            '@babel/plugin-transform-runtime',
            {
                corejs: 2
            }
        ],
        ['transform-remove-console', { exclude: ['error', 'warn'] }]
    )
}
module.exports = baseConfig
