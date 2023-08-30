import { RouteObject } from 'react-router-dom'

export type routeType = Omit<RouteObject, 'children' | 'id'> & {
    id: string
    children?: routeType[]
}
