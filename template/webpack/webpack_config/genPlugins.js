const path = require('path')
const config = require('./config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = function genPlugins(env) {
    const plugins = [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(config.SRC, 'index.html') // 加载模板
        })
    ]

    return plugins
}
