import { defineConfig, UserManifestFn } from 'wxt'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import pkgJson from './package.json'

const manifest: UserManifestFn = () => {
    const host_permissions: string[] = []

    return {
        manifest_version: 3,
        name: 'Hello Extensions',
        description: 'Base Level Extension',
        version: pkgJson.version,
        host_permissions,
        icons: {
            '48': 'vite.png',
            '128': 'vite.png'
        }
    }
}

export default defineConfig({
    outDir: 'dist',
    zip: {
        name: 'webExtension',
        artifactTemplate: '{{name}}@{{version}}-{{mode}}-{{browser}}.zip'
    },
    manifest,
    runner: { disabled: true },
    extensionApi: 'chrome',
    imports: { eslintrc: { enabled: 9 } },
    vite: ({ mode }) => ({
        plugins: [svgr(), react()] as any,
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
