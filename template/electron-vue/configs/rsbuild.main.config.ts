import { defineConfig, loadEnv } from '@rsbuild/core'
import { createPlugins, OUTPUT_ROOT } from './config'

export default defineConfig(({ envMode, command }) => {
    const { parsed: env } = loadEnv()
    const { rspackPlugin, plugins } = createPlugins({ command })
    return {
        source: {
            entry: {
                main: './main/main.ts'
            }
        },
        resolve: {
            alias: {
                '@': process.cwd()
            }
        },
        output: {
            distPath: { root: `${OUTPUT_ROOT}/main`, js: '' },
            cleanDistPath: false,
            filenameHash: false
        },
        dev: {
            progressBar: command === 'build',
            writeToDisk: true,
            hmr: false,
            liveReload: false
        },
        tools: {
            htmlPlugin: false,
            rspack: {
                target: 'electron-main',
                plugins: rspackPlugin
            }
        },
        plugins,
        performance: {
            removeConsole: command === 'build' ? ['log'] : false,
            bundleAnalyze: envMode === 'analyse' ? { openAnalyzer: true } : void 0
        },
        server: {
            base: env.PUBLIC_BASE_URL,
            host: '0.0.0.0',
            port: 3001,
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
