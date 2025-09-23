import path from 'node:path'
import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { createChunks } from './createChunks'
import { createPlugins, OUTPUT_ROOT } from './config'

export default defineConfig(({ envMode, command }) => {
    const { parsed: env } = loadEnv()
    const { rspackPlugin, plugins } = createPlugins({ command })
    const resolveRendererPath = (p: string) => path.resolve('renderer', p)
    return {
        html: {
            template: resolveRendererPath('index.html'),
            title: 'Rsbuild + Vue + TS',
            favicon: resolveRendererPath('shared/assets/vue.svg')
        },
        source: {
            entry: {
                index: resolveRendererPath('main.ts')
            }
        },
        resolve: {
            alias: {
                '@': process.cwd()
            }
        },
        output: {
            distPath: { root: `${OUTPUT_ROOT}/renderer` },
            assetPrefix: './',
            cleanDistPath: false
        },
        dev: {
            progressBar: command === 'build'
        },
        tools: {
            rspack: {
                plugins: rspackPlugin
            }
        },
        plugins: [...plugins, pluginVue()],
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
