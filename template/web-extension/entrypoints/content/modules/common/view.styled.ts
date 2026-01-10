import { createGlobalStyle, css } from 'styled-components'
import { classNameSpace } from '@/entrypoints/content/constants'

export const GlobalStyle = createGlobalStyle(() => {
    return css`
        .${classNameSpace} {
            color: initial;
        }
    `
})
