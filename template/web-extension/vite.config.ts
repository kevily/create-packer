import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import { crx } from '@crxjs/vite-plugin'
import defineManifest from './defineManifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
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
                    lintCommand: 'stylelint ./src/**/*.{css,scss,less}',
                    dev: {
                        logLevel: ['error']
                    }
                }
            }),
            react(),
            crx({ manifest: defineManifest({ mode }) })
        ],
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
