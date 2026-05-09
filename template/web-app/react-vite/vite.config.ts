import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import checker from 'vite-plugin-checker'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { createCodeSplitting } from './scripts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const proxyBaseUrl = env.VITE_BASE_URL + env.VITE_API_HOST
    const isDropConsole = ['production', 'analyse'].includes(mode)
    const plugins: any[] = [
        tailwindcss(),
        svgr(),
        mockDevServerPlugin({
            include: ['**/*.mock.{ts,js}']
        }),
        checker({
            enableBuild: false,
            typescript: true,
            eslint: { useFlatConfig: true, lintCommand: 'eslint', dev: { logLevel: ['error'] } }
        }),
        react()
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
        build: {
            sourcemap: mode === 'analyse',
            reportCompressedSize: mode === 'analyse',
            rolldownOptions: {
                output: {
                    codeSplitting: createCodeSplitting([
                        { name: 'react-vendor', libs: ['react', 'react-dom'], priority: 20 }
                    ]),
                    minify: {
                        compress: { dropConsole: isDropConsole, dropDebugger: isDropConsole }
                    }
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
