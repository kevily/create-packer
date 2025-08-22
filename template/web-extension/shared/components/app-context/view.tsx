import { FunctionComponent, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const AppContext: FunctionComponent<{ children: ReactNode }> = props => {
    return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}

export default AppContext
