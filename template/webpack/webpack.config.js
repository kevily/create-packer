const path = require('path')
const config = require('./webpack_config/config.js')
const merge = require('webpack-merge')
const getStyleloaders = require('./webpack_config/styleloaders')
const getPlugins = require('./webpack_config/plugins')
const rimraf = require('rimraf')
const getBabelConfig = require('./webpack_config/babel')

let webpack_config = {}

function dev() {
    Object.keys(webpack_config.entry).forEach((key) => {
        webpack_config.entry[key].unshift('webpack-hot-middleware/client')
    })
    merge(webpack_config, { devServer: config.devServer })
}

function prod() {
    // 清理dist文件夹
    // -------------------------------------------------------------------------------
    rimraf.sync(config.PATH.BUILD)
}

module.exports = function (env, argv) {
    const isDev = env === 'dev'
    const isProd = env === 'prod'
    webpack_config = {
        entry: {
            index: [path.resolve(config.PATH.ENTRY, 'index.tsx')]
        },
        output: {
            filename: config.STATIC_DIR + (isDev ? '/[name].js' : '/[name].[chunkhash].js'),
            path: config.PATH.BUILD,
            publicPath: '/'
        },
        bail: true,
        mode: isDev ? 'development' : 'production',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: getBabelConfig(isDev)
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: config.STATIC_DIR + '/img/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: config.STATIC_DIR + '/font/[name].[hash:7].[ext]'
                    }
                },
                ...getStyleloaders(isDev)
            ]
        },
        plugins: getPlugins(isDev, isProd),
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            },
            modules: [path.resolve(__dirname, './node_modules')]
        }
    }
    isDev && dev()
    isProd && prod()
    return webpack_config
}
