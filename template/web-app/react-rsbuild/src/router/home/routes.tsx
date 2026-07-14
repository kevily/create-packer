import { lazy } from 'react'
import { type routeType } from '../router.types'
import ids from './ids'

const routes: routeType[] = [
    {
        path: 'home',
        id: ids.home,
        Component: lazy(() => import('@/pages/home'))
    }
]

export default routes
