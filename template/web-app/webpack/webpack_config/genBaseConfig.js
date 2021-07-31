const config = require('./config')
const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function genBaseConfig(env) {
    return {
        entry: {
            index: [path.join(config.SRC, 'index.tsx')]
        },
        output: {
            filename: config.STATIC_DIR + (env.prod ? '/[name].[chunkhash].js' : '/[name].js'),
            path: config.OUTPUT,
            publicPath: '/',
            clean: true
        },
        bail: true,
        mode: env.prod ? 'production' : 'development',
        devServer: {
            host: 'localhost',
            port: 8080,
            inline: true,
            hot: true,
            publicPath: 'http://localhost:8080',
            open: true,
            historyApiFallback: true,
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3000',
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new WebpackBar(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(config.SRC, 'index.html')
            })
        ],
        optimization: {
            minimize: true
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
            alias: {
                '@': config.SRC
            },
            modules: [path.join(config.ROOT, 'node_modules')]
        }
    }
}
