import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import * as home from './home'
import paths from './router.paths'

const Layout = lazy(() => import('@/layout/layout.container'))
const NotFound = lazy(() => import('@/pages/notFound/notFound.container'))

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
