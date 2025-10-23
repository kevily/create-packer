import { FunctionComponent, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Global, ThemeProvider } from '@emotion/react'
import { request } from '@/renderer/shared/service'
import { globalCss, theme } from '@/renderer/shared/styles'

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
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Global styles={globalCss} />
                {props.children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}
