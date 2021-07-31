import { RouteConfig } from 'react-router-config'

const routes: RouteConfig[] = [
    {
        component: require('../Layout').default,
        routes: [
            {
                path: '/',
                exact: true,
                component: require('../pages/Home').default
            }
        ]
    }
]

export default routes
