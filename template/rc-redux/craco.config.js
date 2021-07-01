const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const webpackPlugins = []

if (process.argv[2] === '--analyze') {
    webpackPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
    webpack: {
        alias: {},
        plugins: webpackPlugins
    }
}
