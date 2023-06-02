import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { chromeExtension } from 'vite-plugin-chrome-extension'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [eslint(), react(), chromeExtension() as any],
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        esbuild: {
            drop: mode === 'developmemnt' ? [] : ['console', 'debugger']
        },
        build: {
            rollupOptions: {
                input: 'src/manifest.json'
            },
            minify: mode === 'developmemnt' ? false : 'esbuild'
        }
    }
})
