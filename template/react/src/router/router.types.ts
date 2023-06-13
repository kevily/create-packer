import { RouteObject } from 'react-router-dom'

export type routeType = Omit<RouteObject, 'children'> & {
    name: string | symbol
    children?: routeType[]
}
