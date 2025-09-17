/// <reference types="vite/client" />
/// <reference types="./.wxt/wxt.d.ts" />

interface ImportMetaEnv {
    readonly VITE_API_HOST: string
    readonly VITE_APP_ID: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
