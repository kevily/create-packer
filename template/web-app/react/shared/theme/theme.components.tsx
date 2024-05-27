import { FunctionComponent, ReactNode } from 'react'
import { ThemeProvider as ThemeProviderComponent } from 'styled-components'
import { theme } from './theme.styles'

export const ThemeProvider: FunctionComponent<{ children: ReactNode }> = props => {
    return <ThemeProviderComponent theme={theme}>{props.children}</ThemeProviderComponent>
}
