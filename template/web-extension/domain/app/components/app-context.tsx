import { FunctionComponent, ReactNode } from 'react'
import { ThemeProvider } from '@/shared/theme'

export const Root: FunctionComponent<{ children: ReactNode }> = props => {
    return <ThemeProvider>{props.children}</ThemeProvider>
}
