const genBaseConfig = require('./webpack_config/genBaseConfig')
const { merge } = require('webpack-merge')
const genStyleConfig = require('./webpack_config/genStyleConfig')

module.exports = function (env) {
    return merge(genBaseConfig(env), genStyleConfig(env))
}
