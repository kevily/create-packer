import type { FunctionComponent } from 'react'

export interface routeType {
    path: string
    Component: FunctionComponent<any>
}

const routes: routeType[] = [
    {
        path: '/',
        Component: require('../pages/home').default
    }
]

export default routes
