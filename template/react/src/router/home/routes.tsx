import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/home'))

const routes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    }
]

export default routes