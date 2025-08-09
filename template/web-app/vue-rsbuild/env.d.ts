/// <reference types="@rsbuild/core/types" />

declare module '*.vue' {
    import { type DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, any>, Record<string, any>, any>
    export default component
}

interface ImportMetaEnv {
    readonly PUBLIC_BASE_URL: string
    readonly PUBLIC_API_HOST: string
    readonly PUBLIC_ENV_MODE: 'production' | 'development'
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
