import { css } from '@emotion/react'

export function createGlobalCss(nameSpace?: string) {
    return css`
        ${nameSpace ? `.${nameSpace}` : 'body'} {
            margin: 0;
        }
    `
}
