const genBaseConfig = require('./webpack_config/genBaseConfig')
const { merge } = require('webpack-merge')
const genStyleConfig = require('./webpack_config/genStyleConfig')
const webpack = require('webpack')

module.exports = function (env) {
    const config = merge(genBaseConfig(env), genStyleConfig(env))
    if (!env.prod) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin())
        Object.keys(config.entry).forEach(k => {
            config.entry[k].unshift('webpack-hot-middleware/client')
        })
    }
    return config
}
