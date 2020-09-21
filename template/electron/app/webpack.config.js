const TerserPlugin = require('terser-webpack-plugin')
const WebpackBar = require('webpackbar')
const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/main.ts'),
    devtool: 'source-map',
    target: 'electron-main',
    output: {
        path: path.join(__dirname),
        filename: './main.js',
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                cache: true,
            }),
        ],
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [new WebpackBar()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        modules: [path.resolve(__dirname, './node_modules')],
    },
    node: {
        __dirname: false,
        __filename: false,
    },
}
