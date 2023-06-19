import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { crx } from '@crxjs/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [eslint(), react(), crx({ manifest: require('./manifest.json') })],
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        esbuild: {
            drop: mode === 'development' ? [] : ['console', 'debugger']
        }
    }
})
