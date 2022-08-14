import type { FunctionComponent } from 'react'
import Home from '@/pages/Home'

export interface routeType {
    path: string
    Component: FunctionComponent<any>
}

const routes: routeType[] = [
    {
        path: '/',
        Component: Home
    }
]

export default routes
