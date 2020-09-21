const path = require('path')
const webpack = require('webpack')
const config = require('./config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function (isDev, isProd) {
    const plugins = [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(config.PATH.ENTRY, 'index.html'), // 加载模板
            chunks: ['vendors', 'index'],
            chunksSortMode: 'manual',
            // minify配置参数地址：https://github.com/kangax/html-minifier#options-quick-reference
            // ------------------------------------------------------------------------
            minify: {
                // 是否压缩html
                // -------------------------------------------------------------------------------
                collapseWhitespace: false,
                minifyJS: true,
                minifyCSS: true,
                // 是否保留单标签尾部的斜杠
                // -------------------------------------------------------------------------------
                keepClosingSlash: true,
                // 移除link标签上的type="text/css"属性
                // -------------------------------------------------------------------------------
                removeStyleLinkTypeAttributes: true,
                // 移除script标签剩的type="text/javascript"属性
                // -------------------------------------------------------------------------------
                removeScriptTypeAttributes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: config.STATIC_DIR + (isDev ? '/[name].css' : '/[name].[chunkhash].css'),
            chunkFilename: config.STATIC_DIR + (isDev ? '/[id].css' : '/[id].[chunkhash].css')
        })
    ]
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    if (isProd) {
        plugins.push(
            new copyWebpackPlugin([
                {
                    from: path.resolve(config.PATH.ENTRY, config.STATIC_DIR),
                    to: 'static',
                    ignore: ['.*']
                }
            ])
        )
        config.gzip &&
            plugins.push(
                new CompressionWebpackPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /.(js|css)$/,
                    threshold: 10240,
                    minRatio: 0.8
                })
            )
    }
    return plugins
}
