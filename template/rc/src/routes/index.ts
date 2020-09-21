import { RouteConfig } from 'react-router-config'

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: require('../pages/home').default
    }
]

export default routes
