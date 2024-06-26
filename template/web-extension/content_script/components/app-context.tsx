import { FunctionComponent, ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'
import { AppContext } from '@/shared/components'

const GlobalStyle = createGlobalStyle`
    .${import.meta.env.VITE_APP_ID} {}
`
export const Root: FunctionComponent<{ children: ReactNode }> = props => {
    return (
        <AppContext>
            <GlobalStyle />
            {props.children}
        </AppContext>
    )
}
