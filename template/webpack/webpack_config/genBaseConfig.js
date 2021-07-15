const config = require('./config')
const path = require('path')

module.exports = function genBaseConfig(env) {
    return {
        entry: {
            index: [path.join(config.SRC, 'index.tsx')]
        },
        output: {
            filename: config.STATIC_DIR + (env === 'dev' ? '/[name].js' : '/[name].[chunkhash].js'),
            path: config.OUTPUT,
            publicPath: '/'
        },
        bail: true,
        mode: env === 'dev' ? 'development' : 'production',
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
