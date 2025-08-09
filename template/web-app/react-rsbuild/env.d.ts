/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
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
