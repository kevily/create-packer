import '@emotion/react'
import { type themeType } from '@/renderer/shared/styles'

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
