/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
    readonly PUBLIC_BASE_URL: string
    readonly PUBLIC_API_HOST: string
    readonly PUBLIC_ENV_MODE: 'production' | 'development'
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
