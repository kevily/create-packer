import React from 'react'

declare global {
    declare module '*.css'
    declare module '*.less'
    declare module '*.scss'
    declare module '*.png'
    declare module '*.svg' {
        import * as React from 'react'

        export const ReactComponent: React.FunctionComponent<
            React.ComponentProps<'svg'> & { title?: string }
        >
        export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
        const url: string
        export default url
    }
}
