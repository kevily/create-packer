const genPlugins = require('./webpack_config/genPlugins')
const genBaseConfig = require('./webpack_config/genBaseConfig')
const genLoader = require('./webpack_config/genLoader.js')

module.exports = function (env) {
    return {
        ...genBaseConfig(env),
        plugins: genPlugins(env),
        module: {
            rules: genLoader(env)
        }
    }
}
