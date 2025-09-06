import { css } from '@emotion/react'

export const createGlobalCss = (nameSpace?: string) => {
    return css`
        ${nameSpace ? `.${nameSpace} ` : 'body'} {
            margin: 0;
        }
    `
}
