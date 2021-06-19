const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    webpack: {
        alias: {},
        babel: {
            presets: [],
            plugins: []
        },
        plugins: [
            // new BundleAnalyzerPlugin()
        ]
    }
}
