declare const __BASE_URL__: string
declare const __API_HOST__: string

declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.png'
declare module '*.webp'
declare module '*.svg' {
    import * as React from 'react'

    export const ReactComponent: React.FunctionComponent<
        React.ComponentProps<'svg'> & { title?: string }
    >
    export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
    const url: string
    export default url
}
