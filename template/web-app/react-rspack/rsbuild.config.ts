import { defineConfig, loadEnv, RsbuildConfig, CacheGroups } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components'
import { pluginEslint } from '@rsbuild/plugin-eslint'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { pluginSvgr } from '@rsbuild/plugin-svgr'

function createChunks(chunks: Array<{ name: string; libs: string[] | RegExp; priority?: number }>) {
    const result: CacheGroups = {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors',
            priority: -1
        }
    }
    chunks.forEach(({ name, libs, priority }) => {
        result[name] = {
            test: Array.isArray(libs)
                ? new RegExp(`[\\\\/]node_modules[\\\\/](${libs.join('|')})[\\\\/]`)
                : libs,
            chunks: 'all',
            name,
            priority
        }
        return result
    })
    return result
}

export default defineConfig(({ envMode, command }) => {
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
                    envMode === 'analyse' && new BundleAnalyzerPlugin(),
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
            pluginReact({})
        ],
        performance: {
            removeConsole: command === 'build' ? ['log'] : false,
            chunkSplit: {
                strategy: 'custom',
                splitChunks: {
                    minChunks: 1,
                    cacheGroups: createChunks([{ libs: ['react', 'react-dom'], name: 'react' }])
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
