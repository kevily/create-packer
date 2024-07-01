import { FunctionComponent, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'shared/styles'

export const AppContext: FunctionComponent<{ children: ReactNode }> = props => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
