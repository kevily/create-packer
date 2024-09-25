/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import 'styled-components'
import { themeType } from './shared/theme'

declare global {
    interface ImportMetaEnv {
        readonly VITE_BASE_URL: string
        readonly VITE_API_HOST: string
        // 更多环境变量...
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
