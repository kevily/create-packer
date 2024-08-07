import { defineManifest } from '@crxjs/vite-plugin'
import pkgJson from './package.json'

interface argType {
    mode: string
}
export default function ({ mode }: argType) {
    const host_permissions: string[] = []
    return defineManifest({
        manifest_version: 3,
        name: 'Hello Extensions',
        description: 'Base Level Extension',
        version: pkgJson.version,
        action: {
            default_popup: 'popup/popup.html',
            default_icon: 'vite.svg'
        },
        host_permissions,
        content_scripts: [
            {
                js: ['content_script/index.tsx'],
                matches: [
                    'https://developer.chrome.com/docs/extensions/*',
                    'https://developer.chrome.com/docs/webstore/*'
                ]
            }
        ],
        background: {
            service_worker: 'background/index.ts'
        }
    })
}
