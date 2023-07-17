import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import mockDevServer from 'vite-plugin-mock-dev-server'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const plugins: any[] = [
        svgr(),
        checker({
            typescript: true,
            eslint: {
                // for example, lint .ts and .tsx
                lintCommand: 'eslint ./src/**/*.{ts,tsx,js,jsx}',
                dev: {
                    logLevel: ['error']
                }
            },
            stylelint: {
                lintCommand: 'stylelint ./src/**/*.{less,scss,less}',
                dev: {
                    logLevel: ['error']
                }
            }
        }),
        react(),
        mockDevServer({
            include: ['src/**/*.mock.{ts,js}']
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
