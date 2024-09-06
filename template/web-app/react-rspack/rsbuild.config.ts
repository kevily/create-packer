import { defineConfig, loadEnv, RsbuildConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components'
import { pluginEslint } from '@rsbuild/plugin-eslint'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default defineConfig(({ envMode }) => {
    const { parsed: env } = loadEnv()
    const proxyBaseUrl = env.PUBLIC_BASE_URL + env.PUBLIC_API_HOST
    return {
        html: {
            template: './index.html'
        },
        source: {
            entry: {
                index: './main.tsx'
            },
            alias: {
                '@': __dirname
            }
        },
        tools: {
            rspack: {
                plugins: [
                    new StylelintWebpackPlugin(),
                    envMode === 'analyse' && new BundleAnalyzerPlugin()
                ]
            }
        },
        plugins: [
            pluginTypeCheck(),
            pluginEslint(),
            pluginStyledComponents({
                ssr: false,
                displayName: false,
                fileName: false,
                transpileTemplateLiterals: false
            }),
            pluginReact({})
        ],
        performance: {
            chunkSplit: {
                strategy: 'custom',
                splitChunks: {
                    minChunks: 1,
                    cacheGroups: {
                        react: {
                            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                            chunks: 'all',
                            name: 'react'
                        },
                        vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            chunks: 'all',
                            name: 'vendors',
                            priority: -1
                        }
                    }
                }
            }
        },
        server: {
            host: '0.0.0.0',
            proxy: {
                [proxyBaseUrl]: {
                    target: 'http://127.0.0.1:3000',
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: {
                        [proxyBaseUrl]: ''
                    }
                }
            }
        }
    } satisfies RsbuildConfig
})
