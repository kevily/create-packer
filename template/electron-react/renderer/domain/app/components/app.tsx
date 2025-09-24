import { useLayoutEffect, Suspense } from 'react'
import { RouterProvider } from 'react-router/dom'
import { request } from '@/renderer/shared/service'
import { routerInstance } from '@/renderer/domain/router'
import * as AppContext from './app-context'

export const Root = () => {
    useLayoutEffect(() => {
        request.interceptors.response.use(
            res => res,
            error => {
                console.log(error)
                return Promise.reject(error)
            }
        )
    }, [])

    return (
        <AppContext.Root>
            <Suspense fallback={<>loading...</>}>
                <RouterProvider router={routerInstance} />
            </Suspense>
        </AppContext.Root>
    )
}
