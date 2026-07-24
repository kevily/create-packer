declare module '*.svg' {
    const content: string
    export default content
}

declare module '*.svg?react' {
    const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>
    export default ReactComponent
}
