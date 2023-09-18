import { createBrowserRouter } from 'react-router-dom'
import { assign, isArray, reduce } from 'lodash-es'
import { ValueType } from '@/types'
import { AppLayout, AppNotFound } from '@/domain/app'
import ids from './ids'
import * as home from './home'
import type { routeType } from './router.types'

const routes: routeType[] = [
    {
        path: '/',
        id: ids.root,
        Component: AppLayout,
        children: [...home.routes]
    },
    {
        path: '*',
        id: ids.notFound,
        Component: AppNotFound
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
