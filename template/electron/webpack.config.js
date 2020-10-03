const TerserPlugin = require('terser-webpack-plugin')
const WebpackBar = require('webpackbar')
const path = require('path')

module.exports = function (env) {
    const isDev = env === 'dev'
    const mode = isDev ? 'development' : 'production'
    process.env.NODE_ENV = mode

    return {
        entry: path.join(__dirname, './src/main.ts'),
        target: 'electron-main',
        mode,
        output: {
            path: path.join(__dirname),
            filename: './main.js'
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    sourceMap: true,
                    cache: true
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [new WebpackBar()],
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
            modules: [path.resolve(__dirname, './node_modules')]
        },
        node: {
            __dirname: false,
            __filename: false
        }
    }
}
