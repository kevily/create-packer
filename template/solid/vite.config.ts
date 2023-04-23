import path from 'path'
import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ command }) => {
    return {
        plugins: [eslint(), solid({ ssr: false })],
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
