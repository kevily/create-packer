import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components'
import { pluginEslint } from '@rsbuild/plugin-eslint'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { pluginSvgr } from '@rsbuild/plugin-svgr'
import { createChunks } from './scripts'

export default defineConfig(({ envMode, command }) => {
    const { parsed: env } = loadEnv()
    const proxyBaseUrl = env.PUBLIC_API_HOST
    return {
        html: {
            template: './index.html'
        },
        source: {
            entry: {
                index: './main.tsx'
            }
        },
        resolve: {
            alias: {
                '@': __dirname
            }
        },
        output: {
            distPath: {
                root: 'dist'
            },
            cleanDistPath: true
        },
        tools: {
            rspack: {
                plugins: [
                    new StylelintWebpackPlugin(),
                    process.env.RSDOCTOR && new RsdoctorRspackPlugin()
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
            pluginSvgr(),
            pluginReact()
        ],
        performance: {
            removeConsole: command === 'build' ? ['log'] : false,
            chunkSplit: {
                strategy: 'custom',
                splitChunks: {
                    minChunks: 1,
                    cacheGroups: createChunks([{ libs: ['react', 'react-dom'], name: 'react' }])
                }
            },
            bundleAnalyze: envMode === 'analyse' ? { openAnalyzer: true } : void 0
        },
        server: {
            base: env.PUBLIC_BASE_URL,
            host: '0.0.0.0',
            compress: false,
            proxy: [
                {
                    context: [proxyBaseUrl],
                    target: 'http://127.0.0.1:3000',
                    pathRewrite: {
                        [proxyBaseUrl]: ''
                    }
                }
            ]
        }
    }
})
