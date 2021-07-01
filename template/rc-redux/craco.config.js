const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const webpackPlugins = []

if (process.env.ANALYZE === '1') {
    webpackPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
    webpack: {
        alias: {},
        plugins: webpackPlugins
    }
}
