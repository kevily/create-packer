const config = require('./config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (isDev) {
    const regex = {
        css: /\.css$/,
        cssModule: /\.module\.css$/
    }

    const generateLoaders = function (cssOption, loaders = []) {
        const loader = [
            isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    sourceMap: true,
                    ...cssOption
                }
            },
            { loader: 'postcss-loader' },
            ...loaders
        ]
        return loader
    }

    return [
        {
            test: regex.css,
            exclude: regex.cssModule,
            use: generateLoaders()
        },
        {
            test: regex.cssModule,
            use: generateLoaders({
                modules: {
                    mode: 'local',
                    exportGlobals: true,
                    localIdentName: config.scopeClassName
                }
            })
        }
    ]
}
