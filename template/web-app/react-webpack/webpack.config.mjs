import path from 'path'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { EsbuildPlugin } from 'esbuild-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as dotenv from 'dotenv'
import { ROOT, STATIC_DIR, OUTPUT } from './webpack_config/constant.mjs'

function getEnvConfig(mode) {
    const envConfig = dotenv.config({ path: mode ? `.env.${mode}` : '.env' }).parsed
    Object.keys(envConfig).forEach(k => {
        envConfig[k] = JSON.stringify(envConfig[k])
    })
    return envConfig
}

export default function (env) {
    const envConfig = getEnvConfig(env.mode)
    const publicPath = JSON.parse(envConfig.BASE_URL)

    return {
        entry: {
            index: [path.join(ROOT, 'main.tsx')]
        },
        output: {
            filename: STATIC_DIR + (env.WEBPACK_BUILD ? '/[name].[chunkhash].js' : '/[name].js'),
            path: OUTPUT,
            publicPath,
            clean: true
        },
        bail: true,
        mode: env.WEBPACK_BUILD ? 'production' : 'development',
        stats: env.WEBPACK_BUILD ? 'normal' : 'errors-only',
        performance: {
            hints: false
        },
        devServer: {
            host: '0.0.0.0',
            hot: true,
            open: publicPath,
            static: {
                publicPath
            },
            historyApiFallback: {
                disableDotRule: true,
                index: publicPath
            },
            devMiddleware: {
                publicPath
            },
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
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    loader: 'esbuild-loader',
                    options: {
                        target: 'es2015'
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.css$/,
                    use: [
                        env.WEBPACK_BUILD ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins: [
            new WebpackBar(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(ROOT, 'index.html')
            }),
            new webpack.DefinePlugin(envConfig),
            new MiniCssExtractPlugin({
                filename: env.WEBPACK_BUILD ? '[name].[contenthash].css' : '[name].css'
            })
        ],
        optimization: {
            minimizer: [
                new EsbuildPlugin({
                    target: 'es2015'
                })
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                '@': ROOT
            },
            modules: ['node_modules']
        }
    }
}
