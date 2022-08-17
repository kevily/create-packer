import { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import CannotAccess from '@/pages/404'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '*',
        element: <CannotAccess />
    }
]

export default routes
