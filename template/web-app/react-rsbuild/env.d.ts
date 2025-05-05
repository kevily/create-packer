/// <reference types="@rsbuild/core/types" />
import '@emotion/react'
import { themeType } from './shared/styles'

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
declare global {
    interface ImportMetaEnv {
        readonly PUBLIC_BASE_URL: string
        readonly PUBLIC_API_HOST: string
        readonly PUBLIC_ENV_MODE: 'production' | 'development'
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv
    }

    declare module '*.svg' {
        const content: string
        export default content
    }

    declare module '*.svg?react' {
        const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
        export default ReactComponent
    }
}

declare module '@emotion/react' {
    export interface Theme extends themeType {}
}
