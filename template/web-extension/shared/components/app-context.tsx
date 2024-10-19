import { FunctionComponent, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@/shared/styles'

const queryClient = new QueryClient()

export const AppContext: FunctionComponent<{ children: ReactNode }> = props => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </QueryClientProvider>
    )
}
