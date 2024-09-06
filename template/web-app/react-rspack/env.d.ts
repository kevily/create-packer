/// <reference types="@rsbuild/core/types" />
import 'styled-components'
import { themeType } from './shared/theme'

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
declare global {
    interface ImportMetaEnv {
        // import.meta.env.PUBLIC_FOO
        readonly PUBLIC_BASE_URL: string
        readonly PUBLIC_API_HOST: string
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
