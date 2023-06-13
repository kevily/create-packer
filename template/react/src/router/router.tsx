import { lazy } from 'react'
import { concat, isArray, reduce } from 'lodash-es'
import { createBrowserRouter } from 'react-router-dom'
import * as home from './home'
import names from './names'
import type { routeType } from './router.types'

const routes: routeType[] = [
    {
        path: '/',
        name: names.root,
        Component: lazy(() => import('@/layout')),
        children: [...home.routes]
    },
    {
        path: '*',
        name: '404',
        Component: lazy(() => import('@/pages/notFound'))
    }
]
export const routesList = (function flat(routes: routeType[], parentRoute?: routeType) {
    return reduce(
        routes,
        (result, route) => {
            route.path = parentRoute
                ? `${parentRoute.path === '/' ? '' : parentRoute.path}/${route.path}`
                : route.path
            result.push(route)
            if (isArray(route.children)) {
                result = concat(result, flat(route.children, route))
            }
            return result
        },
        [] as routeType[]
    )
})(routes)
export const router = createBrowserRouter(routes as never)
