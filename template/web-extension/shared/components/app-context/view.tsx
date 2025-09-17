import { FunctionComponent, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalStyles } from 'tss-react'
import { createGlobalCss } from '@/shared/styles'

const queryClient = new QueryClient()

const AppContext: FunctionComponent<{ children: ReactNode; classNameSpace?: string }> = props => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyles styles={createGlobalCss(props.classNameSpace)} />
            {props.children}
        </QueryClientProvider>
    )
}

export default AppContext
