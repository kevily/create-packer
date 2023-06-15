import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { concat, isArray, reduce } from 'lodash-es'
import ids from './ids'
import type { routeType } from './router.types'

const routes: routeType[] = [
    {
        path: '/',
        id: ids.root,
        Component: lazy(() => import('@/layout')),
        children: []
    },
    {
        path: '*',
        id: '404',
        Component: lazy(() => import('@/pages/notFound'))
    }
]

export const routesList = (function flat(routes: routeType[], parentRoute?: routeType) {
    return reduce(
        routes,
        (result, route) => {
            if (parentRoute) {
                route.path = `${parentRoute.path === '/' ? '' : parentRoute.path}/${route.path}`
            }
            result.push(route)
            if (isArray(route.children)) {
                result = concat(result, flat(route.children, route))
            }
            return result
        },
        [] as routeType[]
    )
})(routes)
export const router = createBrowserRouter(routes as never, {
    basename: import.meta.env.VITE_BASE_URL
})
