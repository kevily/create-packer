/// <reference types="vite/client" />
/// <reference types="./.wxt/wxt.d.ts" />
import '@emotion/react'
import { type themeType } from '@/shared/styles'

declare global {
    interface ImportMetaEnv {
        readonly VITE_API_HOST: string
        readonly VITE_APP_ID: string
        // 更多环境变量...
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}

declare module '@emotion/react' {
    export interface Theme extends themeType {}
}
