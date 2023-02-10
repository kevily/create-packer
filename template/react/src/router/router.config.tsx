import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import * as home from './home'
import paths from './router.paths'

const Layout = lazy(() => import('@/layout'))
const NotFound = lazy(() => import('@/pages/notFound'))

export default createBrowserRouter([
    {
        path: paths.root,
        element: <Layout />,
        children: [...home.routes]
    },
    {
        path: '*',
        element: <NotFound />
    }
])
