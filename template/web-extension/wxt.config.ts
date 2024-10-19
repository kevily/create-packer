import { defineConfig, UserManifestFn } from 'wxt'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint'
import eslint from '@rollup/plugin-eslint'
import svgr from 'vite-plugin-svgr'
import pkgJson from './package.json'

const manifest: UserManifestFn = () => {
    const host_permissions: string[] = []

    return {
        manifest_version: 3,
        name: 'Hello Extensions',
        description: 'Base Level Extension',
        version: pkgJson.version,
        action: {
            default_icon: 'vite.svg'
        },
        host_permissions
    }
}

export default defineConfig({
    outDir: 'dist',
    zip: {
        name: 'webExtension',
        artifactTemplate: '{{name}}@{{version}}-{{mode}}-{{browser}}.zip'
    },
    manifest,
    vite: ({ mode }) => ({
        plugins: [
            svgr(),
            stylelint({ cache: false, include: ['**/*.{css,scss,sass,less,styl,vue,svelte}'] }),
            eslint({ include: ['**/*.{ts,tsx,js,jsx}'] }),
            react()
        ] as any,
        resolve: {
            alias: {
                '@': __dirname
            }
        },
        esbuild: {
            drop: mode === 'production' ? ['console', 'debugger'] : []
        }
    })
})
