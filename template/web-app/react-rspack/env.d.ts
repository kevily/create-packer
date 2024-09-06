/// <reference types="@rsbuild/core/types" />
import 'styled-components'
import { themeType } from './shared/theme'

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}

interface ImportMetaEnv {
    // import.meta.env.PUBLIC_FOO
    readonly PUBLIC_BASE_URL: string
    readonly PUBLIC_API_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
