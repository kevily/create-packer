import { useLayoutEffect, Suspense } from 'react'
import { RouterProvider } from 'react-router/dom'
import { request } from '@/shared/service'
import { routerInstance } from '@/domain/router'
import { GlobalStyle } from '@/shared/styles'
import * as AppContext from './app-context'

export const Root = () => {
    useLayoutEffect(() => {
        request.interceptors.response.use(
            res => res,
            error => {
                console.log(error)
            }
        )
    }, [])

    return (
        <AppContext.Root>
            <GlobalStyle />
            <Suspense fallback={<>loading...</>}>
                <RouterProvider router={routerInstance} />
            </Suspense>
        </AppContext.Root>
    )
}
