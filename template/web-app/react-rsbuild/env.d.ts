/// <reference types="@rsbuild/core/types" />
import '@emotion/react'
import { type themeType } from '@/shared/styles'

declare global {
    interface ImportMetaEnv {
        readonly PUBLIC_BASE_URL: string
        readonly PUBLIC_API_HOST: string
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}
declare module '*.svg' {
    const content: string
    export default content
}

declare module '*.svg?react' {
    const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
    export default ReactComponent
}

declare module '@emotion/react' {
    export interface Theme extends themeType {}
}
