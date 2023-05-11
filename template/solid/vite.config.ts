import { defineConfig } from 'vite'
import path from 'path'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig(({ command }) => {
    return {
        plugins: [solidPlugin()],
        server: {
            port: 3000
        },
        build: {
            target: 'esnext'
        },
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        esbuild: {
            drop: command === 'build' ? ['console', 'debugger'] : []
        }
    }
})
