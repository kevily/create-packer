import { CSSInterpolation } from 'tss-react'

export function createGlobalCss(nameSpace?: string): CSSInterpolation {
    return {
        [nameSpace ? `.${nameSpace}` : 'body']: {
            margin: 0
        }
    }
}
