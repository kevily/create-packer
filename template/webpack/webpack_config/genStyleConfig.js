const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function genStyleConfig(env) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: env.prod ? '[name].[contenthash].css' : '[name].css'
            })
        ]
    }
}
