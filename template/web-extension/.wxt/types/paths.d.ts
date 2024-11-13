// Generated by wxt
import 'wxt/browser'

declare module 'wxt/browser' {
    export type PublicPath =
        | '/background.js'
        | '/content-scripts/content.js'
        | '/popup.html'
        | '/vite.svg'
    type HtmlPublicPath = Extract<PublicPath, `${string}.html`>
    export interface WxtRuntime {
        getURL(path: PublicPath): string
        getURL(path: `${HtmlPublicPath}${string}`): string
    }
}
