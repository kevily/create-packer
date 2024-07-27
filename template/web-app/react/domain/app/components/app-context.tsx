import { FunctionComponent, StrictMode } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/shared/theme'

export interface propsType {
    children: React.ReactNode
}
export const Root: FunctionComponent<propsType> = props => {
    return (
        <StrictMode>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </StrictMode>
    )
}
