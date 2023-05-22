import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        plugins: [
            eslint(),
            vue({
                script: {
                    defineModel: true
                }
            })
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        esbuild: {
            drop: command === 'build' ? ['console', 'debugger'] : []
        },
        build: {}
    }
})
