import { lazy } from 'solid-js'
import { RouteDefinition } from '@solidjs/router'
import * as home from './home'

const routes: RouteDefinition[] = [
    {
        path: '/',
        component: lazy(() => import('@/layout')),
        children: [...home.routes]
    },
    {
        path: '/*all',
        component: lazy(() => import('@/pages/notFound'))
    }
]
export default routes
