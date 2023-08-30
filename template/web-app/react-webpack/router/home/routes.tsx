import { lazy } from 'react'
import ids from './ids'
import type { routeType } from '../router.types'

const routes: routeType[] = [
    {
        path: 'home',
        id: ids.home,
        Component: lazy(() => import('@/pages/home'))
    }
]

export default routes
