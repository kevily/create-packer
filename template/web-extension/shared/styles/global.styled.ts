import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ nameSpace?: string }>(props => {
    return css`
        .${props.nameSpace || 'body'} {
        }
    `
})
