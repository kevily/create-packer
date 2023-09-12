import path from 'path'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import { EsbuildPlugin } from 'esbuild-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import EslintWebpackPlugin from 'eslint-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as dotenv from 'dotenv'
import { ROOT, OUTPUT, createCssLoader, createStyleLoader } from './webpack_config/index.mjs'

/**
 *
 * @param {String} mode
 * @param {boolean} isProd
 * @returns {object}
 */
function getEnvConfig(mode, isProd) {
    const envConfig = dotenv.config({
        path: isProd ? '.env' : `.env.${mode}`
    }).parsed
    Object.keys(envConfig).forEach(k => {
        envConfig[k] = JSON.stringify(envConfig[k])
    })
    return envConfig
}

export default function (env) {
    const isProd = ['prod', 'analyse'].includes(env.mode)
    const envConfig = getEnvConfig(env.mode, isProd)
    const publicPath = JSON.parse(envConfig.ENV_BASE_URL)

    return {
        entry: {
            index: [path.join(ROOT, 'main.tsx')]
        },
        output: {
            filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
            chunkFilename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
            path: OUTPUT,
            publicPath,
            clean: true
        },
        bail: true,
        mode: isProd ? 'production' : 'development',
        stats: isProd ? 'normal' : 'errors-only',
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
                        target: 'chrome82',
                        drop: isProd ? ['console', 'debugger'] : []
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
                    exclude: /\.module\.css$/,
                    use: [createStyleLoader(isProd), createCssLoader(), 'postcss-loader']
                },
                {
                    test: /\.module\.css$/,
                    use: [createStyleLoader(isProd), createCssLoader(true), 'postcss-loader']
                }
            ]
        },
        plugins: [
            new WebpackBar(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(ROOT, 'index.html')
            }),
            new EslintWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin(),
            new webpack.DefinePlugin(envConfig),
            new MiniCssExtractPlugin({
                filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
                chunkFilename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css'
            }),
            env.mode === 'analyzer' && new BundleAnalyzerPlugin()
        ],
        optimization: {
            minimizer: [new EsbuildPlugin()],
            splitChunks: {
                minChunks: 1,
                cacheGroups: {
                    default: false,
                    react: {
                        test: /\/(react|react-dom)\//,
                        chunks: 'all',
                        name: 'react'
                    },
                    vendor: {
                        test: /\/node_modules\//,
                        chunks: 'all',
                        name: 'vendor',
                        priority: -1
                    }
                }
            }
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
