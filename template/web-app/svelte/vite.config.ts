import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import stylelint from 'vite-plugin-stylelint'
import eslint from '@rollup/plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import { includes } from 'lodash-es'
import { createChunks } from './scripts'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const plugins: any[] = [
        stylelint({ cache: false, include: ['**/*.{css,scss,sass,less,styl,ts,tsx}'] }),
        eslint({ include: ['**/*.{ts,tsx,js,jsx}'] }),
        sveltekit()
    ]

    if (mode === 'analyse') {
        plugins.push(visualizer({ open: true, sourcemap: true, brotliSize: true, gzipSize: true }))
    }

    return {
        base: env.VITE_BASE_URL,
        plugins,
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
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
                        svelte: ['svelte']
                    })
                }
            }
        },
        server: {
            host: '0.0.0.0',
            proxy: {
                '/dev/api': {
                    target: 'http://127.0.0.1',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/dev\/api/, '')
                }
            }
        }
    }
})
