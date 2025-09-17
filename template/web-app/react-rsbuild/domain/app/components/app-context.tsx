import { FunctionComponent, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalStyles } from 'tss-react'
import { request } from '@/shared/service'
import { globalCss } from '@/shared/styles'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: async ({ queryKey }) => {
                const { data } = await request.get(queryKey[0] as string, {
                    params: queryKey[1]
                })
                return data
            }
        }
    }
})
export interface propsType {
    children: ReactNode
}
export const Root: FunctionComponent<propsType> = props => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyles styles={globalCss} />
            {props.children}
        </QueryClientProvider>
    )
}
