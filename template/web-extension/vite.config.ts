import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint'
import eslint from '@rollup/plugin-eslint'
import { crx } from '@crxjs/vite-plugin'
import svgr from 'vite-plugin-svgr'
import defineManifest from './defineManifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            svgr(),
            stylelint({ cache: false, include: ['**/*.{css,scss,sass,less,styl,vue,svelte}'] }),
            eslint({ include: ['**/*.{ts,tsx,js,jsx}'] }),
            react({
                babel: {
                    plugins: [
                        [
                            'babel-plugin-styled-components',
                            {
                                ssr: false,
                                displayName: false,
                                fileName: false,
                                transpileTemplateLiterals: false
                            }
                        ]
                    ]
                }
            }),
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
