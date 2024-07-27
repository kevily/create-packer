import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import mockDevServer from 'vite-plugin-mock-dev-server'
import stylelint from 'vite-plugin-stylelint'
import eslint from '@rollup/plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import { includes } from 'lodash-es'
import { createChunks } from './scripts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const proxyBaseUrl = env.VITE_BASE_URL + env.VITE_API_HOST
    const plugins: any[] = [
        vueJsx({
            enableObjectSlots: false
        }),
        stylelint({ cache: false, include: ['**/*.{css,scss,sass,less,styl,vue,svelte}'] }),
        eslint({ include: ['**/*.{ts,tsx,js,jsx,vue}'] }),
        vue(),
        svgLoader(),
        mockDevServer({
            include: ['**/*.mock.{ts,js}']
        })
    ]

    if (mode === 'analyse') {
        plugins.push(visualizer({ open: true, sourcemap: true, brotliSize: true, gzipSize: true }))
    }
    return {
        base: env.VITE_BASE_URL,
        plugins,
        resolve: {
            alias: {
                '@': __dirname
            }
        },
        esbuild: {
            drop: includes(['production', 'analyse'], mode) ? ['console', 'debugger'] : []
        },
        build: {
            sourcemap: mode === 'analyse',
            reportCompressedSize: mode === 'analyse',
            rollupOptions: {
                output: {
                    manualChunks: createChunks({
                        vue: ['vue', 'vue-router']
                    })
                }
            }
        },
        server: {
            host: '0.0.0.0',
            proxy: {
                [proxyBaseUrl]: {
                    target: 'http://127.0.0.1',
                    changeOrigin: true,
                    rewrite: path => path.replace(proxyBaseUrl, '')
                }
            }
        }
    }
})
