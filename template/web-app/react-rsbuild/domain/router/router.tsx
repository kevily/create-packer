import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { defineRouter, routeType } from '@/shared/hooks'
import ids from './ids'
import * as home from './home'

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

export const routerInstance = createBrowserRouter(routes as never, {
    basename: import.meta.env.PUBLIC_BASE_URL
})

export const { useMatchRoutes, useQuery, useRouter, useRoutePermission } =
    defineRouter(routerInstance)
