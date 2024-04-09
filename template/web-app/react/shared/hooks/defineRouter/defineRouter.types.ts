import { FunctionComponent, ReactNode } from 'react'
import { RouteObject } from 'react-router-dom'

export type routeType = Omit<RouteObject, 'children' | 'id'> & {
    id: string
    meta?: {
        title?: string
        /** 只在当前路由才显示的小提示 */
        tip?: string
    }
    unauthorized?: boolean
    query?: () => Record<string, any>
    menu?: {
        hidden?: boolean
        icon?: FunctionComponent
        label?: ReactNode
    }
    children?: routeType[]
}

export type editableRouteType = Omit<routeType, 'element' | 'errorElement' | 'children'>

export interface routerFactoryArgType {
    basename: string
    routes: routeType[]
}

export type routeByIdType = Omit<routeType, 'children'> & {
    pos: string
}
