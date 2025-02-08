import { FunctionComponent, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/shared/theme'

export interface propsType {
    children: ReactNode
}
export const Root: FunctionComponent<propsType> = props => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
