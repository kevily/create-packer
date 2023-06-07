import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
    {
        index: true,
        Component: lazy(() => import('@/pages/home'))
    }
]

export default routes
