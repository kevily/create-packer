import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import mockDevServer from 'vite-plugin-mock-dev-server'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const plugins: any[] = [
        vueJsx({
            enableObjectSlots: false
        }),
        checker({
            typescript: true,
            eslint: {
                // for example, lint .ts and .tsx
                lintCommand: 'eslint **/*.{ts,tsx,js,jsx,vue}',
                dev: {
                    logLevel: ['error']
                }
            },
            stylelint: {
                lintCommand: 'stylelint **/*.{less,scss,less}',
                dev: {
                    logLevel: ['error']
                }
            }
        }),
        vue({
            script: {
                defineModel: true
            }
        }),
        svgLoader(),
        mockDevServer({
            include: ['**/*.mock.{ts,js}']
        })
    ]
    return {
        base: env.VITE_BASE_URL,
        plugins,
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        esbuild: {
            drop: command === 'build' ? ['console', 'debugger'] : []
        },
        build: {},
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
