import { lazy } from 'solid-js'
import { RouteDefinition } from '@solidjs/router'
import paths from './paths'

const routes: RouteDefinition[] = [
    {
        path: ['/', paths.home],
        component: lazy(() => import('@/pages/home'))
    }
]

export default routes
