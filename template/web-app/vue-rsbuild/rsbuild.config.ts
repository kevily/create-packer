import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginEslint } from '@rsbuild/plugin-eslint'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'
import { createChunks } from './scripts'

export default defineConfig(({ envMode, command }) => {
    const { parsed: env } = loadEnv()
    return {
        html: {
            template: './index.html',
            title: 'Vite + Vue + TS'
        },
        source: {
            entry: {
                index: './main.ts'
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
        dev: {
            progressBar: true
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
            pluginEslint({
                eslintPluginOptions: {
                    configType: 'flat'
                }
            }),
            pluginVue()
        ],
        performance: {
            removeConsole: command === 'build' ? ['log'] : false,
            chunkSplit: {
                strategy: 'custom',
                splitChunks: {
                    minChunks: 1,
                    cacheGroups: createChunks([{ libs: ['vue', 'vue-router'], name: 'vue' }])
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
                    context: [env.PUBLIC_API_HOST],
                    target: 'http://127.0.0.1:3000'
                }
            ]
        }
    }
})
