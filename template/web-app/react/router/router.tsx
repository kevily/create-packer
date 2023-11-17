import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { assign, isArray, reduce } from 'lodash-es'
import { ValueType } from '@/shared/types'
import ids from './ids'
import * as home from './home'
import type { routeType } from './router.types'

const routes: routeType[] = [
    {
        path: '/',
        id: ids.root,
        Component: lazy(() => import('@/pages')),
        children: [
            ...home.routes,
            {
                path: '*',
                id: ids.notFound,
                Component: lazy(() => import('@/pages/not-found'))
            }
        ]
    }
]

export const routesById = (function flat(routes: routeType[], parentRoute?: routeType) {
    return reduce(
        routes,
        (result, route) => {
            if (parentRoute) {
                route.path = `${parentRoute.path === '/' ? '' : parentRoute.path}/${route.path}`
            }
            result[route.id] = route
            if (isArray(route.children)) {
                assign(result, flat(route.children, route))
            }
            return result
        },
        {} as Record<ValueType<typeof ids>, routeType>
    )
})(routes)

export const router = createBrowserRouter(routes as never, {
    basename: import.meta.env.VITE_BASE_URL
})
