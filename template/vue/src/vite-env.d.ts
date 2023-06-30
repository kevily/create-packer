/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, any>, Record<string, any>, any>
    export default component
}

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_API_HOST: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
