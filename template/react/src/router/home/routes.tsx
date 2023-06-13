import { lazy } from 'react'
import names from './names'
import type { routeType } from '../router.types'

const routes: routeType[] = [
    {
        index: true,
        name: names.home,
        Component: lazy(() => import('@/pages/home'))
    }
]

export default routes
