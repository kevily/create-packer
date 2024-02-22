import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import { crx } from '@crxjs/vite-plugin'
import svgr from 'vite-plugin-svgr'
import defineManifest from './defineManifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            svgr(),
            stylelint({ cache: false, include: ['**/*.{css,scss,sass,less,styl,vue,svelte}'] }),
            eslintPlugin({
                eslintOptions: { cache: false, useEslintrc: true },
                shouldLint: path => /\/[^?]*\.(vue|svelte|m?[jt]sx?)$/.test(path)
            }),
            react(),
            crx({ manifest: defineManifest({ mode }) })
        ],
        resolve: {
            alias: {
                '@': __dirname
            }
        },
        esbuild: {
            drop: mode === 'production' ? ['console', 'debugger'] : []
        },
        server: {
            host: '0.0.0.0',
            port: 30001
        }
    }
})
