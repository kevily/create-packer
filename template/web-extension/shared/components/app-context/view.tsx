import { FunctionComponent, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Global, ThemeProvider } from '@emotion/react'
import { createGlobalCss, theme } from '@/shared/styles'

const queryClient = new QueryClient()

const AppContext: FunctionComponent<{ children: ReactNode; classNameSpace?: string }> = props => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Global styles={createGlobalCss(props.classNameSpace)} />
                {props.children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default AppContext
