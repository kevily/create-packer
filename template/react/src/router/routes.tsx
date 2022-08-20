import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import paths from './paths'
import Layout from '@/layout'
import Home from '@/pages/home'

const CannotAccess = lazy(() => import('@/pages/cannotAccess'))

const routes: RouteObject[] = [
    {
        path: paths.root,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: '*',
        element: <CannotAccess />
    }
]

export default routes
