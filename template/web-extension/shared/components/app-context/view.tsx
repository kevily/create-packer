import { FunctionComponent, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@/shared/styles/theme'

const queryClient = new QueryClient()

const AppContext: FunctionComponent<{ children: ReactNode }> = props => {
    return (
        <ThemeProvider theme={createTheme()}>
            <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
        </ThemeProvider>
    )
}

export default AppContext
