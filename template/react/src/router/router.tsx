import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import * as home from './home'
import paths from './paths'

export default createBrowserRouter([
    {
        path: paths.root,
        Component: lazy(() => import('@/layout')),
        children: [...home.routes]
    },
    {
        path: '*',
        Component: lazy(() => import('@/pages/notFound'))
    }
])
