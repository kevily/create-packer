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
            '48': 'vite.svg',
            '128': 'vite.svg'
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
    imports: { eslintrc: { enabled: 9 } },
    vite: ({ mode }) => {
        const isDropConsole = ['production', 'analyse'].includes(mode)
        return {
            plugins: [svgr(), react()] as any,
            resolve: {
                alias: {
                    '@': __dirname
                }
            },
            oxc: {
                plugins: {
                    styledComponents: {
                        ssr: false,
                        displayName: false,
                        fileName: false,
                        transpileTemplateLiterals: false
                    }
                }
            },
            build: {
                rolldownOptions: {
                    output: {
                        minify: {
                            compress: { dropConsole: isDropConsole, dropDebugger: isDropConsole }
                        }
                    }
                }
            }
        }
    }
})
