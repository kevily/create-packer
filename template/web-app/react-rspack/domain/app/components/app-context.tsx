import { FunctionComponent } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@/shared/theme'

const queryClient = new QueryClient()

export interface propsType {
    children: React.ReactNode
}
export const Root: FunctionComponent<propsType> = props => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </QueryClientProvider>
    )
}
