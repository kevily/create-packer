import 'styled-components'
import { themeType } from './shared/theme'

declare const ENV_BASE_URL: string
declare const ENV_API_HOST: string

declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.png'
declare module '*.webp'
declare module '*.svg?url' {
    const url: string
    export default url
}
declare module '*.svg' {
    import * as React from 'react'
    function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
    export default ReactComponent
}

declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
