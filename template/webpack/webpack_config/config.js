const path = require('path')

const FOLDER = path.resolve(__dirname, '../')
const ENTRY = path.resolve(FOLDER, 'src')
const BUILD = path.resolve(FOLDER, 'dist')

module.exports = {
    PATH: {
        FOLDER,
        ENTRY,
        BUILD
    },
    STATIC_DIR: 'static',
    gzip: false,
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
    scopeClassName: '[name]__[local]--[hash:base64:5]'
}
